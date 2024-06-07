/* eslint-disable */

import React from 'react';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Upload,
  message,
} from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { get, patch, post } from '~/services/api/api';
import { API_CRUD } from '~/services/api/endpoints';
import { SERVER_URL } from '~/configs';

const EditClient = () => {
  const BASE_URL = '/client';
  const navigate = useNavigate();

  const { id } = useParams(); // read id parameter from the url

  console.log('param id: ', id);

  const [form] = Form.useForm(); // from ant d;

  const {
    isLoading,
    isError,
    error,
    data: client,
    refetch,
  } = useQuery({
    queryKey: [`client-details-${id}`],
    queryFn: () => get(`${SERVER_URL}/api/v1/${API_CRUD}/${id}?model=client`),
  });

  console.log('clients data', client);

  form.setFieldsValue({
    name: client?.name,
    email: client?.email,
    phone: client?.phone,
    address: client?.address,
    website: client?.website,
    category: client?.category,
  });

  const editMutation = useMutation(
    async (data) =>
      await patch(`${SERVER_URL}/api/v1/${API_CRUD}/${id}?model=client`, data),
    {
      onSuccess: () => {
        message.success('Saved Successfully');
        navigate(BASE_URL);
      },
    },
  );

  const onFinish = (values: any) => {
    console.log(values);
    editMutation.mutate(values);
  };

  return (
    <>
      <Card bordered={false}>
        <Space wrap>
          <Title level={2}>Edit Clent</Title>
        </Space>

        <Divider></Divider>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          size="large"
          onFinish={onFinish}
        >
          <Row justify={'space-between'}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter name' }]}
              >
                <Input placeholder="name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please enter email' }]}
              >
                <Input placeholder=" email" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please enter phone' }]}
              >
                <Input placeholder="phone" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Address" name="address">
                <Input placeholder="address" style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Website" name="website">
                <Input placeholder="website" style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Category" name="category">
                <Input placeholder="category" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          {/* <Form.Item> */}

          <div style={{ textAlign: 'right', paddingRight: '65px' }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>

          {/* </Form.Item> */}
        </Form>
      </Card>
    </>
  );
};

export default EditClient;
