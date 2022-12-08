import React from 'react';
import './HoverButton.scss'

const HoverButton = ({children, ...props}) => {
    return (
        <div className={'hover-button'} {...props}>
            {children}
        </div>
    );
};

export default HoverButton;