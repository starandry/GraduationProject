import React, {useState} from 'react';
import styles from './searchInput.module.scss';
import { Button } from '../../../../shared/ui/Button';
import { Input } from '../../../../shared/ui/Input';
import { SortIcon } from '../../../../shared/ui/Icon/icon.component';
import { FilterModal } from '../../../movie-filter/ui/FilterModal';
import { useAppSelector } from '../../../../app/store/hooks';

export type SearchInputProps = {
    onChange: (value: string) => void;
    onInput: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange, onInput }) => {
    const [isModalOpen, setModalOpen] = useState(false); // Состояние для модального окна
    const compSearchInput = styles.searchInput;
    const isDark = useAppSelector((state) => state.theme.isDark);
    const isHamburgerOpen = useAppSelector((state) => state.hamburger.isOpen); // состояние гамбургера
    const showButtons = useAppSelector((state) => state.filters.showButtons);
    let compWrapp, sortPoint;

    if (showButtons) {
        sortPoint = styles.sortPoint;
    } else {
        sortPoint = `${styles.sortPoint} ${styles.sortPointNone}`;
    }

    if (isDark) {
        compWrapp = styles.searchInputContainer;
    } else {
        compWrapp = `${styles.searchInputContainer} ${styles.lightSearchInputContainer}`;
    }

    const handleButtonClick = () => {
        setModalOpen(true); // Открываем модальное окно
    };

    const handleCloseModal = () => {
        setModalOpen(false); // Закрываем модальное окно
    };

    // Логика на основе состояния гамбургера
    if (isHamburgerOpen) {
        compWrapp = `${compWrapp} ${styles.serachHumb}`; // класс, если гамбургер открыт
    }

    return (
        <div className={compWrapp}>
            <Input
                type="text"
                className={compSearchInput}
                containerClassName={styles.searchField}
                placeholder="Search"
                onChange={(e) => onChange(e.target.value)}
                onInput={(e) => onInput(e.target.value)}
            />
            <Button className={styles.searchButton} onClick={handleButtonClick}>
                <SortIcon />
                <div className={sortPoint}></div>
            </Button>
            <FilterModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export { SearchInput };
