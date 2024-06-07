/* eslint-disable */

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Drawer, Form, Input, message, Select } from "antd";
import { get, patch, post } from "~/services/api/api";
import React, { useEffect } from "react";
import { LEVEL_UPDATE, getUrlForModel } from "~/services/api/endpoints";

// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();

    const createData = useMutation(async (data) => await post(getUrlForModel(model), data), {//TODO refactor
        onSuccess: (response) => {
            onSubmitSuccess();
            message.success('Create Successfully');
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const updateData = useMutation(async (data: any) => await patch(`${LEVEL_UPDATE}/${data?.id}`, data), {//TODO refactor
        onSuccess: (response) => {
            message.success('Updated Successfully');
            form.resetFields();
            onSubmitSuccess(true);
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const { isLoading, isSuccess, isError, error, data: subjects, refetch } = useQuery({
        queryKey: ["subject-list-for-level"],
        queryFn: () => get(getUrlForModel("Subject")),
        enabled: !!open
    });
    useEffect(() => {
        if (open) {
            refetch();
        }
    }, [open]);


    const onFinish = async (formValues: any) => {
        if (isEditing) {
            const subjects = [];
            formValues.subject_id?.map(i => {
                subjects.push({ Subject: { connect: { id: Number(i) } } })
            })
            const payload: any = {
                name: formValues.name,
                SubjectOnLevel: {
                    create: subjects
                }
            }
            console.log({ payload })
            updateData.mutate({
                ...payload,
                id: editedItem.id
            })
        } else {
            const subjects = [];
            formValues.subject_id?.map(i => {
                subjects.push({ Subject: { connect: { id: Number(i) } } })
            })
            const payload: any = {
                name: formValues.name,
                SubjectOnLevel: {
                    create: subjects
                }
            }
            const createLevel = await createData.mutate(payload)
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    if (editedItem) {
        const sub_ids = editedItem?.SubjectOnLevel?.map(i => i.subject_id);
        const val = {
            name: editedItem.name,
            subject_id: sub_ids,
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
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="subject_id"
                        label="Subject List"
                        rules={[
                            {
                                required: true,
                                message: 'Please select one or more options',
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Select one or more options"
                            style={{ width: '100%' }}
                        >
                            {
                                isSuccess ?
                                    subjects?.data?.map(item => {
                                        return (
                                            < Select.Option key={item?.id} value={item?.id}>{item?.name}</Select.Option>
                                        )
                                    })
                                    : ""
                            }

                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={createData.isLoading || updateData.isLoading}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer >
        </>
    );
}
