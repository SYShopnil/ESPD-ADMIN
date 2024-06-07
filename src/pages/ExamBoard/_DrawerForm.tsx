/* eslint-disable */

import {useMutation} from "@tanstack/react-query";
import {Button, Drawer, Form, Input, message} from "antd";
import {patch, post} from "~/services/api/api";
import React, {useEffect, useState} from "react";
import {API_FILE_UPLOAD, getUrlForModel} from "~/services/api/endpoints";
import axios from "axios";

// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();
    const [url, setUrl] = useState("")
    const [imagePreview, setImagePreview] = useState(null)

    const createData = useMutation(async (data) => await post(getUrlForModel(model), data.data), {//TODO refactor
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
        if (url !== null) {
            formValues.logo = url;
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


            //uploadImageFun(formValues)
            // @ts-ignore
            createData.mutate({
                data: formValues
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (editedItem) {
            const val = {
                name: editedItem.name,
                sort_order: Number(editedItem.sort_order),
            };
            form.setFieldsValue(val);
        } else {
            form.resetFields();
        }
    }, [editedItem])

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

    /*const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };


    const customUploadMethod = async (options) => {
        console.log('customUploadMethod', options);
        const formData = new FormData()
        formData.append('file', options.file)
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
    };*/


    const getImagePreview = () => {
        if (imagePreview) {
            return <img src={imagePreview} alt="" height={80}/>
        }
        if (editedItem && editedItem.logo) {
            return <img src={editedItem.logo} alt="" height={80}/>
        }
        return null;
    };


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
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <input type="file" onChange={fileHandleChange} />
                    {getImagePreview()}

                    <Form.Item
                        label="Sort Order"
                        name="sort_order"
                    >
                        <Input type="number" />
                    </Form.Item>

                    {/*<Form.Item
                        name="file"
                        label="Upload File"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[
                            {
                                required: true,
                                message: 'Please upload a file!',
                            },
                        ]}
                    >
                        <Upload
                            name="file"
                            customRequest={customUploadMethod}
                            listType="text"
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>*/}


                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={createData.isLoading || updateData.isLoading}>
                            Save
                        </Button>
                    </Form.Item>
                    {/* <input type="file" onChange={fileHandleChange} /> */}
                </Form>
            </Drawer>
        </>
    );
}
