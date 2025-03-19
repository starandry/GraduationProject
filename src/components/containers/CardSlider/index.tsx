import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MovieCard } from "../../UI/MovieCard";
import { Movie } from '../../../types';
import styles from './cardSlider.module.scss';
import './cardSlider.scss';
import { ArrowLeft, ArrowRigth } from "../../UI/Icon/icon.component.tsx";
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores/store.ts';

export type SliderProps = {
    cards: Movie[];
};

const CustomPrevArrow = ({ onClick, disabled }: { onClick?: () => void, disabled?: boolean }) => {
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    let compPrev, disPrev;

    if (isDark) {
        compPrev = `${styles.customPrev}`;
        disPrev = `${styles.disabled}`;
    } else {
        compPrev = `${styles.customPrev} ${styles.customPrevLight}`;
        disPrev = `${styles.disabled} ${styles.disabledPrevLight}`;
    }

    return <button onClick={onClick} className={`${compPrev} ${disabled ? disPrev : ''}`} disabled={disabled}>
        <ArrowLeft/>
    </button>
}

const CustomNextArrow = ({onClick, disabled}: { onClick?: () => void, disabled?: boolean }) => {
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    let compNext, disNext;

    if (isDark) {
        compNext = `${styles.customNext}`;
        disNext = `${styles.disabled}`;
    } else {
        compNext = `${styles.customNext} ${styles.customNextLight}`;
        disNext = `${styles.disabled} ${styles.disabledNextLight}`;
    }

    return <button onClick={onClick} className={`${compNext} ${disabled ? disNext : ''}`} disabled={disabled}>
        <ArrowRigth/>
    </button>
}

const CardSlider: React.FC<SliderProps> = ({cards}) => {
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(cards.length <= 4);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        beforeChange: (oldIndex: number, newIndex: number) => {
            setIsPrevDisabled(newIndex === 0);
            setIsNextDisabled(newIndex >= cards.length - 4);
        },
        nextArrow: <CustomNextArrow disabled={isNextDisabled} />,
        prevArrow: <CustomPrevArrow disabled={isPrevDisabled} />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2.2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 630,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            {cards.map((card) => (
                <div className={styles.wrapSlider} key={card.imdbID}>
                    <MovieCard movie={card}/>
                </div>
            ))}
        </Slider>
    );
};

export { CardSlider };
