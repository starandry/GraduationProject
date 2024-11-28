import styles from './sectionTitle.module.scss';
import { ComponentWithTextProps } from '../../../types'

const SectionTitle: React.FC<ComponentWithTextProps> = ({ text, className }) => {

    return (
        <h1 className={`${className || ''} ${styles.title}`}>{text}</h1>
    );
};

export { SectionTitle };
