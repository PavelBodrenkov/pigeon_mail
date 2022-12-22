import React, {FC} from 'react';
import classNames from "classnames";
import './Status.scss';
import {EllipsisOutlined} from "@ant-design/icons";
import {useAppDispatch} from "../../hooks/redux";
import {setInfoPartner} from "@redux/reducers/dialogs";
import {Form} from "antd";
import {getAvatar} from "@utils/services/services";

const Status: FC<{ online: number, currentDialog:any}> = ({online, currentDialog}) => {
    console.log('online', online)
    const {fullname, avatar} = currentDialog
    const dispatch = useAppDispatch();

    const handleInfoPartner = () => {
        dispatch(setInfoPartner(true))
    }

    return (
        <div className={'chat__dialog-header'}>
           <div className={'chat__dialog-header_wrapper'}>
               {getAvatar(avatar, fullname, 40, online)}
               <div className={'chat__dialog-header-center'}>
                   <b className={'chat__dialog-header-username'} onClick={handleInfoPartner}>{fullname}</b>
                   <div className={'chat__dialog-header-status'}>
                     <span className={classNames('status', {"status--online": online == 1})}>
                            {online == 1 ? 'онлайн' : 'офлайн'}
                     </span>
                   </div>
               </div>
           </div>
            <EllipsisOutlined style={{fontSize: 22, color:'white'}}/>
        </div>
    )
};

export default Status;