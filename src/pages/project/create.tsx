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

import type { DatePickerProps } from 'antd';

import { Typography } from 'antd';
const { Title } = Typography;
const { TextArea } = Input;
import { API_CRUD } from '~/services/api/endpoints';
import { get, post } from '~/services/api/api';
import { SERVER_URL } from '~/configs';
import { useState } from 'react';
import dayjs from 'dayjs';

const createProject = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());

  const dateFormat = 'YYYY-MM-DD'; // pass this variable to ant d Datepicker

  const BASE_URL = '/project';
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: project,
  } = useQuery({
    queryKey: ['projectData'],
    queryFn: () => get(`${SERVER_URL}/api/v1/${API_CRUD}?model=project`),
  });

  // console.log(`${SERVER_URL}/api/v1/${API_CRUD}?model=client`);

  console.log('projects data: ', project);

  // pass this function onSelectStartDate and onSelectDeadline to antd Datepicker's onChange as props
  const onSelectStartDate = (date, dateString: string) => {
    setStartDate(date.toISOString());
  };

  const onSelectDeadline = (date, dateString: string) => setDeadline(date.toISOString());

  // addProjectMutation use react-query useMutation function to POST data and then navigate to BASE URL
  const addProjectMutation = useMutation(
    async (data) => await post(`${SERVER_URL}/api/v1/${API_CRUD}?model=project`, data),
    {
      onSuccess: () => {
        message.success('successfully created');
        navigate(BASE_URL);
      },
    },
  );

  // after clicking the save button , onFinish function activates

  const onFinish = (values: any) => {
    console.log('newly created project values: ', values);

    const projectValues = {
      name: values.name,
      budget: values.budget,
      start_date: startDate,
      deadline,
      description: values.description,
      labels: values.label,
      status: values.status,
    };

    console.log('updated project value: ', projectValues);

    addProjectMutation.mutate(projectValues);
  };

  return (
    <>
      <Card bordered={false}>
        <Space wrap>
          <Title level={2}>Create Project</Title>
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
                rules={[{ required: true, message: 'Please enter project name' }]}
              >
                <Input placeholder="name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Budget" name="budget">
                <InputNumber placeholder="Budget" style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Start Date" name="startDate">
                <DatePicker
                  picker="date"
                  format={dateFormat}
                  onChange={onSelectStartDate}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Deadline" name="endDate">
                <DatePicker
                  picker="date"
                  format={dateFormat}
                  onChange={onSelectDeadline}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Labels" name="label">
                <Input placeholder="label" style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Status" name="status">
                <Input placeholder="status" style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Description" name="description">
                <TextArea placeholder="Describe the project" />
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

export default createProject;
