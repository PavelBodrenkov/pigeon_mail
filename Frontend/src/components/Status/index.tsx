import React, {FC} from 'react';
import classNames from "classnames";
import './Status.scss';

const Status:FC<{online?:boolean}> = ({online}) => {
    return <span className={classNames('status', {"status--online":online})}>
        {online ? 'онлайн': 'офлайн'}
    </span>
};

export default Status;