/* eslint-disable */
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Drawer, Form, Input, Select, Space, Switch, message, Divider, Upload, Image } from 'antd';
import { patch, post, put } from "~/services/api/api";
import React, { useEffect, useState } from "react";
import { API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();
    const [imagePreview, setImagePreview] = useState(null)
    const [authorImagePreview, setAuhtorImagePreview] = useState(null)
    const [blogImage, setBlogImage] = useState("")
    const [authorImage, setAuthorImage] = useState("")


    const createData = useMutation(async (data) => await post(getUrlForModel(model), data?.data), {//TODO refactor

        onSuccess: (response) => {
            message.success('Saved Successfully');
            form.resetFields();
            onSubmitSuccess();
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
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const onFinish = async (formValues: any) => {


        if (authorImage !== undefined && authorImage !== "") {
            formValues.author_image = authorImage
        }
        if (blogImage !== undefined && blogImage !== "") {
            formValues.image = blogImage
        }
        if (isEditing) {
            updateData.mutate({
                ...formValues,
                id: editedItem.id
            })
        }
        else {
            createData.mutate({
                data: formValues
            });
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };



    // const formData = new FormData()
    const fileHandleChange = async (e) => {
        e.preventDefault();
        const fileName = e.target.name
        if (fileName === "image") {
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
                // setImage(res?.data?.data?.url)
                setBlogImage(res?.data?.data?.url)
            }).catch(err => {
                console.log(err)
            })
        }
        else if (fileName === "author_image") {
            const fileObj = e.target.files && e.target.files[0];
            if (!fileObj) {
                return;
            }
            setAuhtorImagePreview(URL.createObjectURL(fileObj));
            const formData = new FormData()
            formData.append('file', e.target.files[0])
            const file = await axios.post(API_FILE_UPLOAD, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                // setAuthorImg(res?.data?.data?.url)
                setAuthorImage(res?.data?.data?.url)
            }).catch(err => {
                console.log(err)
            })
        }
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

    const getAuhtorImagePreview = () => {
        if (authorImagePreview) {
            return <img src={authorImagePreview} alt="" height={80} />
        }
        if (editedItem && editedItem.author_image) {
            return <img src={editedItem.author_image} alt="" height={80} />
        }
        return null;
    };



    useEffect(() => {
        if (editedItem) {
            title = "Update Blog"
            const val = {
                author_name: editedItem.author_name,//
                title: editedItem.title,//
                content: editedItem.content,
                category: editedItem.category,//
                short_desc: editedItem.short_desc,//
            };
            form.setFieldsValue(val);
        } else {
            form.resetFields();
        }

    }, [editedItem])

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };




    return (
        <>
            <Drawer
                title={title}
                width={1000}
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
                        label="Author Name"
                        name="author_name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Blog Title"
                        name="title"
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="Short Description"
                        name="short_desc"
                    >
                        <TextArea />
                    </Form.Item>

                    <Form.Item name="content" label="Content">
                        <ReactQuill
                            theme="snow" // You can choose different themes like 'snow', 'bubble', etc.
                            modules={{
                                toolbar: [
                                    [{ header: '1' }, { header: '2' }, { font: [] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link', 'image'],
                                    ['clean'],
                                ],
                            }}
                        />
                    </Form.Item>
                    <br />
                    
                    <Divider>
                        <label htmlFor="author_image">Auhtor Image</label>
                        <input id="author_image" type="file" name="author_image" onChange={fileHandleChange} />
                        {getAuhtorImagePreview()}
                    </Divider>
                    <Divider>
                        <label htmlFor="blog_image">Blog Image</label>
                        <input id="blog_image" type="file" name="image" onChange={fileHandleChange} />
                        {getImagePreview()}
                    </Divider>
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
