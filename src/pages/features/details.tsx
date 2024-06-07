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
import { API_CRUD, API_CRUD_FIND_WHERE } from '~/services/api/endpoints';
import { SERVER_URL } from '~/configs';
import TableGrid from "./_TableGrid";
import DrawerForm from './_DrawerForm';

const TestimonialDetails = () => {
  const BASE_URL = '/students';
  const navigate = useNavigate();

  const { location } = useParams(); // read id parameter from the url



  const { isLoading, isError, error, isSuccess, data: fetchData, refetch } = useQuery([location, "Features Data"], () => post(`${API_CRUD_FIND_WHERE}?model=Feature`, {
    "where": {
      "location": location
    }
  }), { staleTime: 0 });

  console.log(fetchData)


  const [open, setOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [trigger, setTrigger] = useState(0);


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


  return (
    <>
      <Card bordered={true} style={{ width: "100%" }}>
        <DrawerForm
          title={"Feature"}
          onClose={onClose}
          open={open}
          model={"Feature"}
          isEditing={isEditing}
          editedItem={editedItem}
          onSubmitSuccess={onSubmitSuccess}
        />
        <Row gutter={16}>
          <Col className="gutter-row" span={24}>
            <TableGrid
              trigger={trigger}
              model={"feature"}
              onClickEdit={onClickEdit}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default TestimonialDetails;
