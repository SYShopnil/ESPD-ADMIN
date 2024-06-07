/* eslint-disable */

import React from 'react';
import { Button, Card, Col, Popconfirm, Row, Space, Table, message } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
import { ColumnsType } from 'antd/es/table';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { deleteApi, get } from '~/services/api/api';
import { API_CRUD } from '~/services/api/endpoints';
import { SERVER_URL } from '~/configs';

const Client = () => {
  interface DataType {
    key: React.Key;
    id: number;
    name: string;
    email: string;
    phone: number;
    address: string;
    category: string;
    website: string;
  }

  const {
    isLoading,
    isError,
    error,
    data: client,
    refetch,
  } = useQuery({
    queryKey: ['clientData'],

    queryFn: () => get(`${SERVER_URL}/api/v1/${API_CRUD}?model=client`),
  });
  console.log('clients data', client);

  const deleteMutation = useMutation(
    async (id) => await deleteApi(`${SERVER_URL}/api/v1/${API_CRUD}/${id}?model=client`),
    {
      onSuccess: () => {
        message.success('deleted successfully');
        refetch();
      },
      onError: () => {},
    },
  );

  const handleDeleteClient = (id: any) => {
    console.log('deleted id: ', id);
    deleteMutation.mutate(id);
  };

  const columns = [
    { key: 1, title: 'Id', dataIndex: 'id' },
    { key: 2, title: 'Name', dataIndex: 'name' },
    { key: 3, title: 'Email', dataIndex: 'email' },
    { key: 4, title: 'Phone', dataIndex: 'name' },
    { key: 5, title: 'Category', dataIndex: 'category' },
    { key: 6, title: 'Address', dataIndex: 'address' },
    { key: 7, title: 'Website', dataIndex: 'website' },
    {
      key: 8,
      title: 'Action',
      render: (record: DataType) => {
        return (
          <>
            <Space>
              <Link to={`/client/edit/${record.id}`}>
                <Button type="primary" ghost>
                  Edit
                </Button>
              </Link>
              <Popconfirm
                placement="topRight"
                title="Delete This Item ?"
                description="This action cannot be undone"
                onConfirm={() => handleDeleteClient(record.id)}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Button danger ghost>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];

  if (isLoading) return <p>Loading ...</p>;

  const data = client ? client : [];

  return (
    <>
      <Card bordered={false}>
        <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title level={2}>All Clients</Title>

          <Space style={{ paddingRight: '65px' }}>
            <Button type="primary">
              <Link to="/client/create">Add Client</Link>
            </Button>
          </Space>
        </Space>

        <Table dataSource={data} columns={columns}></Table>
      </Card>
    </>
  );
};

export default Client;
