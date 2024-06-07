/* eslint-disable */

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Image, message, Popconfirm, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { deleteApi, get, post } from "~/services/api/api";
import React, { useEffect } from "react";
import { API_CRUD_FIND_WHERE, getUrlForModel } from "~/services/api/endpoints";
import { Link, useParams } from "react-router-dom";

// @ts-ignore
export default function _TableGrid({ model, trigger, onClickEdit, ...props }) {
    const KEY = `all-${model}`;
    const { location } = useParams(); // read id parameter from the url

    const { isLoading, isError, error, isSuccess, data: fetchData, refetch } = useQuery([location, "Features Data"], () => post(`${API_CRUD_FIND_WHERE}?model=Feature`, {
        "where": {
            "location": location
        }
    }), { staleTime: 0 });

    console.log(fetchData)

    useEffect(() => {
        if (trigger) {
            refetch();
        }
    }, [trigger]);


    // title
    // description
    // image

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title'
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Location',
            dataIndex: 'location'
        },
        {
            title: '',
            render: (record: any) => {
                return <Space>
                    <Image src={record?.image} style={{ maxHeight: "100px", maxWidth: "100px" }} ></Image>
                </Space>
            },
        },
        {
            title: 'Actions',
            render: (record: any) => {
                return <Space>
                    <Button onClick={() => onClickEdit(record)} type={'link'}><EditOutlined /></Button>
                </Space>
            },
        }
    ];

    if (isError) {
        return <p>Failed to load data</p>
    }

    return (
        <Table
            rowKey="id"
            loading={isLoading}
            columns={columns}
            dataSource={fetchData?.data} />
    );
}
