import React from 'react';
import styles from './imageCard.module.scss';
import {Wrapper} from "../Wrapper";

export type ImageCardProps = {
    imageSrc: string; // Путь к картинке
    altText: string;  // Описание для картинки
    caption?: string; // Подпись под картинкой (необязательно)
}

const ImageCard: React.FC<ImageCardProps> = ({ imageSrc, altText, caption }) => {
    return (
        <>
            <Wrapper className={styles.cardContainer}>
                <img src={imageSrc} alt={altText} className={styles.cardImage} />
                {caption && <p className={styles.cardCaption}>{caption}</p>}
            </Wrapper>
        </>
    );
};

export default ImageCard;
