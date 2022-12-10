import React, {FC} from 'react';
import classNames from "classnames";
import './Status.scss';
import {EllipsisOutlined} from "@ant-design/icons";
import {useAppDispatch} from "../../hooks/redux";
import {setInfoPartner} from "@redux/reducers/dialogs";
import {Form} from "antd";

const Status: FC<{ online?: boolean, fullname:string }> = ({online, fullname}) => {
    const dispatch = useAppDispatch();

    const handleInfoPartner = () => {
        dispatch(setInfoPartner(true))
    }

    return (
        <div className={'chat__dialog-header'}>
            <div/>
            <div className={'chat__dialog-header-center'}>
                <b className={'chat__dialog-header-username'} onClick={handleInfoPartner}>{fullname}</b>
                <div className={'chat__dialog-header-status'}>
                     <span className={classNames('status', {"status--online": online})}>
                            {online ? 'онлайн' : 'офлайн'}
                     </span>
                </div>
            </div>
            <EllipsisOutlined style={{fontSize: 22}}/>
        </div>
    )


};

export default Status;