/* eslint-disable */

import { useMutation } from "@tanstack/react-query";
import { Button, Checkbox, Drawer, Form, Input, InputNumber, Select, Space, Upload, message } from "antd";
import { patch, post, put } from "~/services/api/api";
import React, { useState } from "react";
import { ACCEPT_TEACHER, API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import { useNavigate } from "react-router-dom";

// @ts-ignore
export default function DrawerForm({ title, onClose, open, onSubmitSuccess, isEditing, teacher, ...props }) {

    const navigate = useNavigate();
    // console.log(teacher)

    const [form] = Form.useForm();
    const [url, setUrl] = useState("")

    const acceptMutate = useMutation(async (data) => await post(ACCEPT_TEACHER, data), {
        onSuccess: (response) => {
            message.success('Saved Successfully');
            form.resetFields();
            onSubmitSuccess();
            navigate("/teacher-request")
            
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });



    const onFinish = async (formValues: any) => {
        if (formValues?.work_email === undefined) {
            delete formValues["work_email"]
        }
        delete formValues["prefix"]
        formValues.email = teacher?.email
        formValues.phone = teacher?.phone
        formValues.token = teacher?.token

        acceptMutate.mutate(formValues)

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
            </Select>
        </Form.Item>
    );


    return (
        <>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}>
                <Form
                    form={form}
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                    validateMessages={validateMessages}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" >
                        <Input defaultValue={teacher?.email} disabled />
                    </Form.Item>
                    <Form.Item name="work_email" label="Work Email" rules={[{ type: "email" }]} >
                        <Input defaultValue={teacher?.work_email} />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                    >
                        <Input addonBefore={prefixSelector} defaultValue={teacher?.phone} disabled style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Accept
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}
