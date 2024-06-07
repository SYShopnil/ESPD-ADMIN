import { Button, Divider, Form, Input, Layout, Menu, Modal, Space, theme, message } from 'antd';
const { Header, Sider, Content } = Layout;
import { Avatar, Popover, Badge, List } from 'antd'
import {
    BellOutlined,
    RightOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PoweroffOutlined,
    EditOutlined,
    ExclamationCircleFilled
} from '@ant-design/icons'
import React, { useState, Fragment } from 'react';
import useAuth from '~/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { patch, post } from '~/services/api/api';
import { UPDATE_PASSWORD, getUrlForModel } from '~/services/api/endpoints';
import useUser from '../../../website/hooks/userUser';
const { confirm } = Modal;

const { SubMenu } = Menu
// const { signOut } = useAuth()

export default function HeaderNav() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const user = window.localStorage.getItem('admin')
    const user_data = JSON.parse(user);
    const user_auth = JSON.parse(user_data?.auth);
    const user_email = user_auth?.user?.email


    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        form.resetFields()
        setIsModalOpen(false);
    };



    const updateData = useMutation(async (data: any) => await post(UPDATE_PASSWORD, data?.data), {//TODO refactor
        onSuccess: (response) => {
            message.success('Updated Successfully');
            form.resetFields();
            handleOk()
            window.location.reload()
        },
        onError: (error) => {
            console.log(error)
            message.error(' Something went wrong');
        }
    });



    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    const onFinish = (values: any) => {
        if (values.new_password !== values.confirm_password) {
            message.error("password do not match");
            return
        }
        else {
            updateData.mutate({
                data: {
                    email:user_email,
                    new_password:values?.new_password
                }
            })
        }
    };

    type FieldType = {
        new_password?: string;
        confirm_password?: string;
    };

    const handleLogOut = () => {
        window.localStorage.removeItem("admin")
        window.location.reload()
        // signOut()
    }

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you logout from here?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleLogOut()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <Divider orientation="right">
                <Button
                    onClick={showModal}
                    type="primary"
                    icon={<EditOutlined />}
                    style={{ marginRight: "10px" }}
                >
                </Button>

                <Button
                    icon={<PoweroffOutlined />}
                    onClick={showDeleteConfirm}
                    type="primary"
                    danger>

                </Button>
            </Divider>

            <Modal title="Change Password" open={isModalOpen}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <br />

                <Form
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    name="wrap"
                    labelCol={{ flex: '150px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ maxWidth: 600 }}
                >

                    <Form.Item<FieldType>
                        label="New Password"
                        name="new_password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Confirm Password"
                        name="confirm_password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit"
                        loading={updateData.isLoading}
                        >
                            Save Change
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
        </Header >
    );
}
