import React from 'react';
import { useSelector } from 'react-redux';
import styles from './skeleton.module.scss';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    className?: string;
}

/**
 * Base Skeleton component for loading states
 */
export const Skeleton: React.FC<SkeletonProps> = ({
    width,
    height,
    borderRadius,
    className = '',
}) => {
    const isDark = useSelector((state: { theme: { isDark: boolean } }) => state.theme.isDark);

    const skeletonClass = isDark
        ? `${styles.skeleton} ${styles.skeletonDark}`
        : styles.skeleton;

    const style: React.CSSProperties = {
        width: width || '100%',
        height: height || '100%',
        borderRadius: borderRadius || '4px',
    };

    return <div className={`${skeletonClass} ${className}`} style={style} />;
};

/**
 * Movie Card Skeleton - mimics MovieCard structure
 */
export const MovieCardSkeleton: React.FC = () => {
    return (
        <div className={styles.movieCardSkeleton}>
            <Skeleton className={styles.posterSkeleton} />
            <Skeleton className={styles.textSkeleton} />
            <Skeleton className={styles.textShort} />
        </div>
    );
};

/**
 * Gallery Skeleton Grid - shows multiple skeleton cards
 */
interface GallerySkeletonProps {
    count?: number;
}

export const GallerySkeleton: React.FC<GallerySkeletonProps> = ({ count = 10 }) => {
    return (
        <div className={styles.gallerySkeletonGrid}>
            {Array.from({ length: count }).map((_, index) => (
                <MovieCardSkeleton key={index} />
            ))}
        </div>
    );
};

/**
 * Movie Details Skeleton - mimics MovieDetails page structure
 */
export const MovieDetailsSkeleton: React.FC = () => {
    return (
        <div className={styles.movieDetailsSkeleton}>
            <div className={styles.detailsContainer}>
                {/* Poster Skeleton */}
                <div className={styles.posterSection}>
                    <Skeleton className={styles.detailsPoster} />
                    <div className={styles.iconPanel}>
                        <Skeleton width={40} height={40} borderRadius="50%" />
                        <Skeleton width={40} height={40} borderRadius="50%" />
                    </div>
                </div>

                {/* Header Skeleton */}
                <div className={styles.headerSection}>
                    <Skeleton className={styles.genreLine} />
                    <Skeleton className={styles.titleLine} />
                    <div className={styles.badges}>
                        <Skeleton width={60} height={30} borderRadius={8} />
                        <Skeleton width={100} height={30} borderRadius={8} />
                        <Skeleton width={80} height={30} borderRadius={8} />
                    </div>
                </div>

                {/* Info Skeleton */}
                <div className={styles.infoSection}>
                    <Skeleton className={styles.plotLine} />
                    <Skeleton className={styles.plotLine} width="90%" />
                    <Skeleton className={styles.plotLine} width="75%" />
                    <div className={styles.detailsGrid}>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <React.Fragment key={index}>
                                <Skeleton width={100} height={20} />
                                <Skeleton width="80%" height={20} />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recommendations Skeleton */}
            <div className={styles.recommendationsSection}>
                <Skeleton width={200} height={30} className={styles.recommendTitle} />
                <div className={styles.recommendCards}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className={styles.recommendCard} />
                    ))}
                </div>
            </div>
        </div>
    );
};
