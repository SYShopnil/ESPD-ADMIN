/* eslint-disable */

import React, { useState } from 'react';
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { get, patch, post } from '~/services/api/api';
import { deleteApi, get, post } from "~/services/api/api";
import { API_CRUD, API_CRUD_FIND_WHERE } from '~/services/api/endpoints';
import { SERVER_URL } from '~/configs';
import { PlusOutlined } from '@ant-design/icons';

const DetailsFindeTutor = () => {
  const BASE_URL = '/find-tutor';
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = useParams(); // read id parameter from the url

  const [open, setOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const drawerTitle = 'Accept Teacher';


  const showDrawer = () => {
    setOpen(true);
    setIsEditing(false);
    setEditedItem(null);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onClickEdit = (record: any) => {
    setIsEditing(true);
    setEditedItem(record);
    setOpen(true);
  }

  const onSubmitSuccess = (isEditing: boolean) => {
    setTrigger(trigger => trigger + 1)
    if (isEditing) {
      setOpen(false);
      setIsEditing(false);
      setEditedItem(null);
    } else {
      setOpen(false);
      setIsEditing(false);
      setEditedItem(null);
    }
  }


  // const {
  //   isLoading,
  //   isError,
  //   error,
  //   data: details,
  //   refetch,
  //   isSuccess
  // } = useQuery({
  //   queryKey: [`find-tutor-details-${id}`],
  //   queryFn: () => get(`${API_CRUD}/${id}?model=FindTutor`),
  // });


  const { isLoading, isError, error, isSuccess, data: details, refetch } = useQuery([`find-tutor-details-${id}`], () => post(`${API_CRUD_FIND_WHERE}?model=FindTutor`, {
    "where": {
      "id": Number(id)
    },
    "include": {
      "subject": true,
      "level": true
    }
  }), { staleTime: 0 });

  console.log({ details })

  // after clicking the save button , onFinish function activates



  return (
    <>
      {/* <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>Add New</Button>
      </Space> */}
      <Card bordered={true} style={{ width: "100%" }}>
        <Title level={2}>Find Tutor Details</Title>
        <br />
        {/* <Divider orientation="right" plain>
          {!details?.data?.is_accepted &&
            // <Button type="primary" onClick={(data) => onFinish(details.data.token)}>Accept Request </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>Accept Request</Button>
          }
          
        </Divider> */}
        <Descriptions size='middle'>
          <Descriptions.Item  label="name"><span>{details?.data[0]?.name}</span></Descriptions.Item>
          <Descriptions.Item  label="Email">{details?.data[0]?.email}</Descriptions.Item>
          <Descriptions.Item  label="Telephone">{details?.data[0]?.phone}</Descriptions.Item>
          <Descriptions.Item  label="Subject">{details?.data[0]?.subject?.name}</Descriptions.Item>
          <Descriptions.Item  label="Level">{details?.data[0]?.level?.name}</Descriptions.Item>
          <br />
          <Descriptions.Item label="Description">
            {details?.data[0]?.description}
          </Descriptions.Item>

        </Descriptions>

      </Card>
    </>
  );
};

export default DetailsFindeTutor;
