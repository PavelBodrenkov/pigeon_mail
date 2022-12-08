import React, {FC, useState} from 'react';
import {Button, Popover} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import {HoverButton} from "@components/index";

interface SidebarHeaderProps {
    openDrawer:() => void
}

const SidebarHeader:FC<SidebarHeaderProps> = ({openDrawer}) => {
    const [visible, setVisible] = useState(false);

    const OpenSettings = () => {
        openDrawer()
        setVisible(false)
    }

    const handleVisibleChange = (newVisible: boolean) => {
        console.log(newVisible)
        setVisible(newVisible);
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
            <Popover
                content={content}
                title={false}
                trigger="click"
                open={visible}
                placement="bottomLeft"
                overlayClassName={'popover'}
                onOpenChange={handleVisibleChange}
            >
                <div>
                    <HoverButton>
                        <MenuOutlined style={{fontSize:20}}/>
                    </HoverButton>
                </div>
            </Popover>
            {/*<div>*/}
            {/*    <TeamOutlined/>*/}
            {/*    <span>Список диалогов</span>*/}
            {/*</div>*/}
            {/*/!*<FormOutlined/>*!/*/}
            {/*<button onClick={() => onOpen()}>назад</button>*/}
        </div>
    );
};

export default SidebarHeader;