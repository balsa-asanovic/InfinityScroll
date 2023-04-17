import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Index from "../../pages/index";
import useImages from "../../hooks/useImages";
import { Image } from '../../types/images';
import { useState } from "react";
import React from "react";

jest.mock("../../api/client", () => ({
  fetchImages: jest.fn().mockResolvedValue({
    hits: [
      { id: "pic1", url: "dumb url" }
    ],
    offset: 0,
    limit: 20,
    total: 1000,
    total_hits: 20
  }),
}));

let offsetState = 0;
const observe = jest.fn().mockImplementation(() => {
  mockUseImages(offsetState, 20);
  offsetState += 20;
});
const disconnect = jest.fn();

const intersectionObserverMock = () => ({
  observe,
  disconnect
})
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);


const images: Image[] = [];
  for(let i = 0; i < 60; i++) {
    images.push(
      { id: "pic" + i, url: "dummy url " + i, width: 20, height: 20}
    )
  }

let loadedImages: Image[] = [];

jest.mock("../../hooks/useImages");
const mockUseImages = useImages as jest.MockedFunction<typeof useImages>;
mockUseImages.mockImplementation((offset = 0, limit = 20) => {
  loadedImages = [...loadedImages, ...images.slice(offsetState, offsetState + limit)].slice(0, offsetState + 20);

  return {
    isLoading: false,
    isError: false,
    error: { message: "" },
    results: loadedImages,
    hasNextBatch: false
  }
});

describe('Index', () => {
  test('renders first 20 images on initial render', () => {

    offsetState = 0;
    loadedImages = [];
  
    render(<Index />);
  
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(40);
  });
  
  test("Load More button exists on the page", () => {
    render(<Index />);
    const buttonElement = screen.getByText("Load More");
    expect(buttonElement).toBeInTheDocument();
  });

  test("Load More button click triggers the correct function", () => {
    const setOffset = jest.fn().mockImplementation((newState) => newState);
    jest.spyOn(React, "useState").mockImplementation(() => [0, setOffset]);
    const { getByRole } = render(<Index />);
    fireEvent.click(getByRole("button"));
    expect(setOffset).toHaveBeenCalledTimes(1);
  });
  
  test('renders additional 20 images after scroll to the bottom', () => {
  
    offsetState = 0;
    loadedImages = [];
  
    const { container, rerender } = render(<Index />);
  
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(40);
  
    // scrolling down increases offset, which causes a rerender
    rerender(<Index />);
  
    expect(mockUseImages).toHaveBeenCalledWith(20, 20);
  
    const updatedImages = screen.getAllByRole('img');
    expect(updatedImages.length).toBe(80);
  });
  
  test("renders without crashing", () => {
    render(<Index />);
  });
  
  test("displays correct title", () => {
    render(<Index />);
    const title = screen.getByText("Locations");
    expect(title).toBeInTheDocument();
  });
  
  test("fetches images on mount", async () => {
    render(<Index />);
    await waitFor(() => {
      expect(mockUseImages).toHaveBeenCalled();
    });
  });
  
  test("displays error message when there is an error fetching images", async () => {
    mockUseImages.mockImplementation((offset = 0, limit = 20) => {
      return {
        isLoading: false,
        isError: true,
        error: { message: "Unable to fetch images." },
        results: [],
        hasNextBatch: false
      }
    });
    render(<Index />);
    const error = await screen.findByText(`Error: Unable to fetch images.`);
    expect(error).toBeInTheDocument();
  });
})


