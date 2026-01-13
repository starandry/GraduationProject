import React from 'react';
import ImageCard from '../../ImageCard';

interface EmptyStateProps {
    imageSrc?: string;
    altText?: string;
    caption?: string;
}

/**
 * EmptyState - displays empty state with image and caption
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
    imageSrc = 'images/empty-state.png',
    altText = 'Empty state',
    caption = 'Empty state text'
}) => {
    return <ImageCard imageSrc={imageSrc} altText={altText} caption={caption} />;
};
