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
  message,
  Image
} from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { get, patch, post } from '~/services/api/api';
import { API_CRUD } from '~/services/api/endpoints';
import { SERVER_URL } from '~/configs';


const TestimonialDetails = () => {
  const BASE_URL = '/testimonial';
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
    queryFn: () => get(`${API_CRUD}/${id}?model=Testimonial`),
  });


  if (isLoading || !isSuccess || details === undefined) {
    return <Spin />
  }

  return (
    <>
      <Card bordered={true} style={{ width: "100%" }}>
        <Descriptions>
          <Descriptions.Item label="Student Name">{details?.data?.student_name}</Descriptions.Item>
          <Descriptions.Item label="Subject">{details?.data?.subject}</Descriptions.Item>
          <Descriptions.Item label="School">{details?.data?.school}</Descriptions.Item>
          <Descriptions.Item label="Image"><Image src={details?.data?.image} style={{maxHeight:"100px"}}></Image></Descriptions.Item>
          <Descriptions.Item label="Sort Order">{details?.data?.sort_order}</Descriptions.Item>
          <Descriptions.Item label="Is Student">{details?.data?.is_student ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}</Descriptions.Item>

          <Descriptions.Item label="Description">
            {details?.data?.desc}
          </Descriptions.Item>

        </Descriptions>

      </Card>
    </>
  );
};

export default TestimonialDetails;
