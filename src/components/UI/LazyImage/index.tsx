import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    placeholder?: string;
    onError?: () => void;
    onLoad?: () => void;
}

/**
 * LazyImage component with Intersection Observer
 * Loads images only when they enter the viewport
 */
export const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    className = '',
    placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450"%3E%3Crect fill="%23ddd" width="300" height="450"/%3E%3C/svg%3E',
    onError,
    onLoad,
}) => {
    const [imageSrc, setImageSrc] = useState<string>(placeholder);
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!imgRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setImageSrc(src);
                        setIsLoaded(false);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: '50px', // Start loading 50px before entering viewport
                threshold: 0.01,
            }
        );

        observer.observe(imgRef.current);

        return () => {
            observer.disconnect();
        };
    }, [src]);

    const handleLoad = () => {
        setIsLoaded(true);
        if (imageSrc === src) {
            onLoad?.();
        }
    };

    const handleError = () => {
        if (imageSrc === src) {
            onError?.();
            setImageSrc(placeholder);
            setIsLoaded(true);
        }
    };

    return (
        <img
            ref={imgRef}
            src={imageSrc}
            alt={alt}
            className={className}
            onLoad={handleLoad}
            onError={handleError}
            style={{
                transition: 'opacity 0.3s ease-in-out',
                opacity: isLoaded ? 1 : 0.7,
            }}
            loading="lazy"
        />
    );
};
