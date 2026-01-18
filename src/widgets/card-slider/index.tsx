import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MovieCard } from '../../entities/movie/ui/MovieCard';
import { Movie } from '../../entities/movie/model/types';
import styles from './cardSlider.module.scss';
import './cardSlider.scss';
import { ArrowLeft, ArrowRigth } from "../../shared/ui/Icon/icon.component";
import { useAppSelector } from '../../app/store/hooks';
import { cn } from '../../shared/lib/cn';

export type SliderProps = {
    cards: Movie[];
};

const CustomPrevArrow = ({ onClick, disabled }: { onClick?: () => void, disabled?: boolean }) => {
    const isDark = useAppSelector((state) => state.theme.isDark);
    return (
        <button
            onClick={onClick}
            className={cn(styles.customPrev, !isDark && styles.customPrevLight, disabled && styles.disabled, disabled && !isDark && styles.disabledPrevLight)}
            disabled={disabled}
        >
            <ArrowLeft/>
        </button>
    );
};

const CustomNextArrow = ({ onClick, disabled }: { onClick?: () => void, disabled?: boolean }) => {
    const isDark = useAppSelector((state) => state.theme.isDark);
    return (
        <button
            onClick={onClick}
            className={cn(styles.customNext, !isDark && styles.customNextLight, disabled && styles.disabled, disabled && !isDark && styles.disabledNextLight)}
            disabled={disabled}
        >
            <ArrowRigth/>
        </button>
    );
};

const CardSlider: React.FC<SliderProps> = ({cards}) => {
    const getSlidesToShowByWidth = (width: number) => {
        if (width <= 630) return 1;
        if (width <= 768) return 2.2;
        if (width <= 1024) return 3;
        if (width <= 1919) return 4;
        return 5;
    };

    const initialSlidesToShow = typeof window === 'undefined' ? 4 : getSlidesToShowByWidth(window.innerWidth);
    const [slidesToShow, setSlidesToShow] = useState<number>(initialSlidesToShow);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(cards.length <= initialSlidesToShow);

    useEffect(() => {
        const handleResize = () => {
            setSlidesToShow(getSlidesToShowByWidth(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (slidesToShow === 3) {
            const shouldDisable = cards.length <= slidesToShow;
            setIsPrevDisabled(shouldDisable);
            setIsNextDisabled(shouldDisable);
            return;
        }

        setIsPrevDisabled(true);
        setIsNextDisabled(cards.length <= slidesToShow);
    }, [cards.length, slidesToShow]);

    const settings = useMemo(() => ({
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        beforeChange: (oldIndex: number, newIndex: number) => {
            // Infinite is enabled only on the 1024px breakpoint (slidesToShow === 3)
            if (slidesToShow === 3) {
                setIsPrevDisabled(false);
                setIsNextDisabled(cards.length <= slidesToShow);
                return;
            }

            setIsPrevDisabled(newIndex === 0);
            setIsNextDisabled(newIndex >= cards.length - slidesToShow);
        },
        nextArrow: <CustomNextArrow disabled={isNextDisabled} />,
        prevArrow: <CustomPrevArrow disabled={isPrevDisabled} />,
        responsive: [
            {
                breakpoint: 1919,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
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
    }), [cards.length, isNextDisabled, isPrevDisabled, slidesToShow]);

    return (
        <Slider {...settings}>
            {cards.map((card) => (
                <div key={card.imdbID}>
                    <MovieCard movie={card}/>
                </div>
            ))}
        </Slider>
    );
};

export { CardSlider };
