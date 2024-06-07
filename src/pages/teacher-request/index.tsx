/* eslint-disable */

import React from 'react';
import { Button, Card, Col, Row, Space, Table, message, Tag } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
import { ColumnsType } from 'antd/es/table';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { deleteApi, get } from '~/services/api/api';
import { API_CRUD } from '~/services/api/endpoints';
import { SERVER_URL } from '~/configs';
import { EyeOutlined } from '@ant-design/icons';

const TeacherRequest = () => {
  interface DataType {
    key: React.Key;
    id: number;
    qts_confered: boolean;
    has_dbs_checked: boolean;
    email: string;
    phone: number;
    experience: string;
    token: string;
    work_email: string;
    linkedin_url: string;
  }

  const {
    isLoading,
    isError,
    error,
    data: request,
    refetch,
  } = useQuery({
    queryKey: ['teacherOnboardRequestData'],
    queryFn: () => get(`${API_CRUD}?model=TeacherOnboardRequest`),
  });

refetch()
  
  const deleteMutation = useMutation(
    async (id) => await deleteApi(`${SERVER_URL}/api/v1/${API_CRUD}/${id}?model=client`),
    {
      onSuccess: () => {
        message.success('deleted successfully');
        refetch();
      },
      onError: () => { },
    },
  );

  const handleDeleteClient = (id: any) => {
    deleteMutation.mutate(id);
  };

  const columns = [
    {
      title: 'Id', dataIndex: 'id'
    },
    {
      title: 'Email', dataIndex: 'email'
    },
    {
      title: 'Accept',
      render: (record: any) => {
        if (record.is_accepted) {
          return <Tag color="green">Yes</Tag>;
        }
        return <Tag color="orange">No</Tag>;
      }
    },
    {
      title: 'Dbs Checked',
      render: (record: any) => {
        if (record.has_dbs_checked) {
          return <Tag color="green">Yes</Tag>;
        }
        return <Tag color="orange">No</Tag>;
      }
    },
    {
      title: 'Conferd',
      render: (record: any) => {
        if (record.qts_confered) {
          return <Tag color="green">Yes</Tag>;
        }
        return <Tag color="orange">No</Tag>;
      }
    },
    {
      title: 'Detail',
      render: (record: DataType) => {
        return (
          <>
            <Space>
              <Link to={`/teacher-request/details/${record.id}`}>
                <Button type="primary" ghost>
                  <EyeOutlined />
                </Button>
              </Link>
            </Space>
          </>
        );
      }
    },
  ];


  

  if (isLoading) return <p>Loading ...</p>;

  const data = request.data ? request.data : [];

  return (
    <>
      <Card bordered={false}>
        <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title level={2}>New Teacher Request</Title>
        </Space>

        <Table dataSource={data} columns={columns}></Table>
      </Card>
    </>
  );
};

export default TeacherRequest;
