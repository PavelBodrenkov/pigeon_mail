import React, {FC, useEffect, useState} from 'react';
import {Button, Drawer, Form, Image, Input, Select, Space} from "antd";
import {ArrowLeftOutlined, MenuOutlined, FormOutlined} from "@ant-design/icons";
import {HoverButton} from "@components/index";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {auth} from "@redux/actions";
import {setCurrentDialog} from "@redux/reducers/dialogs";
import {Popover} from '@components/index';
import dialogs from "@redux/actions/dialogs";

const SidebarHeader: FC<any> = () => {
    const dispatch = useAppDispatch();
    const {users} = useAppSelector(state => state.users)
    const {user} = useAppSelector(state => state.auth)
    const [openPopoverNewDialog, setOpenPopoverNewDialog] = useState(false);
    const [createDialog, setCreateDialog] = useState<{ userId: number, message: string }>({
        userId: 0,
        message: ''
    })
    console.log('users', users)
    const handleVisiblePopover = (newVisible: boolean, key) => {
        switch (key) {
            case 'newDialog': {
                setOpenPopoverNewDialog(newVisible)
            }
                break
        }
    };

    const createUserSubmit = () => {
        const data = {
            owner:user.id,
            partner:createDialog.userId,
            message:createDialog.message
        }
        dispatch(dialogs.createDialog(data))
        setOpenPopoverNewDialog(false)
    }


    const contentNewDialog = (
        <Form
            layout={'vertical'}
            onFinish={createUserSubmit}
            onValuesChange={(_changedValues, allValues) => {
                setCreateDialog(allValues)
            }}
        >
            <Form.Item
                label={'Выберите собеседника'}
                name={'userId'}
                rules={[{required: true, message: 'Обязательное поле'}]}
            >
                <Select
                    showSearch
                    placeholder="Выберите собеседника"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={users.map((user) => {
                        return {
                            label: user.fullname,
                            value: user.id
                        }
                    })}
                />
            </Form.Item>
            <Form.Item
                label={'Напишите приветственное сообщение'}
                name={'message'}
                rules={[{required: true, message: 'Обязательное поле'}]}
            >
                <Input placeholder={'Сообщение'}/>
            </Form.Item>
            <Button style={{width: '100%'}} htmlType={'submit'}>Написать</Button>
        </Form>
    )

    return (
        <div className={'chat__sidebar-header'}>
            <div className={'chat__sidebar-header_title'}>
                Чат
            </div>
            <Popover
                content={contentNewDialog}
                open={openPopoverNewDialog}
                onOpenChange={(e) => handleVisiblePopover(e, 'newDialog')}
                placement={'bottomRight'}
            >
                <div>
                    <HoverButton>
                        <FormOutlined className={'chat__sidebar-header_new-dialog'}/>
                    </HoverButton>
                </div>
            </Popover>
        </div>
    );
};

export default SidebarHeader;