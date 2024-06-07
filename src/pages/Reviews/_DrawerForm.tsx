/* eslint-disable */

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Drawer, Form, Input, Select, Space, Switch, message } from "antd";
import { patch, post, put } from "~/services/api/api";
import React from "react";
import { getUrlForModel } from "~/services/api/endpoints";
import TextArea from "antd/es/input/TextArea";
import { API_CRUD } from '~/services/api/endpoints';
import { deleteApi, get } from '~/services/api/api';
import { SERVER_URL } from '~/configs';




// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();



    const updateData = useMutation(async (data: any) => await patch(getUrlForModel(model, data.id), data), {//TODO refactor
        onSuccess: (response) => {
            message.success('Updated Successfully');
            form.resetFields();
            onSubmitSuccess(true);
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const onFinish = async (formValues: any) => {
        if (isEditing) {
            updateData.mutate({
                ...formValues,
                id: editedItem.id
            })
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    if (editedItem) {
        const val = {
            teacher_id: Number(editedItem.teacher_id),
            student_id: Number(editedItem.student_id),
            rating: Number(editedItem.rating),
            desc: editedItem.desc
        };
        form.setFieldsValue(val);
    } else {
        form.resetFields();
    }


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
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >



                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>



                    <Form.Item
                        label="Teacher Id"
                        name="teacher_id"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>


                    <Form.Item
                        label="Student Id"
                        name="student_id"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>


                    <Form.Item
                        label="Description"
                        name="desc"
                    >
                        <TextArea />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={updateData.isLoading}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}
