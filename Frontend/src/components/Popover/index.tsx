import React, {FC} from 'react';
import {Popover as BasePopover} from "antd";

interface PopoverProps {
    children:any
    content:any
    open:boolean
    onOpenChange:(newVisible:boolean) => void
    placement?:
        'topLeft' |
        'top' |
        'topRight' |
        'leftTop' |
        'left' |
        'leftBottom' |
        'rightTop' |
        'right' |
        'rightBottom' |
        'bottomLeft' |
        'bottom' |
        'bottomRight'
}

const Popover:FC<PopoverProps> = ({children, content, open, onOpenChange, placement}) => {
    return (
        <BasePopover
            content={content}
            title={false}
            trigger="click"
            open={open}
            placement={placement || 'bottomLeft'}
            overlayClassName={'popover'}
            onOpenChange={onOpenChange}
        >
            {children}
        </BasePopover>
    );
};

export default Popover;