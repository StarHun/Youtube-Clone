import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    const [Video, setVideo] = useState([])

    useEffect(() => {

        axios.get('/api/video/getVideos')
            .then(response => {
                if(response.data.success){
                    console.log(response.data);
                    setVideo(response.data.videos);
                } else {
                    alert("faild to load video");
                }
            })
        
    }, [])

    const renderCards = Video.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));
        console.log(video.duration);

        return <Col    lg={6} md={8} xs={24}>
        <a href={`/video/${video._id}`}>  
           <div style={{ position: 'relative' }}>
                <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" /> 
               <div className="duration">
                    <span>{minutes} : {seconds}</span> 
               </div>
           </div>
        </a> 
       <br />
       <Meta
            avatar={
                     <Avatar src={video.writer.image} />
             }
             title={video.title}
           description=""
       />
        <span>{video.writer.name} </span> <br /> 
         <span style={{ marginLeft: '3rem' }}> {video.views} views</span> - 
       <span>{moment(video.createdAT).format("MMM Do YY")}</span> 
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
