/* eslint-disable */

import React from 'react';
import { Button, Card, Space, Table, } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
import { useQuery } from '@tanstack/react-query';
import { API_CRUD } from '~/services/api/endpoints';
import { SERVER_URL } from '~/configs';
import { get } from "~/services/api/api";
import { Link } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';


const FindTutorList = () => {

  const {
    isLoading,
    isError,
    error,
    data: request,
    refetch,
  } = useQuery({
    queryKey: ['findTutorList'],
    queryFn: () => get(`${API_CRUD}?model=FindTutor`),
  });


  const columns = [
    {
      title: 'Name', dataIndex: 'name'
    },
    {
      title: 'Email', dataIndex: 'email'
    },
    {
      title: 'Phone', dataIndex: 'phone'
    },
    {
      title: 'Description', dataIndex: 'description'
    },
    {
      title: 'Details',
      render: (record: DataTyp) => {
        return (
          <>
            <Space>
              <Link to={`/find-tutor/details/${record.id}`}>
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
console.log(data)



return (
  <>
    <Card bordered={false}>
      <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={2}>Find Tutor's List</Title>
      </Space>

      <Table dataSource={data} columns={columns}></Table>
    </Card>
  </>
);
};

export default FindTutorList;
