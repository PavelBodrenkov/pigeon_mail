import React, {useState} from 'react';
import {HoverButton, SidebarHeader} from "@components/index";
import {Drawer, Image, Input} from "antd";
import {ArrowLeftOutlined, SearchOutlined} from "@ant-design/icons";
import {Dialogs} from "@containers/index";
import {auth} from "@redux/actions";
import {useAppDispatch} from "../../hooks/redux";

const SiderBar = () => {



    return (
        <div className={'chat__sidebar'}>
            <SidebarHeader />
            <div className={'chat__sidebar-search'}>
                <Input
                    placeholder={'Поиск по списку диалогов'}
                    prefix={<SearchOutlined className="site-form-item-icon"/>}/>
            </div>
            <div className={'chat__sidebar-dialogs'}>
                <Dialogs/>
            </div>
        </div>
    );
};

export default SiderBar;