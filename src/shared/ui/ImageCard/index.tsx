import React from 'react';
import styles from './imageCard.module.scss';

export type ImageCardProps = {
    imageSrc: string; // Путь к картинке
    altText: string;  // Описание для картинки
    caption?: string; // Подпись под картинкой (необязательно)
}

const ImageCard: React.FC<ImageCardProps> = ({ imageSrc, altText, caption }) => {
    return (
        <>
            <div className={styles.cardContainer}>
                <img src={imageSrc} alt={altText} className={styles.cardImage} />
                {caption && <p className={styles.cardCaption}>{caption}</p>}
            </div>
        </>
    );
};

export default ImageCard;
