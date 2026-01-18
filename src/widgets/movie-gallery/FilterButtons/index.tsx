import React, { useMemo, useCallback } from 'react';
import { Button } from '../../../shared/ui/Button';
import { BigCloseIcon } from '../../../shared/ui/Icon/icon.component';
import styles from './filterButtons.module.scss';

interface FilterButtonsProps {
    filters: string;
    onRemoveFilter: (filter: string) => void;
}

/**
 * FilterButtons - displays active filter buttons with remove functionality
 */
export const FilterButtons: React.FC<FilterButtonsProps> = React.memo(({ filters, onRemoveFilter }) => {
    const filterArray = useMemo(() =>
        filters ? filters.split(', ').filter(Boolean) : [],
        [filters]
    );

    const handleRemove = useCallback((btn: string) => () => onRemoveFilter(btn), [onRemoveFilter]);

    if (filterArray.length === 0) return null;

    return (
        <div className={styles.btnContainer}>
            {filterArray.map((btn) => (
                <Button key={btn} className={styles.button}>
                    <span className={styles.signGenre}>{btn}</span>
                    <BigCloseIcon onClick={handleRemove(btn)} />
                </Button>
            ))}
        </div>
    );
});
