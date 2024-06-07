/* eslint-disable */
import React, { useState } from "react";
import { Button, Col, Row, Space, Typography } from "antd";
import DrawerForm from "./_DrawerForm";
import { PlusOutlined } from "@ant-design/icons";
import TableGrid from "./_TableGrid";
import { getHeader } from "~/utility/helmet";
import DrawerFormRegister from "./_DrawerFormRegister";

const { Title } = Typography;

const model = 'Teacher';
const title = 'Teacher';
const drawerTitle = 'Update Teacher';

const TeacherList = () => {


    const [open, setOpen] = useState(false);
    const [editedItem, setEditedItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [trigger, setTrigger] = useState(0);


    const [openRegister, setOpenRegister] = useState(false);
    const [editedItemRegister, setEditedItemRegister] = useState(null);
    const [isEditingRegister, setIsEditingRegister] = useState(false);
    const [triggerRegister, setTriggerRegister] = useState(0);




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


    const showDrawerRegister = () => {
        setOpenRegister(true);
        setIsEditingRegister(false);
        setEditedItemRegister(null);
    };

    const onCloseRegister = () => {
        setOpenRegister(false);
    };

    const onClickEditRegister = (record: any) => {
        setIsEditingRegister(true);
        setEditedItemRegister(record);
        setOpenRegister(true);
    }

    const onSubmitSuccessRegister = (isEditing: boolean) => {
        setTrigger(trigger => trigger + 1)
        if (isEditing) {
            setOpenRegister(false);
            setIsEditingRegister(false);
            setEditedItemRegister(null);
        } else {
            setOpenRegister(false);
            setIsEditingRegister(false);
            setEditedItemRegister(null);
        }
    }

    return (
        <>
            {getHeader(title)}
            <DrawerForm
                title={drawerTitle}
                onClose={onClose}
                open={open}
                model={model}
                isEditing={isEditing}
                editedItem={editedItem}
                onSubmitSuccess={onSubmitSuccess}
            />
            
            <DrawerFormRegister
                title={drawerTitle}
                onClose={onCloseRegister}
                open={openRegister}
                model={model}
                isEditing={isEditingRegister}
                editedItem={editedItemRegister}
                onSubmitSuccess={onSubmitSuccessRegister}
            />
            
            <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Title level={2}>{title}</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={showDrawerRegister}>Add New</Button>
            </Space>
            <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                    <TableGrid
                        trigger={trigger}
                        model={model}
                        onClickEdit={onClickEdit}
                    />
                </Col>
            </Row>

        </>
    )
};

export default TeacherList
