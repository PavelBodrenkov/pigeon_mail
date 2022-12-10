import React from 'react';
import './HoverButton.scss'
import classNames from "classnames";

const HoverButton = ({children, ...props}) => {
    return (
        <div {...props} className={classNames('hover-button', props.className)} >
            {children}
        </div>
    );
};

export default HoverButton;