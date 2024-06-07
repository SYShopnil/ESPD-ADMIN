/* eslint-disable */

import { useMutation } from "@tanstack/react-query";
import { Button, Checkbox, Divider, Drawer, Form, Input, InputNumber, Select, Space, Switch, Upload, message } from "antd";
import { patch, post, put } from "~/services/api/api";
import React, { useState } from "react";
import { REGISTER_TEACHER, API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";

// @ts-ignore
export default function DrawerFormRegister({ title, onClose, open, onSubmitSuccess, isEditing, ...props }) {

    // console.log(teacher)
    const [url, setUrl] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [form] = Form.useForm();

    const createMutate = useMutation(async (data) => await post(REGISTER_TEACHER, data), {
        onSuccess: (response) => {
            form.resetFields()
            message.success('Saved Successfully');
            onSubmitSuccess();
        },
        onError: () => {
            form.resetFields();
            message.error('Something went wrong');
        }
    });



    const onFinish = async (formValues: any) => {
        if (formValues?.work_email === undefined) {
            delete formValues["work_email"]
        }

        if (formValues?.experience !== undefined) {
            formValues.experience = Number(formValues?.experience)
        }

        if (formValues?.price_group !== undefined) {
            formValues.price_group = Number(formValues?.price_group)
        }

        if (formValues?.price_one_to_one !== undefined) {
            formValues.price_one_to_one = Number(formValues?.price_one_to_one)
        }

        if (formValues?.tution_hours !== undefined) {
            formValues.tution_hours = Number(formValues?.tution_hours)
        }

        if (formValues?.repeated_student !== undefined) {
            formValues.repeated_student = Number(formValues?.repeated_student)
        }
        if (url !== null) {
            formValues.profile_photo = url;
        }
        createMutate.mutate(formValues)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            phone: '${label} is not a valid phone!',
        },
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };


    const getImagePreview = () => {
        if (imagePreview) {
            return <img src={imagePreview} alt="" height={80} />
        }
        return null;
    };

    const fileHandleChange = async (e) => {
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



    return (
        <>
            <Drawer
                title={"Add Teacher"}
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
                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="work_email"
                        label="Work Email" >
                        <Input />
                    </Form.Item>

                    <>

                        <Form.Item
                            label="Bio"
                            name="bio"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                        >
                            <TextArea />
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

                        <Form.Item
                            label="Experience"
                            name="experience"
                        >
                            <Input type="number" />
                        </Form.Item>

                        <Form.Item
                            label="Repeated Student"
                            name="repeated_student"
                        >
                            <Input type="number" />
                        </Form.Item>


                        <Form.Item
                            label="Tution Hours"
                            name="tution_hours"
                        >
                            <Input type="number" />
                        </Form.Item>

                        <Form.Item
                            label="price one to one"
                            name="price_one_to_one"
                        >
                            <Input type="number" />
                        </Form.Item>

                        <Form.Item
                            label="price group"
                            name="price_group"
                        >
                            <Input type="number" />
                        </Form.Item>


                        <Form.Item name="is_dbs_checked" label="Dbs Checked" valuePropName="true">
                            <Switch />
                        </Form.Item>

                        <Form.Item name="is_super_tutor" label="Is Super Tutor" valuePropName="true">
                            <Switch />
                        </Form.Item>


                        <Form.Item name="free_video_call" label="free video all" valuePropName="true">
                            <Switch />
                        </Form.Item>

                        <Form.Item name="lesson_group" label="lesson group" valuePropName="true">
                            <Switch />
                        </Form.Item>

                        <Form.Item name="lesson_one_to_one" label="lesson one-to-one" valuePropName="true">
                            <Switch />
                        </Form.Item>
                    </>

                    <Divider>
                        <input type="file" onChange={fileHandleChange} />
                        {getImagePreview()}
                    </Divider>


                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}
