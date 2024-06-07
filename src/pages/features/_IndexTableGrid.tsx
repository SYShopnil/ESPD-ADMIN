/* eslint-disable */

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Image, message, Popconfirm, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { deleteApi, get } from "~/services/api/api";
import React, { useEffect } from "react";
import { getUrlForModel } from "~/services/api/endpoints";
import { Link } from "react-router-dom";

// @ts-ignore
export default function _IndexTableGrid() {

    const features = [

        {
            location: "home"
        },
        {
            location: "work_at_espd"
        },
        {
            location: "work_at_espd_body"
        }
    ]
    const columns = [
        {
            title: 'Title',
            dataIndex: 'location'
        },
        {
            title: 'Actions',
            render: (record: any) => {
                return <Space>
                    <Link to={`/features/details/${record.location}`}>
                        <Button type="primary" ghost>
                            <EyeOutlined />
                        </Button>
                    </Link>
                </Space>
            },
        }
    ];
    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={features} />
    );
}
