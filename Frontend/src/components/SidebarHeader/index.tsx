import React, {FC, useState} from 'react';
import {Button, Drawer, Image, Popover} from "antd";
import {ArrowLeftOutlined, MenuOutlined} from "@ant-design/icons";
import {HoverButton} from "@components/index";
import {useAppDispatch} from "../../hooks/redux";
import {auth} from "@redux/actions";



const SidebarHeader:FC<any> = () => {
    const dispatch = useAppDispatch();
    const [openPopover, setOpenPopover] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false)

    const logout = () => {
        dispatch(auth.fetchLogout())
    }

    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };

    const OpenSettings = () => {
        setOpenDrawer(true);
        setOpenPopover(false)
    }

    const handleVisiblePopover = (newVisible: boolean) => {
        setOpenPopover(newVisible);
    };

    const content = (
        <div className={'setting-menu_block'}>
            <ul className={'setting-menu_block-blur'}>
                <li onClick={OpenSettings}>Настроки</li>
            </ul>
        </div>
    );

    return (
        <div className={'chat__sidebar-header'}>
            <Drawer
                title={
                    <div
                        className={'chat__sidebar-header'}
                        style={{marginBottom: 0, borderBottom: 0, height: 57}}
                    >
                        <HoverButton onClick={onCloseDrawer}>
                            <ArrowLeftOutlined/>
                        </HoverButton>
                        <span>Настройки</span>
                    </div>
                }
                placement="left"
                closable={false}
                onClose={onCloseDrawer}
                open={openDrawer}
                getContainer={false}
                width={319}
                style={{boxShadow: 'none'}}
            >
                <div>
                    <Image
                        // src={'https://funart.pro/uploads/posts/2021-04/1617458799_2-p-oboi-zakat-zimoi-2.jpg'}
                        src="error"
                        fallback={'https://funart.pro/uploads/posts/2021-04/1617458799_2-p-oboi-zakat-zimoi-2.jpg'}
                    />
                    <button onClick={logout}>Выход</button>
                </div>
            </Drawer>
            <Popover
                content={content}
                title={false}
                trigger="click"
                open={openPopover}
                placement="bottomLeft"
                overlayClassName={'popover'}
                onOpenChange={handleVisiblePopover}
            >
                <div>
                    <HoverButton>
                        <MenuOutlined style={{fontSize:20}}/>
                    </HoverButton>
                </div>
            </Popover>
        </div>
    );
};

export default SidebarHeader;