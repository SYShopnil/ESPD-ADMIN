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
  message,
  Row,
  Col
} from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { get, patch, post } from '~/services/api/api';
import { API_CRUD } from '~/services/api/endpoints';
import { SERVER_URL } from '~/configs';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import DrawerForm from "~/components/level/_DrawerForm";
import TableGrid from '~/components/level/_TableGrid';

const TeacherDetails = () => {
  const drawerTitle = 'Update Level';
  const title = "Level Cost"
  const model = 'LevelCost';
  const [open, setOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const BASE_URL = '/level';
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
    queryKey: [`levelcost-${id}`],
    queryFn: () => get(`${API_CRUD}/${id}?model=Level`),
  });


  if (isLoading || !isSuccess || details === undefined) {
    return <Spin />
  }

  console.log(details.data)

  const onClickEdit = (record: any) => {
    setIsEditing(true);
    setEditedItem(record);
    setOpen(true);
  }


  const showDrawer = () => {
    setOpen(true);
    setIsEditing(false);
    setEditedItem(null);
  };

  const onClose = () => {
    setOpen(false);
  };

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

  console.log(details)

  return (
    <>
      <DrawerForm
        title={drawerTitle}
        onClose={onClose}
        open={open}
        model={model}
        isEditing={isEditing}
        editedItem={editedItem}
        onSubmitSuccess={onSubmitSuccess}
      />
      <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={2}>{details?.data?.name}</Title>
      </Space>
      <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={2}>Costs</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>Add New</Button>
      </Space>
      <Card bordered={true} style={{ width: "100%" }}>
        <Row gutter={16}>
          <Col className="gutter-row" span={24}>
            <TableGrid
              trigger={trigger}
              model={model}
              id
              onClickEdit={onClickEdit}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default TeacherDetails;
