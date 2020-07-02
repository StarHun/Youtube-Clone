import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    const [Picture, setPicture] = useState([])

    useEffect(() => {

        axios.get('/api/picture/getPictures')
            .then(response => {
                if(response.data.success){
                    console.log(response.data);
                    setPicture(response.data.pictures);
                } else {
                    alert("faild to load video");
                }
            })
        
    }, [])

    const renderCards = Picture.map((picture, index) => {

        var minutes = Math.floor(picture.duration / 60);
        var seconds = Math.floor((picture.duration - minutes * 60));
        console.log(picture.duration);

        return <Col    lg={6} md={8} xs={24}>
        <a href={`/picture/post/${picture._id}`}>  
           <div style={{ position: 'relative' }}>
                <img style={{ width: '100%' }} src={`http://localhost:5000/${picture.thumbnail}`} alt="thumbnail" /> 
               <div className="duration">
                    <span>{minutes} : {seconds}</span> 
               </div>
           </div>
        </a> 
       <br />
       <Meta
            avatar={
                     <Avatar src={picture.writer.image} />
             }
             title={picture.title}
           description=""
       />
        <span>{picture.writer.name} </span> <br /> 
         <span style={{ marginLeft: '3rem' }}> {picture.views} views</span> - 
       <span>{moment(picture.createdAT).format("MMM Do YY")}</span> 
   </Col>

    })

    return (
        <div style={{width: '85%', margin: '3rem auto'  }}>
            <Title level={2}> Recommended </Title>
            <hr/>
            <Row gutter={[32, 16]}>

                 {renderCards}



            </Row>
        </div>
    )
}

export default LandingPage
