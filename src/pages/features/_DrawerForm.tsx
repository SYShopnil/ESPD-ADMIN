/* eslint-disable */

import { useMutation } from "@tanstack/react-query";
import { Button, Checkbox, Drawer, Form, Input, Select, message } from "antd";
import { patch, post, put } from "~/services/api/api";
import React, { useEffect, useState } from "react";
import { API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { Option } from "antd/es/mentions";

// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const [imagePreview, setImagePreview] = useState(null)

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
        if (url !== null && url !== "") {
            formValues.image = url;
        }
        // console.log({ formValues })
        if (isEditing) {
            updateData.mutate({
                ...formValues,
                id: editedItem.id,
            })
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    // if (editedItem) {
    //     const val = {
    //         title: editedItem.title,
    //         description: editedItem.description,
    //     };
    //     form.setFieldsValue(val);
    // } else {
    //     form.resetFields();
    // }



    const fileHandleChange = async (e) => {
        const fileName = e.target.name
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj) {
            return;
        }
        setImagePreview(URL.createObjectURL(fileObj));
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        const file = await axios.post(API_FILE_UPLOAD, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            setUrl(res?.data?.data?.url)
        }).catch(err => {
            console.log(err)
        })

    }


    const getImagePreview = () => {
        if (imagePreview) {
            return <img src={imagePreview} alt="" height={80} />
        }
        if (editedItem && editedItem.image) {
            return <img src={editedItem.image} alt="" height={80} />
        }
        return null;
    };


    useEffect(() => {
        if (editedItem) {
            const val = {
                title: editedItem.title,
                description: editedItem.description,
                location: editedItem.location,
            };
            form.setFieldsValue(val);
        } else {
            form.resetFields();
        }
    }, [editedItem])


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
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Location"
                        name="location"
                    >
                        <Select placeholder="location">
                            <Option value="home" >Home</Option>
                            <Option value="work_at_espd">Work At Espd</Option>
                            <Option value="work_at_espd_body">Work At Espd Body</Option>
                        </Select>
                    </Form.Item>

                    <>
                        <input type="file" onChange={fileHandleChange} />
                        {getImagePreview()}
                    </>
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
