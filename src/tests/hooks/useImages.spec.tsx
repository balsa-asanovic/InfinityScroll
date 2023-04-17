import { renderHook, act } from '@testing-library/react';
import useImages from '../../hooks/useImages';
import { fetchImages } from '../../api/client';

jest.mock("../../api/client", () => ({
    fetchImages: jest.fn().mockResolvedValue({
        hits: [
            {
                id: "pic1",
                url: "http://example.com/pic/1"
            },
            {
                id: "pic2",
                url: "http://example.com/pic/2"
            }
        ],
        offset: 0,
        limit: 20,
        total: 1000,
        total_hits: 20
    }),
}));


describe('useImages', () => {
    /*beforeEach(() => {
        jest.resetAllMocks();
    });*/

    it('should initialize state with empty array, isLoading true, isError false, error empty and hasNextBatch false', async () => {
        const mockData = {
            hits: []
        };
        (fetchImages as jest.Mock).mockResolvedValue(mockData);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        const { result } = renderHook(() => useImages());
        expect(result.current.results).toEqual([]);
        expect(result.current.isLoading).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.error).toStrictEqual({ message: "" });
        expect(result.current.hasNextBatch).toBe(false);
    });

    it('should update results when the offset changes', async () => {
        const mockData = {
            hits: [
                {
                    id: "pic1",
                    url: "http://example.com/pic/1"
                },
                {
                    id: "pic2",
                    url: "http://example.com/pic/2"
                }
            ],
        };
        (fetchImages as jest.Mock).mockResolvedValue(mockData);

        const { result, rerender } = renderHook(
            ({ offset }) => useImages(offset),
            { initialProps: { offset: 0 } }
        );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(fetchImages).toHaveBeenCalledWith(0, 20, { signal: expect.any(AbortSignal) });
        expect(result.current.results).toEqual(mockData.hits);
        expect(result.current.hasNextBatch).toBe(true);

        jest.resetAllMocks();
        (fetchImages as jest.Mock).mockResolvedValue({
            hits: [],
        });

        rerender({ offset: 20 });

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(fetchImages).toHaveBeenCalledWith(20, 20, { signal: expect.any(AbortSignal) });
        console.log(result.current);
        expect(result.current.results).toEqual(mockData.hits);
        expect(result.current.hasNextBatch).toBe(false);
    });

    it('should handle API errors', async () => {
        const mockErrorMessage = 'API error';
        (fetchImages as jest.Mock).mockRejectedValue(new Error(mockErrorMessage));

        const { result } = renderHook(() => useImages());

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(result.current.isError).toBe(true);
        expect(result.current.error?.message).toBe(mockErrorMessage);
    });

    it('should abort pending requests on unmount', () => {
        const mockData = {
            hits: [
                {
                    id: "pic1",
                    url: "http://example.com/pic/1"
                },
                {
                    id: "pic2",
                    url: "http://example.com/pic/2"
                }
            ],
        };
        (fetchImages as jest.Mock).mockResolvedValue(mockData);

        const abortSpy = jest.spyOn(AbortController.prototype, 'abort');
        const { result, unmount } = renderHook(() => useImages());

        unmount();

        expect(abortSpy).toHaveBeenCalled();
    });
});
