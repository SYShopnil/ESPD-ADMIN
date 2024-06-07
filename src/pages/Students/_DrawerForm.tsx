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
            first_name: editedItem.first_name,//
            last_name: editedItem.last_name,//
            profile_photo: editedItem.profile_photo,
            email: editedItem.email,//
            phone: editedItem.phone,//
            address_line_1: editedItem.address_line_1,
            address_line_2: editedItem.address_line_2,
            city: editedItem.city,
            postal_code: editedItem.postal_code,
            country: editedItem.country,
            is_verified: editedItem.is_verified,
        };
        form.setFieldsValue(val);
    } else {
        form.resetFields();
    }

    const {
        isLoading,
        isError,
        error,
        data: request,
        refetch,
    } = useQuery({
        queryKey: ['SubejectDataForTestimonial'],

        queryFn: () => get(`${SERVER_URL}/api/v1/${API_CRUD}?model=Subject`),
    });

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
                        label="First Name"
                        name="first_name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="last_name"
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Address_line_1"
                        name="address_line_1"
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="Address_line_2"
                        name="address_line_2"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Postal code"
                        name="postal_code"
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="City"
                        name="city"
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="Country"
                        name="country"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="is_verified" label="Is Verified" valuePropName="true">
                        <Switch />
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
