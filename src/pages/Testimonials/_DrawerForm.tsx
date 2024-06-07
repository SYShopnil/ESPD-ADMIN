/* eslint-disable */

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Drawer, Form, Input, Select, Space, message } from "antd";
import { patch, post, put } from "~/services/api/api";
import React, { useEffect, useState } from "react";
import { API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";
import TextArea from "antd/es/input/TextArea";
import { API_CRUD } from '~/services/api/endpoints';
import { deleteApi, get } from '~/services/api/api';
import { SERVER_URL } from '~/configs';
import { Option } from "antd/es/mentions";
import axios from "axios";




// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();
    const [imagePreview, setImagePreview] = useState(null)

    const [url, setUrl] = useState("")


    // let url

    const createData = useMutation(async (data) => await post(getUrlForModel(model), data.data), {//TODO refactor

        onSuccess: (response) => {
            message.success('Saved Successfully');
            form.resetFields();
            onSubmitSuccess();
            setUrl(null)
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const updateData = useMutation(async (data: any) => await patch(getUrlForModel(model, data.id), data), {//TODO refactor
        onSuccess: (response) => {
            message.success('Updated Successfully');
            form.resetFields();
            onSubmitSuccess(true);
            setUrl(null)
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const onFinish = async (formValues: any) => {
        if (url !== null && url !== "") {
            formValues.image = url;
        }
        if (formValues.sort_order) {
            formValues.sort_order = Number(formValues.sort_order)
        }
        if (isEditing) {
            updateData.mutate({
                ...formValues,
                id: editedItem.id
            })
        } else {
            // @ts-ignore
            createData.mutate({
                data: formValues
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    // if (editedItem) {
    //     if (url !== null && url !== undefined && url !== "") {
    //         editedItem.image = url;
    //     }
    //     const val = {
    //         student_name: editedItem.student_name,
    //         desc: editedItem.desc,
    //         subject: editedItem.subject,
    //         school: editedItem.school,
    //         is_student: Boolean(editedItem.is_student),
    //         sort_order: Number(editedItem.sort_order),
    //     };
    //     form.setFieldsValue(val);
    // } else {
    //     form.resetFields();
    // }

    const {
        isLoading,
        isError,
        error,
        data: subjects,
        refetch,
    } = useQuery({
        queryKey: ['SubejectDataForTestimonial'],

        queryFn: () => get(`${API_CRUD}?model=Subject`),
    });


    console.log(subjects?.data)
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
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
            console.log(res?.data?.data?.url)
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
                student_name: editedItem.student_name,
                subject: editedItem.subject,
                school: editedItem.school,
                desc: editedItem.desc,
                sort_order: editedItem.sort_order,
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
                        label="Student Name"
                        name="student_name"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item
                        label="Subject"
                        name="subject"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Space wrap>
                            <Select
                                defaultValue="---select---"
                                style={{ width: 120 }}
                                onChange={handleChange}
                                options={subjectList}

                            />
                        </Space>
                    </Form.Item> */}

                    <Form.Item
                        name="subject"
                        label="Subject"
                        rules={[{ required: true, message: 'Please select Subject!' }]}
                    >
                        <Select placeholder="select your Subject">
                            {
                                subjects?.data.map(item => {
                                    return (
                                        <Option value={item?.name}>{item?.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="School"
                        name="school"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Is Student"
                        name="is_student"
                    >
                        <Select placeholder="Is Student">
                            <Option value={true} >Student</Option>
                            <Option value={false}>Parent</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Sort Order"
                        name="sort_order"
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="desc"
                    >
                        <TextArea />
                    </Form.Item>

                    {/* <Form.Item
                        label="Image"
                        name="image"
                    >
                        <Input type="file" onChange={fileHandleChange} />
                    </Form.Item> */}
                    <input type="file" onChange={fileHandleChange} />
                    {getImagePreview()}


                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={createData.isLoading || updateData.isLoading}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}
