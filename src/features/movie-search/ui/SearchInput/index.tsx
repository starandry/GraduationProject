import React, { useState } from 'react';
import styles from './searchInput.module.scss';
import { Button } from '../../../../shared/ui/Button';
import { Input } from '../../../../shared/ui/Input';
import { SortIcon } from '../../../../shared/ui/Icon/icon.component';
import { FilterModal } from '../../../movie-filter/ui/FilterModal';
import { useAppSelector } from '../../../../app/store/hooks';

export type SearchInputProps = {
    onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const isDark = useAppSelector((state) => state.theme.isDark);
    const isHamburgerOpen = useAppSelector((state) => state.hamburger.isOpen);
    const showButtons = useAppSelector((state) => state.filters.showButtons);

    const containerClass = `${styles.searchInputContainer} ${!isDark ? styles.lightSearchInputContainer : ''} ${isHamburgerOpen ? styles.serachHumb : ''}`;
    const sortPointClass = `${styles.sortPoint} ${!showButtons ? styles.sortPointNone : ''}`;

    return (
        <div className={containerClass}>
            <Input
                type="text"
                className={styles.searchInput}
                containerClassName={styles.searchField}
                placeholder="Search"
                onChange={(e) => onChange(e.target.value)}
            />
            <Button className={styles.searchButton} onClick={() => setModalOpen(true)}>
                <SortIcon />
                <div className={sortPointClass}></div>
            </Button>
            <FilterModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
};

export { SearchInput };
