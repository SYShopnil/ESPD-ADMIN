/* eslint-disable */

import React, { useEffect, useState } from 'react';
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
import { get, patch, post } from '~/services/api/api';
import { API_CRUD } from '~/services/api/endpoints';
import { SERVER_URL } from '~/configs';
import DrawerForm from "./_DrawerForm";
import { PlusOutlined } from '@ant-design/icons';

const DetailsTeacherRequest = () => {
  const BASE_URL = '/teacher-request';
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


  const {
    isLoading,
    isError,
    error,
    data: details,
    refetch,
    isSuccess
  } = useQuery({
    queryKey: [`teacher-request-details-${id}`],
    queryFn: () => get(`${API_CRUD}/${id}?model=TeacherOnboardRequest`),
  });

  useEffect(() => {
    if (trigger) {
      refetch();
    }
  }, [trigger]);


  const addProjectMutation = useMutation(
    async (data) => await post(`admin/teacher/request/accept`, data),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['teacherOnboardRequestData'])
        message.success('successfully created');
        navigate(BASE_URL);
      },
    },
  );

  // after clicking the save button , onFinish function activates

  const onFinish = (token: string) => {
    const work_email = prompt('Enter teacher\'s work email', '');
    if (work_email === '' || work_email === null || work_email === undefined) return;
    //TODO check if valid email
    const payload = {
      token: token,
      work_email
    }
    addProjectMutation.mutate(payload);
  };


  if (isLoading || !isSuccess || details === undefined) {
    return <Spin />
  }




  return (
    <>
      <DrawerForm
        title={drawerTitle}
        onClose={onClose}
        open={open}
        isEditing={isEditing}
        teacher={details?.data}
        onSubmitSuccess={onSubmitSuccess}
      />
      {/* <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={2}>{title}</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>Add New</Button>
      </Space> */}
      <Card bordered={true} style={{ width: "100%" }}>
        <Divider orientation="right" plain>
          {!details?.data?.is_accepted &&
            // <Button type="primary" onClick={(data) => onFinish(details.data.token)}>Accept Request </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>Accept Request</Button>
          }

        </Divider>
        <Descriptions>
          <Descriptions.Item label="Email">{details?.data?.email}</Descriptions.Item>
          <Descriptions.Item label="Work Email">{details?.data?.work_email}</Descriptions.Item>
          <Descriptions.Item label="Telephone">{details?.data?.phone}</Descriptions.Item>
          {!!(details?.data?.linkedin_url) && <Descriptions.Item label="Linkdin"><a
            target={"_blank"}
            href={details?.data?.linkedin_url}>{details?.data?.linkedin_url}</a></Descriptions.Item>}
          <Descriptions.Item label="Qt Confered">{details?.data?.qts_confered ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}</Descriptions.Item>
          <Descriptions.Item label="Db Cheked">{details?.data?.has_dbs_checked ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}</Descriptions.Item>

          <Descriptions.Item label="Acceptation">{details?.data?.is_accepted ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}</Descriptions.Item>

          <Descriptions.Item label="Experience">
            {details?.data?.experience}
          </Descriptions.Item>

        </Descriptions>

      </Card>
    </>
  );
};

export default DetailsTeacherRequest;
