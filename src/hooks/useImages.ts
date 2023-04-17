import { useState, useEffect } from 'react';
import { fetchImages } from '../api/client';
import { Image } from '../types/images';

const useImages = (offset = 0, limit = 20) => {
    const [results, setResults] = useState<Image[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<{ message: string }>();
    const [hasNextBatch, setHasNextBatch] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        setError({message: ""});

        const controller = new AbortController();
        const { signal } = controller;

        fetchImages(offset, limit, { signal })
            .then(data => {
                if (!data) return;
                setResults(prev => [...prev, ...data.hits]);
                setHasNextBatch(Boolean(data.hits.length));
                setIsLoading(false);
            })
            .catch(e => {
                setIsLoading(false);
                if (signal.aborted) return;
                setIsError(true);
                setError({ message: e.message });
            })

        return () => controller.abort();

    }, [offset])

    return { isLoading, isError, error, results, hasNextBatch }
};

export default useImages;