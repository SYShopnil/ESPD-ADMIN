import React, { useState } from 'react'
import { Button, Card, Col, Divider, Form, Input, InputNumber, Row, Space } from "antd";
import { Typography } from 'antd';
const { Title } = Typography;
const { TextArea } = Input;

 const onFinish=(values:any)=>{
    console.log( console.log('Success:', values));
 }

const Customers = () => {

    return (
        <>

      <Card bordered={false}>
                <Space wrap style={{ display:"flex", justifyContent:"space-between" }} >
                    <Title level={2}>Add Customer</Title>
                    <Space style={{paddingRight:"65px"}}>
                    <Button type="primary">Primary Button</Button> 
                    <Button type="primary">Primary Button</Button> 
                    </Space>
                    
                </Space>
                <Divider></Divider>
                <Form labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    size='large'
                    onFinish={onFinish}
                >

                    <Row justify={"space-between"}>
                        <Col span={12}>  <Form.Item
                            label="Manufacturer Name"
                            name="menufacturer_name"
                            rules={[{ required: true, message: 'Please enter menufacturer name' }]}
                        >
                            <Input placeholder="Manufacturer Name" />
                        </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Mobile no"
                                name="mobile_no"
                                rules={[{  message: 'Please enter mobile no' }]}
                            >
                                <Input placeholder='Mobile no' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Email Address 1"
                                name="email_address1"
                                rules={[{  type: 'email' ,message: 'Please enter email your email eddress' }]}
                            >
                                <Input placeholder='Email address 1' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Email address 2"
                                name="email_address2"
                                rules={[{ type: 'email',  message: 'Please enter you email address' }]}
                            >
                                <Input placeholder='Email address 2' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{  message: 'Please input your phone number' }]}
                            >
                                <Input placeholder='Phone' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Contact"
                                name="contact"
                                rules={[{  message: 'Please input your contact' }]}
                            >
                                <Input placeholder='Contact' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Address 1"
                                name="address1"
                                rules={[{  message: 'Please input your address' }]}
                            >
                                <TextArea rows={3} placeholder='Address ' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Address 2"
                                name="address2"
                                rules={[{  message: 'Please input your address' }]}
                            >
                                <TextArea rows={3} placeholder='Address' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Fax"
                                name="username"
                                rules={[{ required: true, message: 'Please input your fax' }]}
                            >
                                <Input placeholder='Fax' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="City"
                                name="city"
                                rules={[{ required: true, message: 'Please input your City' }]}
                            >
                                <Input placeholder='City' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="State"
                                name="state"
                                rules={[{ required: true, message: 'Please input your State' }]}
                            >
                                <Input placeholder='State' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Zip"
                                name="zip"
                                rules={[{ required: true, message: 'Please input your ZIP' }]}
                            >
                                <Input placeholder='Zip' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Country"
                                name="country"
                                rules={[{ required: true, message: 'Please input your country' }]}
                            >
                                <Input placeholder='Country' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                               style={{}}
                                label="Previous Balance"
                                name="balance"
                                rules={[{ required: true, type: 'number' ,message:'Please enter your Previous Balance'}]}
                            >
                                <InputNumber placeholder='Previous balance' style={{width:"100%"}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* <Form.Item> */}
                    <div style={{ textAlign: 'right', paddingRight: '65px' }}>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </div>
                    {/* </Form.Item> */}
                    

                </Form>

            </Card>

        </>
    )
};

export default Customers
