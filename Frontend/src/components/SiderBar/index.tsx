import React, {useEffect, useState} from 'react';
import {SidebarHeader} from "@components/index";
import {Input, Tabs} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {Dialogs} from "@containers/index";
import {fetchDialogs, fetchUsers} from "@redux/actions";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {dialogItem} from "types/dialogTypes";

const SiderBar = () => {

    const {dialogs} = useAppSelector(state => state.dialogs)
    const [filtered, setFiltered] = useState<dialogItem[]>([])
    console.log('dialogs', dialogs)

    useEffect(() => {
        setFiltered(dialogs)
    }, [dialogs])

    const onChangeInput = (value: string) => {
        setFiltered(
            dialogs.filter((dialog: dialogItem) => dialog.fullname.toLowerCase().includes(value.toLowerCase()))
        )
    }

    return (
        <>
            <SidebarHeader/>
            <div className={'chat__sidebar-search'}>
                <Input
                    placeholder={'Поиск по списку диалогов'}
                    prefix={<SearchOutlined className="site-form-item-icon"/>}
                    onChange={(e) => onChangeInput(e.target.value)}
                />
            </div>
            <div className={'chat__sidebar-dialogs'}>
                <Dialogs filtered={filtered}/>
            </div>
        </>
    );
};

export default SiderBar;