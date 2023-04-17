import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { getByRole, render } from '@testing-library/react';
import Card from '../../components/Card';

const mockCardProps = {
  url: 'https://example.com/image.jpg',
  id: '123'
};

describe('Card', () => {
  it('renders the image with the correct URL', () => {
    const { getByAltText } = render(<Card {...mockCardProps} />);
    const imageElement = getByAltText(mockCardProps.id);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockCardProps.url);
  });

  it('renders the card title', () => {
    const { getByText } = render(<Card {...mockCardProps} />);
    const titleElement = getByText('Some Title');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the card text', () => {
    const { getByText } = render(<Card {...mockCardProps} />);
    const textElement = getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non nibh in justo porttitor viverra. Nulla commodo...');
    expect(textElement).toBeInTheDocument();
  });
  
  it('renders the link with the correct href', () => {
    const { getByRole } = render(<Card {...mockCardProps} />);
    const linkElement = getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', mockCardProps.url);
    expect(linkElement).toHaveAttribute('target', '_blank');
  });
});
