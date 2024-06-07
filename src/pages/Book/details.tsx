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
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { get, patch, post } from '~/services/api/api';
import { API_CRUD, API_CRUD_FIND_WHERE } from '~/services/api/endpoints';
import { SERVER_URL } from '~/configs';


const BookingDetails = () => {
  const BASE_URL = '/bookings';
  const navigate = useNavigate();
  const model = "Booking"

  const { id } = useParams(); // read id parameter from the url

  const {
    isLoading,
    isError,
    error,
    data: details,
    refetch,
    isSuccess
  } = useQuery({
    queryKey: [`${model}-request-details-${id}`],
    queryFn: () => post(`${API_CRUD_FIND_WHERE}?model=${model}`, {
      where: {
        id: Number(id)
      },
      include: {
        Teacher: {
          select: {
            first_name: true,
            last_name: true,
            profile_photo: true,
            email: true,
            work_email: true,
            phone: true,
          }
        },
        Student: {
          select: {
            first_name: true,
            last_name: true,
            profile_photo: true,
            email: true,
            phone: true,
          }
        },
        Subject: true,
        Level: true,
        ExamBoard: true,
      }
    }),
    select: (record: any) => {
      return record?.data[0]
    }

  });


  if (isLoading || !isSuccess || details === undefined) {
    return <Spin />
  }

  console.log("details  ==>> ", details)

  return (
    <>
      <Card bordered={true} style={{ width: "100%" }}>
        <Descriptions>
          <Descriptions.Item label="Student Name">{details?.Student?.first_name} {details?.Student?.last_name}</Descriptions.Item>
          <Descriptions.Item label="Student Email">{details?.Student?.email}</Descriptions.Item>
          <Descriptions.Item label="Student Phone">{details?.Student?.phone}</Descriptions.Item>
          <br />
          <br />
          <br />
          <Descriptions.Item label="Teacher Name">{details?.Teacher?.first_name} {details?.Teacher?.last_name}</Descriptions.Item>
          <Descriptions.Item label="Teacher Email">{details?.Teacher?.email}</Descriptions.Item>
          <Descriptions.Item label="Teacher Phone">{details?.Teacher?.phone}</Descriptions.Item>
          <br />
          <br />
          <br />


          <Descriptions.Item label="No of students">{details?.no_of_member}</Descriptions.Item>
          <Descriptions.Item label="Booking type">{details?.booking_type === "One_To_Group" ? "Group" : "One to one"}</Descriptions.Item>
          <Descriptions.Item label="Duration">{details?.duration} hours</Descriptions.Item>
          <Descriptions.Item label="Amount">{details?.amount}$</Descriptions.Item>
          <Descriptions.Item label="Payment status">{details?.payment_status}</Descriptions.Item>
          <Descriptions.Item label="Status">{details?.status}</Descriptions.Item>
          <br />
          <br />
          <br />

          <Descriptions.Item label="Exam board">{details?.ExamBoard?.name}</Descriptions.Item>
          <Descriptions.Item label="Level">{details?.Level?.name}</Descriptions.Item>
          <Descriptions.Item label="Subject">{details?.Subject?.name}</Descriptions.Item>
          <br />
          <br />
          <br />
          <Descriptions.Item label="Booking at">{new Date(details?.date).toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="Start at">{new Date(details?.start_time).toLocaleString()}</Descriptions.Item>
          <br />
          <Descriptions.Item label="Class link"><Link to={details?.meet_link} target="_blank">{details?.meet_link}</Link></Descriptions.Item>
        </Descriptions>
        <br />
        <br />
        <br />
        <Descriptions>
          <Descriptions.Item>{details?.suuport_message}</Descriptions.Item>
        </Descriptions>

      </Card>
    </>
  );
};

export default BookingDetails;
