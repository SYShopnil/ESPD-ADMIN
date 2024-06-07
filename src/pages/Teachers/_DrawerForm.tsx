/* eslint-disable */

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Divider, Drawer, Form, Input, Select, Space, Switch, message } from "antd";
import { patch, post, put } from "~/services/api/api";
import React, { useEffect, useState } from "react";
import { API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";
import TextArea from "antd/es/input/TextArea";
import { API_CRUD } from '~/services/api/endpoints';
import { deleteApi, get } from '~/services/api/api';
import { SERVER_URL } from '~/configs';
import axios from "axios";




// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();

    const [url, setUrl] = useState("")
    const [imagePreview, setImagePreview] = useState(null)

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
            formValues.profile_photo = url;
        }
        if (formValues.experience) {
            formValues.experience = Number(formValues.experience)
        }
        if (formValues.repeated_student) {
            formValues.repeated_student = Number(formValues.repeated_student)
        }
        if (formValues.tution_hours) {
            formValues.tution_hours = Number(formValues.tution_hours)
        }
        if (isEditing) {
            if (isEditing) {
                if (formValues.price_group) {
                    formValues.price_group = Number(formValues.price_group)
                }
                if (formValues.price_one_to_one) {
                    formValues.price_one_to_one = Number(formValues.price_one_to_one)
                }
                if (formValues.experience) {
                    formValues.experience = Number(formValues.experience)
                }
                updateData.mutate({
                    ...formValues,
                    id: editedItem.id
                })
            }
        }
        ;
    }
        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

        // if (editedItem) {
        //     const val = {
        //         first_name: editedItem.first_name,//
        //         last_name: editedItem.last_name,//
        //         profile_photo: editedItem.profile_photo,
        //         email: editedItem.email,//
        //         phone: editedItem.phone,//
        //         experience: Number(editedItem.experience),
        //         is_dbs_checked: editedItem.is_dbs_checked,//
        //         is_super_tutor: editedItem.is_super_tutor,
        //         bio: editedItem.bio,//
        //         description: editedItem.description,//
        //         price_one_to_one: editedItem.price_one_to_one,
        //         price_group: editedItem.price_group,
        //         address_line_1: editedItem.address_line_1,
        //         address_line_2: editedItem.address_line_2,
        //         city: editedItem.city,
        //         postal_code: editedItem.postal_code,
        //         country: editedItem.country,
        //         is_verified: editedItem.is_verified,
        //     };
        //     form.setFieldsValue(val);
        // } else {
        //     form.resetFields();
        // }

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
                return <img src={imagePreview} alt="" height={80}/>
            }
            if (editedItem && editedItem.profile_photo) {
                return <img src={editedItem.profile_photo} alt="" height={80}/>
            }
            return null;
        };



    useEffect(() => {
        if (editedItem) {
            const val = {
                first_name: editedItem.first_name,//
                last_name: editedItem.last_name,//
                email: editedItem.email,//
                phone: editedItem.phone,//
                experience: Number(editedItem.experience),
                is_dbs_checked: editedItem.is_dbs_checked,//
                is_super_tutor: editedItem.is_super_tutor,
                lesson_group: editedItem.lesson_group,
                free_video_call: editedItem.free_video_call,
                lesson_one_to_one: editedItem.lesson_one_to_one,
                bio: editedItem.bio,//
                description: editedItem.description,//
                price_one_to_one: editedItem.price_one_to_one,
                price_group: editedItem.price_group,
                address_line_1: editedItem.address_line_1,
                address_line_2: editedItem.address_line_2,
                city: editedItem.city,
                postal_code: editedItem.postal_code,
                country: editedItem.country,
                is_verified: editedItem.is_verified,
                repeated_student: editedItem.repeated_student,
                tution_hours: editedItem.tution_hours,
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
                    bodyStyle={{paddingBottom: 80}}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            label="First Name"
                            name="first_name"
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="last_name"
                        >
                            <Input/>
                        </Form.Item>


                        <Form.Item
                            label="Email"
                            name="email"
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Bio"
                            name="bio"
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                        >
                            <TextArea/>
                        </Form.Item>

                        <Form.Item
                            label="Address_line_1"
                            name="address_line_1"
                        >
                            <Input/>
                        </Form.Item>


                        <Form.Item
                            label="Address_line_2"
                            name="address_line_2"
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Postal code"
                            name="postal_code"
                        >
                            <Input/>
                        </Form.Item>


                        <Form.Item
                            label="City"
                            name="city"
                        >
                            <Input/>
                        </Form.Item>


                        <Form.Item
                            label="Country"
                            name="country"
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Experience"
                            name="experience"
                        >
                            <Input type="number"/>
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
                            <Input type="number"/>
                        </Form.Item>

                        <Form.Item
                            label="price group"
                            name="price_group"
                        >
                            <Input type="number"/>
                        </Form.Item>

                        <Form.Item name="is_dbs_checked" label="Dbs Checked" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        <Form.Item name="is_super_tutor" label="Is Super Tutor" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        <Form.Item name="free_video_call" label="free video call" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        <Form.Item name="lesson_one_to_one" label="lesson one-to-one" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        <Form.Item name="lesson_group" label="lesson group" valuePropName="checked">
                            <Switch />
                        </Form.Item>

                        <Divider>
                            <input type="file" onChange={fileHandleChange}/>
                            {getImagePreview()}
                        </Divider>


                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit" loading={updateData.isLoading}>
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            </>
        );

    }
