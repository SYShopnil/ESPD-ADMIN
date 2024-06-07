/* eslint-disable */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Space,
  Upload,
} from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
import { API_CRUD } from '~/services/api/endpoints';
import { get, post } from '~/services/api/api';
import { SERVER_URL } from '~/configs';

const CreateClient = () => {
  const BASE_URL = '/client';
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    error,
    data: client,
  } = useQuery({
    queryKey: ['clientData'],
    queryFn: () => get(`${SERVER_URL}/api/v1/${API_CRUD}?model=client`),
  });

  console.log(`${SERVER_URL}/api/v1/${API_CRUD}?model=client`);
  console.log('clients data: ', client);

  // react-query useMutation for POST data to api

  const addClientMutation = useMutation(
    async (data) => await post(`${SERVER_URL}/api/v1/${API_CRUD}?model=client`, data),
    {
      onSuccess: () => {
        message.success('successfully created');
        navigate(BASE_URL);
      },
    },
  );

  const onFinish = (values: any) => {
    console.log('newly created client values: ', values);

    addClientMutation.mutate(values);
  };

  return (
    <>
      <Card bordered={false}>
        <Space wrap>
          <Title level={2}>Create Clent</Title>
        </Space>

        <Divider></Divider>
        <Form
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

export default CreateClient;
