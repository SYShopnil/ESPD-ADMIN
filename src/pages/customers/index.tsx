import React from 'react'
import {Button, Card, Col, Divider, Row, Space} from "antd";
import { Typography } from 'antd';
import SinglePageDrawer from "~/components/singlepage-drawer";
import {INPUT_EMAIL, INPUT_PASSWORD, INPUT_TEXT} from "~/components/form/input-types";
const { Title } = Typography;

const Customers = () => {

    const fields = [
        {
            name: 'name',
            type: INPUT_TEXT,
            required: true
        },
        {
            name: 'email',
            type: INPUT_EMAIL,
        },
        {
            name: 'phone',
            type: INPUT_TEXT,
        }
    ];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            editable: true
        },
        /*{
          title: 'Body',
          render: (record) => {
            console.log({record});
            return record.body
          },
        }*/
    ];

    return (
        <>
            <SinglePageDrawer
                title={'Customers'}
                id={'tododos'}
                fields={fields}
                columns={columns}
                createUrl={''}
                updateUrl={'/posts'}
                // deleteUrl={}
                dataUrl={'/easyql/crud?model=Customer'}
                extractData={(response) => {
                    console.log({response});
                    return response?.posts
                }}
            />
        </>
    )
};

export default Customers
