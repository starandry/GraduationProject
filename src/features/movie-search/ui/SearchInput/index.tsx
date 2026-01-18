import React, { useState, useCallback } from 'react';
import styles from './searchInput.module.scss';
import { Button } from '../../../../shared/ui/Button';
import { Input } from '../../../../shared/ui/Input';
import { SortIcon } from '../../../../shared/ui/Icon/icon.component';
import { FilterModal } from '../../../movie-filter/ui/FilterModal';
import { useAppSelector } from '../../../../app/store/hooks';
import { cn } from '../../../../shared/lib/cn';

export type SearchInputProps = {
    onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const isDark = useAppSelector((state) => state.theme.isDark);
    const isHamburgerOpen = useAppSelector((state) => state.hamburger.isOpen);
    const showButtons = useAppSelector((state) => state.filters.showButtons);

    const openModal = useCallback(() => setModalOpen(true), []);
    const closeModal = useCallback(() => setModalOpen(false), []);

    return (
        <div className={cn(styles.searchInputContainer, !isDark && styles.lightSearchInputContainer, isHamburgerOpen && styles.serachHumb)}>
            <Input
                type="text"
                className={styles.searchInput}
                containerClassName={styles.searchField}
                placeholder="Search"
                onChange={(e) => onChange(e.target.value)}
            />
            <Button className={styles.searchButton} onClick={openModal}>
                <SortIcon />
                <div className={cn(styles.sortPoint, !showButtons && styles.sortPointNone)} />
            </Button>
            <FilterModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export { SearchInput };
