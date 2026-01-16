import React from 'react';

type SpacerProps = {
    className?: string;
};

const Spacer: React.FC<SpacerProps> = ({ className }) => {
    return (
        <p className={ className }/>
    );
};

export { Spacer };
