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
    const [openPopoverSettings, setOpenPopoverSettings] = useState(false);
    const [openPopoverNewDialog, setOpenPopoverNewDialog] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false)
    const [createDialog, setCreateDialog] = useState<{ userId: number, message: string }>({
        userId: 0,
        message: ''
    })
    const [form] = Form.useForm();

    const logout = () => {
        dispatch(auth.fetchLogout())
        dispatch(setCurrentDialog({}))
    }

    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };

    const OpenSettings = () => {
        setOpenDrawer(true);
        setOpenPopoverSettings(false)
    }

    const handleVisiblePopover = (newVisible: boolean, key) => {
        switch (key) {
            case 'setting': {
                setOpenPopoverSettings(newVisible);
            }
                break
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

    const contentSetting = (
        <div className={'setting-menu_block'}>
            <ul className={'setting-menu_block-blur'}>
                <li onClick={OpenSettings}>Настроки</li>
            </ul>
        </div>
    );

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

    useEffect(() => {
        form.setFieldsValue({
            name: user.fullname
        });
    }, [])

    return (
        <div className={'chat__sidebar-header'}>
            <Drawer
                title={
                    <Space
                        className={'chat__sidebar-header-drawer'}
                        style={{marginBottom: 0, borderBottom: 0, height: 57}}
                    >
                        <HoverButton onClick={onCloseDrawer}>
                            <ArrowLeftOutlined style={{fontSize: 20}}/>
                        </HoverButton>
                        <span>Настройки</span>
                    </Space>
                }
                placement="left"
                closable={false}
                onClose={onCloseDrawer}
                open={openDrawer}
                getContainer={false}
                width={'100%'}
                style={{boxShadow: 'none'}}
            >
                <div>
                    <Space direction={'vertical'} size={'large'} style={{width: '100%'}}>
                        <Image
                            // src={'https://funart.pro/uploads/posts/2021-04/1617458799_2-p-oboi-zakat-zimoi-2.jpg'}
                            src={user.avatar === null ? 'error' : user.avatar}
                            width={'100%'}
                            fallback={'https://wallridestore.com/images/product.jpg'}
                        />
                        <Form form={form}>
                            <Form.Item name={'name'}>
                                <Input placeholder={'Имя'}/>
                            </Form.Item>
                            <Form.Item name={'hash'}>
                                <Input placeholder={'Хеш имя'}/>
                            </Form.Item>
                            <Button onClick={logout} type={'default'}>
                                Выход
                            </Button>
                        </Form>
                    </Space>

                </div>
            </Drawer>
            <Popover
                content={contentSetting}
                open={openPopoverSettings}
                onOpenChange={(e) => handleVisiblePopover(e, 'setting')}
            >
                <div>
                    <HoverButton>
                        <MenuOutlined style={{fontSize: 20}}/>
                    </HoverButton>
                </div>
            </Popover>
            <Popover
                content={contentNewDialog}
                open={openPopoverNewDialog}
                onOpenChange={(e) => handleVisiblePopover(e, 'newDialog')}
                placement={'bottomRight'}
            >
                <div>
                    <HoverButton>
                        <FormOutlined style={{fontSize: 20}}/>
                    </HoverButton>
                </div>
            </Popover>
        </div>
    );
};

export default SidebarHeader;