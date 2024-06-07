import React from 'react'
import {Button, Card, Col, Row, Space} from "antd";
import { Typography } from 'antd';
const { Title } = Typography;

const Home = () => {


  return (
   <>

       <Card bordered={false}>
           <Space wrap>
               <Title level={2}>Welcome</Title>
           </Space>
       </Card>

   </>
  )
};

export default Home
