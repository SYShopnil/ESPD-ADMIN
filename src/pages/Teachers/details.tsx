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
  Col,
  Image,
  Modal
} from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { get, patch, post } from '~/services/api/api';
import { API_CRUD, RESET_TEACHER_PASSWORD, UPDATE_PASSWORD } from '~/services/api/endpoints';
import { SERVER_URL } from '~/configs';
import { EditOutlined, ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import DrawerForm from "./_DrawerForm";
import DrawerFormSubjectOfferd from "~/components/teacher/subject_offerd/_DrawerForm";
import SubjectOfferdTableGrid from '~/components/teacher/subject_offerd/_TableGrid';
import DrawerFormExamBoard from "~/components/teacher/exam_board/_DrawerForm";
import ExamBoardTableGrid from '~/components/teacher/exam_board/_TableGrid';

import DrawerFormQualifications from "~/components/teacher/qualifications/_DrawerForm";
import QualificationsTableGrid from '~/components/teacher/qualifications/_TableGrid';


import DrawerFormReview from "~/components/teacher/review/_DrawerForm";
import ReviewTableGrid from '~/components/teacher/review/_TableGrid';
const { confirm } = Modal;


const TeacherDetails = () => {
  const drawerTitle = 'Update Teacher';

  const model = 'Teacher';
  const [open, setOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const [openSubjectOffer, setOpenSubjectOffer] = useState(false);
  const [editedItemSubjectOffer, setEditedItemSubjectOffer] = useState(null);
  const [isEditingSubjectOffer, setIsEditingSubjectOffer] = useState(false);
  const [triggerSubjectOffer, setTriggerSubjectOffer] = useState(0);

  const [openExamBoard, setOpenExamBoard] = useState(false);
  const [editedItemExamBoard, setEditedItemExamBoard] = useState(null);
  const [isEditingExamBoard, setIsEditingExamBoard] = useState(false);
  const [triggerExamBoard, setTriggerExamBoard] = useState(0);

  const [openQualifications, setOpenQualifications] = useState(false);
  const [editedItemQualifications, setEditedItemQualifications] = useState(null);
  const [isEditingQualifications, setIsEditingQualifications] = useState(false);
  const [triggerQualifications, setTriggerQualifications] = useState(0);


  const [openReview, setOpenReview] = useState(false);
  const [editedItemReview, setEditedItemReview] = useState(null);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [triggerReview, setTriggerReview] = useState(0);

  const BASE_URL = '/teachers';
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
    queryKey: [`teacher-details-${id}`],
    queryFn: () => get(`${API_CRUD}/${id}?model=Teacher`),
  });


  



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
    // refetch()
  };

  const onSubmitSuccess = (isEditing: boolean) => {
    setTrigger(trigger => trigger + 1)
    if (isEditing) {
      setOpen(false);
      setIsEditing(false);
      setEditedItem(null);
      refetch()
    } else {
      setOpen(false);
      setIsEditing(false);
      setEditedItem(null);
      refetch()
    }
  }





  const onClickEditForSubjectOffer = (record: any) => {
    setIsEditingSubjectOffer(true);
    setEditedItemSubjectOffer(record);
    setOpenSubjectOffer(true);
  }


  const showDrawerForSubjectOffer = () => {
    setOpenSubjectOffer(true);
    setIsEditingSubjectOffer(false);
    setEditedItemSubjectOffer(null);
  };

  const onCloseFroSubjectOffer = () => {
    setOpenSubjectOffer(false);
  };

  const onSubmitSuccessForSubjectOffer = (isEditingSubjectOffer: boolean) => {
    setTriggerSubjectOffer(triggerSubjectOffer => triggerSubjectOffer + 1)
    if (isEditingSubjectOffer) {
      setOpenSubjectOffer(false);
      setIsEditingSubjectOffer(false);
      setEditedItemSubjectOffer(null);
    } else {
      setOpenSubjectOffer(false);
      setIsEditingSubjectOffer(false);
      setEditedItemSubjectOffer(null);
    }
  }






  const onClickEditForExamBoard = (record: any) => {
    setIsEditingExamBoard(true);
    setEditedItemExamBoard(record);
    setOpenExamBoard(true);
  }


  const showDrawerForExamBoard = () => {
    setOpenExamBoard(true);
    setIsEditingExamBoard(false);
    setEditedItemExamBoard(null);
  };

  const onCloseForExamBoard = () => {
    setOpenExamBoard(false);
  };

  const onSubmitSuccessForExamBoard = (isEditingExamBoard: boolean) => {
    setTriggerExamBoard(triggerExamBoard => triggerExamBoard + 1)
    if (isEditingExamBoard) {
      setOpenExamBoard(false);
      setIsEditingExamBoard(false);
      setEditedItemExamBoard(null);
    } else {
      setOpenExamBoard(false);
      setIsEditingExamBoard(false);
      setEditedItemExamBoard(null);
    }
  }




  const onClickEditForQualifications = (record: any) => {
    setIsEditingQualifications(true);
    setEditedItemQualifications(record);
    setOpenQualifications(true);
  }


  const showDrawerForQualifications = () => {
    setOpenQualifications(true);
    setIsEditingQualifications(false);
    setEditedItemQualifications(null);
  };

  const onCloseForQualifications = () => {
    setOpenQualifications(false);
  };

  const onSubmitSuccessForQualifications = (isEditingQualifications: boolean) => {
    setTriggerQualifications(triggerQualifications => triggerQualifications + 1)
    if (isEditingQualifications) {
      setOpenQualifications(false);
      setIsEditingQualifications(false);
      setEditedItemQualifications(null);
    } else {
      setOpenQualifications(false);
      setIsEditingQualifications(false);
      setEditedItemQualifications(null);
    }
  }







  const onClickEditForReview = (record: any) => {
    setIsEditingReview(true);
    setEditedItemReview(record);
    setOpenReview(true);
  }


  const showDrawerForReview = () => {
    setOpenReview(true);
    setIsEditingReview(false);
    setEditedItemReview(null);
  };

  const onCloseForReview = () => {
    setOpenReview(false);
  };

  const onSubmitSuccessForReview = (isEditingReview: boolean) => {
    setTriggerReview(triggerReview => triggerReview + 1)
    if (isEditingReview) {
      setOpenReview(false);
      setIsEditingReview(false);
      setEditedItemQualifications(null);
    } else {
      setOpenReview(false);
      setIsEditingReview(false);
      setEditedItemReview(null);
    }
  }


  const resetTeacherPassword = useMutation(async () => await get(`${RESET_TEACHER_PASSWORD}?teacher_id=${id}`), {//TODO refactor
    onSuccess: (response) => {
      message.success('Password Successfully');
    },
    onError: (error) => {
      message.error(' Something went wrong');
    }
  });


  const handleResetPassword = () => {
    resetTeacherPassword.mutate()
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure reset this teacher password?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleResetPassword()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
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
        model={model}
        isEditing={isEditing}
        editedItem={editedItem}
        onSubmitSuccess={onSubmitSuccess}
      />
      <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={2}>Teacher Details</Title>
        <div>
          <Button type="primary" onClick={showDeleteConfirm} danger style={{ marginRight: "10px" }} >Reset Password</Button>
          <Button type="primary" onClick={() => onClickEdit(details?.data)} icon={<EditOutlined />} >Edit</Button>
        </div>
      </Space>
      <Card bordered={true} style={{ width: "100%" }}>
        <Divider>
          <Image height={200} src={details?.data?.profile_photo}></Image>
        </Divider>
        <Descriptions>
          <Descriptions.Item label="First Name">{details?.data?.first_name}</Descriptions.Item>
          <Descriptions.Item label="Last Name">{details?.data?.last_name}</Descriptions.Item>
          <Descriptions.Item label="Email">{details?.data?.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{details?.data?.phone}</Descriptions.Item>
          <Descriptions.Item label="Bio">{details?.data?.bio}</Descriptions.Item>
          <Descriptions.Item label="Experience">{details?.data?.experience}</Descriptions.Item>
          <Descriptions.Item label="Price On to One">{details?.data?.price_one_to_one}</Descriptions.Item>
          <Descriptions.Item label="Price Group">{details?.data?.price_group}</Descriptions.Item>
          <Descriptions.Item label="Tution Hours">{details?.data?.tution_hours} hours</Descriptions.Item>
          <Descriptions.Item label="Repeated Student">{details?.data?.repeated_student} </Descriptions.Item>
          <Descriptions.Item label="City">{details?.data?.city}</Descriptions.Item>
          <Descriptions.Item label="Postal Code">{details?.data?.postal_code}</Descriptions.Item>
          <Descriptions.Item label="Country">{details?.data?.country}</Descriptions.Item>

          <Descriptions.Item label="Is Dbs Checked">{details?.data?.is_dbs_checked ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}</Descriptions.Item>
          <Descriptions.Item label="Is Super Tutor">{details?.data?.is_super_tutor ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}</Descriptions.Item>

          <Descriptions.Item label="Address Line 1">
            {details?.data?.address_line_1}
          </Descriptions.Item>

          <Descriptions.Item label="Address Line 2">
            {details?.data?.address_line_2}
          </Descriptions.Item>

          <Descriptions.Item label="Description">
            {details?.data?.description}
          </Descriptions.Item>

        </Descriptions>

      </Card>


      <>
        <DrawerFormSubjectOfferd
          title={drawerTitle}
          onClose={onCloseFroSubjectOffer}
          open={openSubjectOffer}
          isEditing={isEditingSubjectOffer}
          editedItem={editedItemSubjectOffer}
          onSubmitSuccess={onSubmitSuccessForSubjectOffer}
        />
        <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title level={4}>Subject Offerd</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={showDrawerForSubjectOffer}>Add New</Button>
        </Space>
        <Card bordered={true} style={{ width: "100%" }}>
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <SubjectOfferdTableGrid
                trigger={triggerSubjectOffer}
                id
                onClickEdit={onClickEditForSubjectOffer}
              />
            </Col>
          </Row>
        </Card>
      </>



      <>
        <DrawerFormExamBoard
          title={drawerTitle}
          onClose={onCloseForExamBoard}
          open={openExamBoard}
          isEditing={isEditingExamBoard}
          editedItem={editedItemExamBoard}
          onSubmitSuccess={onSubmitSuccessForExamBoard}
        />
        <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title level={4}>Exam Board</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={showDrawerForExamBoard}>Add New</Button>
        </Space>
        <Card bordered={true} style={{ width: "100%" }}>
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <ExamBoardTableGrid
                trigger={triggerExamBoard}
                id
                onClickEdit={onClickEditForExamBoard}
              />
            </Col>
          </Row>
        </Card>
      </>


      <>
        <DrawerFormQualifications
          title={drawerTitle}
          onClose={onCloseForQualifications}
          open={openQualifications}
          isEditing={isEditingQualifications}
          editedItem={editedItemQualifications}
          onSubmitSuccess={onSubmitSuccessForQualifications}
        />
        <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title level={4}>Qualifications</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={showDrawerForQualifications}>Add New</Button>
        </Space>
        <Card bordered={true} style={{ width: "100%" }}>
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <QualificationsTableGrid
                trigger={triggerQualifications}
                id
                onClickEdit={onClickEditForQualifications}
              />
            </Col>
          </Row>
        </Card>
      </>

      <>
        <DrawerFormReview
          title={drawerTitle}
          onClose={onCloseForReview}
          open={openReview}
          isEditing={isEditingReview}
          editedItem={editedItemReview}
          onSubmitSuccess={onSubmitSuccessForReview}
        />
        <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title level={4}>Review</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={showDrawerForReview}>Add New</Button>
        </Space>
        <Card bordered={true} style={{ width: "100%" }}>
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <ReviewTableGrid
                trigger={triggerReview}
                id
                onClickEdit={onClickEditForReview}
              />
            </Col>
          </Row>
        </Card>
      </>


    </>
  );
};

export default TeacherDetails;
