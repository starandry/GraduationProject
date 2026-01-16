import styles from './subTitle.module.scss';
import { ComponentWithTextProps } from '../../types';

const SubTitle: React.FC<ComponentWithTextProps> = ({ text, className }) => {

    return (
        <h2 className={`${className || ''} ${styles.title}`}>{text}</h2>
    );
};

export { SubTitle };
