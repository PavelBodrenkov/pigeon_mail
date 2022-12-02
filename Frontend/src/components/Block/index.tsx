import React, {FC} from 'react';
import './Block.scss';
import classNames from "classnames";

const Block:FC<any> = ({children, className}) => {
    return (
        <div className={classNames('block', className)}>
            {children}
        </div>
    );
};

export default Block;