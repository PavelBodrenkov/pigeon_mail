import React, {FC, useEffect, useState} from 'react';
import {Button, Drawer, Form, Image, Input, Popover, Space} from "antd";
import {ArrowLeftOutlined, MenuOutlined, FormOutlined} from "@ant-design/icons";
import {HoverButton} from "@components/index";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {auth} from "@redux/actions";
import {setCurrentDialog} from "@redux/reducers/dialogs";


const SidebarHeader: FC<any> = () => {
    const dispatch = useAppDispatch();
    const [openPopover, setOpenPopover] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false)
    const [form] = Form.useForm();
    const {currentDialog} = useAppSelector(state => state.dialogs)
    const {user} = useAppSelector(state => state.users)

    const logout = () => {
        dispatch(auth.fetchLogout())
        dispatch(setCurrentDialog({}))
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

    useEffect(() => {
        form.setFieldsValue({
            name: user.fullname
        });
    }, [])

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
                        <MenuOutlined style={{fontSize: 20}}/>
                    </HoverButton>
                </div>
            </Popover>
            <span>
                <HoverButton>
                     <FormOutlined style={{fontSize: 20}}/>
                </HoverButton>
            </span>
        </div>
    );
};

export default SidebarHeader;