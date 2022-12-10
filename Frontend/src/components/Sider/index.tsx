import React, {useEffect} from 'react';
import {Col, Form, Image, Input, Layout, Row, Space} from "antd";
import {HoverButton} from "@components/index";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setInfoPartner} from "@redux/reducers/dialogs";
import './Sider.scss';

const Sider = () => {
    const dispatch = useAppDispatch();
    const {Sider} = Layout;
    const [form] = Form.useForm();
    const {currentDialog, infoPartner} = useAppSelector(state => state.dialogs)

    const closeSider = () => {
        dispatch(setInfoPartner(false))
    }

    useEffect(() => {
        form.setFieldsValue({
            fullname: currentDialog.fullname
        });
    }, [currentDialog])

    return (
            <Sider
                trigger={null}
                collapsible
                collapsed={!infoPartner}
                collapsedWidth={0}
                width={'20%'}
                className={'sider'}
            >
                <div className={'sider__content'}>
                    <Space direction={'vertical'} size={'large'}>
                        <Space>
                            <HoverButton onClick={() => closeSider()} className={'sider__content-back'}>
                                <ArrowLeftOutlined style={{fontSize: 20}}/>
                            </HoverButton>
                            <b className={'sider__content-back-title'}>Профиль</b>
                        </Space>
                        <Image
                            // src={'https://funart.pro/uploads/posts/2021-04/1617458799_2-p-oboi-zakat-zimoi-2.jpg'}
                            src={currentDialog.avatar === null ? 'error' : currentDialog.avatar}
                            width={'100%'}
                            fallback={'https://wallridestore.com/images/product.jpg'}
                        />
                        <Row className={'sider__content__info'}>
                            <Col span={24}>
                                <div className={'sider__content_info-name'}>
                                    {currentDialog.fullname}
                                </div>
                            </Col>
                        </Row>
                        {/*<Form form={form}>*/}
                        {/*    <Form.Item name={'fullname'} >*/}
                        {/*        <Input placeholder={'Имя'}/>*/}
                        {/*    </Form.Item>*/}
                        {/*    /!*<Form.Item name={'hash'}>*!/*/}
                        {/*    /!*    <Input placeholder={'Хеш имя'}/>*!/*/}
                        {/*    /!*</Form.Item>*!/*/}
                        {/*</Form>*/}
                    </Space>
                </div>
            </Sider>
    );
};

export default Sider;