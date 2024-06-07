/* eslint-disable */

import React from 'react';
import {
  Button,
  Card,
  Spin,
  Badge,
  Descriptions,
  Space,
  Divider,
  Tag,
  message
} from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { get, patch, post } from '~/services/api/api';
import { API_CRUD } from '~/services/api/endpoints';
import { SERVER_URL } from '~/configs';


const TestimonialDetails = () => {
  const BASE_URL = '/students';
  const navigate = useNavigate();

  const { id } = useParams(); // read id parameter from the url

  const {
    isLoading,
    isError,
    error,
    data: details,
    refetch,
    isSuccess
  } = useQuery({
    queryKey: [`teacher-request-details-${id}`],
    queryFn: () => get(`${API_CRUD}/${id}?model=Student`),
  });


  if (isLoading || !isSuccess || details === undefined) {
    return <Spin />
  }

  console.log(details.data)




  return (
    <>
      <Card bordered={true} style={{ width: "100%" }}>
        <Descriptions>
          <Descriptions.Item label="First Name">{details?.data?.first_name}</Descriptions.Item>
          <Descriptions.Item label="Last Name">{details?.data?.last_name}</Descriptions.Item>
          <Descriptions.Item label="Email">{details?.data?.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{details?.data?.phone}</Descriptions.Item>
          <Descriptions.Item label="Postal Code">{details?.data?.postal_code}</Descriptions.Item>
          <Descriptions.Item label="City">{details?.data?.city}</Descriptions.Item>
          <Descriptions.Item label="Country">{details?.data?.country}</Descriptions.Item>
          <Descriptions.Item label="Is Verified">{details?.data?.is_verified ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}</Descriptions.Item>

          <Descriptions.Item label="Address Line 1">
            {details?.data?.address_line_1}
          </Descriptions.Item>

          <Descriptions.Item label="Address Line 2">
            {details?.data?.address_line_2}
          </Descriptions.Item>
        </Descriptions>

      </Card>
    </>
  );
};

export default TestimonialDetails;
