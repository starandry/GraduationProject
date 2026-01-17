import { ComponentWithTextProps } from '../../types';

const SubTitle: React.FC<ComponentWithTextProps> = ({ text, className }) => {

    return (
        <h2 className={className}>{text}</h2>
    );
};

export { SubTitle };
