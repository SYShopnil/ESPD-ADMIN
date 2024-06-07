/* eslint-disable */
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Button,
    Col,
    DatePicker,
    DatePickerProps,
    Drawer,
    Form,
    Image,
    Input,
    Popconfirm,
    Row,
    Select,
    Space, Switch,
    Table,
    Tag,
    Typography,
    Upload,
    message
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteApi, get, patch, post } from "~/services/api/api";
import { API_CRUD_FIND_WHERE, API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";
import { getLabelFromName } from "~/utility/form";
import { getHeader } from "~/utility/helmet";
import { getUrlFromUploadComponent } from "~/utility/upload";
const { RangePicker } = DatePicker;

const { Title } = Typography;

const model = 'Booking';
const title = 'Booking';
const KEY = `all-${model}`;

const TableGrid = ({ ...props }) => {

    const [selectDate, setSelectDate] = useState([])
    const [fitlerData, setFilterData] = useState<any>(null)
    const where: any = {}

    const { isLoading, isError, error, data: fetchData, refetch } = useQuery([KEY], () => post(`${API_CRUD_FIND_WHERE}?model=${model}`, {
        where: where,
        include: {
            Student: {
                select: {
                    first_name: true,
                    last_name: true
                }
            },
            Teacher: {
                select: {
                    first_name: true,
                    last_name: true
                }
            },
        }
    }), {
        staleTime: 0, select: (record) => {
            if (selectDate?.length !== 0) {
                console.log("lskdfjsl")
                const data = []
                const selectedDate = selectDate?.map(item => new Date(item).getTime())//0=filterstart-date, 1=filter end date
                // console.log(selectedDate[1])
                // return
                record?.data?.map(item => {
                    const classStartDate = new Date(item?.start_time).getTime()
                    if (selectedDate && selectedDate[0] <= classStartDate && selectedDate[1] >= classStartDate) {
                        const find = data?.find(i => i?.id == item?.id)
                        if (!find) {
                            data?.push(item)
                        }
                    }
                })
                return { data }
            }
            return { data: record?.data }
        }
    });


    const deleteMutation = useMutation(async (id: any) => await deleteApi(getUrlForModel(model, id)), {
        onSuccess: () => {
            message.success('Deleted Successfully');
            refetch()
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const handleDeleteClient = (id: any) => {
        deleteMutation.mutate(id);
    }

    let columns = [
        {
            title: 'Teacher',
            render: (record: any) => {
                return <span>{record?.Teacher?.first_name} {record?.Teacher?.last_name}</span>
            }
        },
        {
            title: 'Student',
            render: (record: any) => {
                return <span>{record?.Student?.first_name} {record?.Student?.last_name}</span>
            }
        },
        {
            title: 'Booking type',
            render: (record: any) => {
                return <span>{record?.booking_type === "One_To_Group" ? "Group" : "One to one"}</span>
            }
        },
        {
            title: 'No of students',
            render: (record: any) => {
                return <span>{record?.no_of_member}</span>
            }
        },
        {
            title: 'Duration',
            render: (record: any) => {
                return <span>{record?.duration}</span>
            }
        },
        {
            title: 'Amount',
            render: (record: any) => {
                return <span>{record?.amount}$</span>
            }
        },
        {
            title: 'Payment status',
            render: (record: any) => {
                return <span>{record?.payment_status}</span>
            }
        },
        {
            title: 'Start at',
            render: (record: any) => {
                return <span>{new Date(record?.start_time).toLocaleString()}</span>
            }
        },
        {
            title: 'Status',
            render: (record: any) => {
                return <span>{record?.status}</span>
            }
        },
    ]
    columns.push({
        title: 'Actions',
        render: (record: any) => {
            return <Space>
                <Popconfirm
                    title="Delete this item?"
                    description="This action cannot be undone"
                    onConfirm={() => handleDeleteClient(record.id)}
                    onCancel={() => { }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger type={'link'}><DeleteOutlined /></Button>
                </Popconfirm>
                <Link to={`/bookings/details/${record?.id}`} >
                    <Button primary>
                        <EyeOutlined />
                    </Button>
                </Link>
            </Space>
        },
    });

    if (isError) {
        return <p>Failed to load data</p>
    }

    const handleClearAll = () => {
        setFilterData(null)
        setSelectDate([])
        refetch()
    }

    useEffect(() => {
        if (fitlerData?.booking_type && fitlerData?.booking_type !== "") {
            where.booking_type = fitlerData?.booking_type
            refetch()
        }
        if (fitlerData?.payment_status && fitlerData?.payment_status !== "") {
            where.payment_status = fitlerData?.payment_status
            refetch()
        }
        if (fitlerData?.status && fitlerData?.status !== "") {
            where.status = fitlerData?.status
            refetch()
        }
        if (fitlerData?.teacher_id && fitlerData?.teacher_id !== "") {
            where.teacher_id = fitlerData?.teacher_id
            refetch()
        }
    }, [fitlerData])

    return (
        <>
            <Filtering
                refetch={refetch}
                selectDate={selectDate}
                setSelectDate={setSelectDate}
                setFilterData={setFilterData}
                fitlerData={fitlerData}
                handleClearAll={handleClearAll}
            />
            <Table
                rowKey="id"
                loading={isLoading}
                columns={columns}
                dataSource={fetchData?.data} />
        </>
    );
}

const Filtering = ({ setSelectDate, setFilterData, fitlerData, handleClearAll, selectDate, refetch }) => {
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setSelectDate(dateString)
        refetch()
    };

    const { isLoading, isError, error, data: teachersList, refetch: refetchTeachers } = useQuery(["Teachers list", model], () => post(`${API_CRUD_FIND_WHERE}?model=${"Teacher"}`, {
        select: {
            first_name: true,
            last_name: true
        },
    }), {
        staleTime: 0,
    });


    useEffect(() => {
        if (selectDate[0] == '' && selectDate[1] == '') {
            setSelectDate([])
        }
    }, [selectDate])

    return (
        <Row style={{ width: "100%", margin: "10px 0", padding: "15px", borderRadius: "8px", backgroundColor: "#fff" }}>
            <Col span={6} style={{ padding: "5px" }}>
                <Select
                    value={fitlerData?.teacher_id}
                    style={{ width: '100%' }}
                    allowClear
                    options={
                        teachersList?.data?.map(item => {
                            return { value: item?.id, label: `${item?.first_name} ${item?.last_name}` }
                        })
                    }
                    placeholder="Select a teacher"
                    onChange={(value) => {
                        setFilterData({ ...fitlerData, teacher_id: value })
                        refetch()
                    }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label?.toString()?.toLowerCase() ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                />
            </Col>
            <Col span={6} style={{ padding: "5px" }}>
                <Select
                    value={fitlerData?.booking_type}
                    style={{ width: '100%' }}
                    allowClear
                    options={[{ value: 'One_To_One', label: 'One to one' }, { value: 'One_To_Group', label: 'Group' }]}
                    placeholder="Select booking type"
                    onChange={(value) => {
                        setFilterData({ ...fitlerData, booking_type: value })
                        refetch()
                    }}
                />
            </Col>

            <Col span={6} style={{ padding: "5px" }} >
                <Select
                    style={{ width: '100%' }}
                    value={fitlerData?.payment_status}
                    allowClear
                    options={[{ value: 'PAID', label: 'Paid' }, { value: 'UNPAID', label: 'Unpaid' }]}
                    placeholder="Select payment status"
                    onChange={(value) => {
                        setFilterData({ ...fitlerData, payment_status: value });
                        refetch()
                    }}
                />
            </Col>
            <Col span={6} style={{ padding: "5px" }}>
                <Select
                    value={fitlerData?.status}
                    style={{ width: '100%' }}
                    allowClear
                    options={[
                        { value: 'PAYMENT_PENDING', label: 'Pending' },
                        { value: 'CANCEL', label: 'Cancel' },
                        { value: 'COMPLETE', label: 'Complete' },
                        { value: 'UPCOMING', label: 'Upcoming' }
                    ]}
                    placeholder="Select status"
                    onChange={(value) => {
                        setFilterData({ ...fitlerData, status: value })
                        refetch()
                    }}
                />
            </Col>
            <Col span={6} style={{ display: "flex", padding: "5px" }} >
                <RangePicker
                    style={{ width: '100%', }}
                    onChange={onChange}
                    value={selectDate?.length == 0 ? [] : selectDate?.map(item => dayjs(item, "MM-DD-YYYY"))}
                    format={"MM-DD-YYYY"}
                />
            </Col>
            <Col span={12}>
            </Col>
            <Col span={6} style={{ display: "flex", justifyContent: "end", alignItems: 'start' }}>
                <Button type="primary" onClick={handleClearAll}>
                    Clear all
                </Button>
            </Col>

        </Row >
    )
}

const Booking = () => {

    return (
        <>

            {getHeader(title)}
            <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                    <TableGrid
                    />
                </Col>
            </Row>

        </>
    )
};

export default Booking
