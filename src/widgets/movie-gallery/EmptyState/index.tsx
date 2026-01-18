import React from 'react';
import ImageCard from '../../../shared/ui/ImageCard';

interface EmptyStateProps {
    imageSrc?: string;
    altText?: string;
    caption?: string;
}

/**
 * EmptyState - displays empty state with image and caption
 */
export const EmptyState: React.FC<EmptyStateProps> = React.memo(({
    imageSrc = `${import.meta.env.BASE_URL}images/empty-state.png`,
    altText = 'Empty state',
    caption = 'Empty state text'
}) => <ImageCard imageSrc={imageSrc} altText={altText} caption={caption} />);
