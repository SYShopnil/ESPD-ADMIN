/* eslint-disable */

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { deleteApi, get, post } from "~/services/api/api";
import React, { useEffect } from "react";
import { API_CRUD_FIND_WHERE, getUrlForModel } from "~/services/api/endpoints";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";

// @ts-ignore
export default function _TableGrid({ model, trigger, onClickEdit, ...props }) {
    const KEY = `all-${model}`;

    // console.log(model)
    // const { isLoading, isError, error, data: fetchData, refetch } = useQuery([KEY], () => get(getUrlForModel(model)), { staleTime: 0 });


    const { isLoading, isError, error, isSuccess, data: fetchData, refetch } = useQuery([KEY], () => post(`${API_CRUD_FIND_WHERE}?model=Review`, {
        "where": {},
        "include": {
            "student": {
                "select": {
                    "first_name": true,
                    "last_name": true
                }
            },
            "teacher": {
                "select": {
                    "first_name": true,
                    "last_name": true
                }
            },
        }
    }), { staleTime: 0 });


    // console.log({ fetchData })

    useEffect(() => {
        if (trigger) {
            refetch();
        }
    }, [trigger]);


    const deleteMutation = useMutation(async (id: any) => await deleteApi(getUrlForModel(model, id)), {
        onSuccess: () => {
            message.success('Deleted Successfully');
            refetch()
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const handleDeleteClient = (id: any) => {
        deleteMutation.mutate(id);
    }

    const columns = [
        {
            title: 'Teacher',
            render: function (text, record, index) {
                return record?.teacher?.first_name + " " + record?.teacher?.last_name
            }
        },
        {
            title: 'Student',
            render: function (text, record, index) {
                return record?.student?.first_name + " " + record?.student?.last_name
            }
        },
        {
            title: 'Rating',
            dataIndex: 'rating'
        },
        {
            title: 'Description',
            dataIndex: 'desc'
        },
        {
            title: 'Actions',
            render: (record: any) => {
                return <Space>
                    <Button onClick={() => onClickEdit(record)} type={'link'}><EditOutlined /></Button>
                    <Popconfirm
                        title="Delete this item?"
                        description="This action cannot be undone"
                        onConfirm={() => handleDeleteClient(record.id)}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger type={'link'}><DeleteOutlined /></Button>
                    </Popconfirm>
                </Space>
            },
        }
    ];

    if (isError) {
        return <p>Failed to load data</p>
    }

    return (
        <>
            <Title>{model + '\'s'}</Title>
            <Table
                rowKey="id"
                loading={isLoading}
                columns={columns}
                dataSource={fetchData?.data} />
        </>
    );
}
