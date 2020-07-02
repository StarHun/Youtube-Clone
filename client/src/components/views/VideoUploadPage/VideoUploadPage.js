import React ,{useState} from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from 'react-redux' ;

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    {value: 0, label: "Priavte"},
    {value: 1, label: "Public"}
]
const CategoryOptions = [
    { value: 0, label: "Film& Animation"},
    { value: 1, label: "Autos & Vehicles"},
    { value: 2, label: "Music"},
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
]

function VideoUploadPage(props) {
    const user = useSelector(state => state.user)
    const [Videotitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Flim&Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")


    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append("file", files[0])

        axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {

                    let variable = {
                        url:response.data.filePath,
                        fileName: response.data.fileName
                    }
                    setFilePath(response.data.filePath)

                    axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if(response.data.success) {

                                setDuration(response.data.fileDuration)
                                setThumbnailPath(response.data.filePath)

                            } else {
                                alert('failed to create thumbnail')
                                }
                    })


                } else {
                    alert('failed to save the video in server')
                }
            })

    }

    const onSumit = (e) => {
        e.preventDefault();
        console.log(FilePath);

        const variables = {
            writer: user.userData._id,
            title: Videotitle,
            description: Description,
            privacy: Private,
            filepath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath
        }
        axios.post('/api/video/uploadVideo', variables)
            .then(response => {
                if(response.data.success){
                    
                    message.success('upload success.');

                    setTimeout(() => {
                        props.history.push('/')
                    }, 3000);


                } else {
                    alert('failed to upload')
                }
            })
    }


    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
            <div style={{ textAlign:'Center', marginBlock:'2rem' }}>
                <Title level={2}> Upload Video </Title>
            </div>
            
            <Form   onSubmit={onSumit}>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                    {/* Drop zone */}

                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={10000000000}
                    >
                        {({ getRootProps, getInputProps}) => (
                        <div style={{ width: '300px', height: '240px', border:'1px solid lightgray', display: 'flex',
                        alignItems:'center', justifyContent: 'center'}} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize:'3rem'}} />
                        </div>
                    )}
                    </Dropzone>
                {ThumbnailPath &&
                    <div>
                        <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />                    
                    </div>
                }

                </div>

            
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={Videotitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br />
                <br />

                <select onChange={onPrivateChange}>

                            {PrivateOptions.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))}
                </select>

                <br />
                <br />
                <select onChange={onCategoryChange}>

                            {CategoryOptions.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))}
                </select>

                <br />
                <br />
                <Button type="primary"  size="large" onClick={onSumit}>
                   Submit
                </Button>

            </Form>

        </div>
    )
}

export default VideoUploadPage
