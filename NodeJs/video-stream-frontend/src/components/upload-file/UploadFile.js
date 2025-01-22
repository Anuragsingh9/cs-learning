import React, { useEffect, useState, useRef } from "react";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import SweetAlertComponent from '../../components/alert-popup/alert';

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const [description, setDescripiton] = useState(null);
    const [title, setTitle] = useState(null);
    const fileInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
    const titleInputRef = useRef(null);
    const [alertData, setAlertData] = useState({ title: "Success", text: "Successfully Done", icon: "success" });
    const [isLoading,setIsLoading] = useState(false); 

    const [showAlert, setShowAlert] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescripiton(e.target.value);
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    useEffect(() => {
        console.log(process.env.REACT_APP_API_URL);
    }, [showAlert]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);
        formData.append('title', title);
        console.log(formData);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/upload-file`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                fileInputRef.current.value = '';
                descriptionInputRef.current.value = '';
                titleInputRef.current.value = '';
                console.log('File uploaded successfully:', result);
                setAlertData({ title: "Success", text: "File uploaded successfully", icon: "success" })
                setShowAlert(true);
                setIsLoading(false);
            } else {
                setAlertData({ title: "Oops...", text: "Something went wrong!", icon: "error" })
                setShowAlert(true);
                console.error('File upload failed:', response.statusText);
            }
        } catch (error) {
            setAlertData({ title: "Oops...", text: "Something went wrong!", icon: "error" })
            setShowAlert(true);
            console.error('Error uploading file:', error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                {showAlert &&
                    <SweetAlertComponent
                        showAlert={showAlert}
                        title={alertData.title}
                        text={alertData.text}
                        icon={alertData.icon}
                        onConfirm={() => setShowAlert(false)} // Optional: action on confirm
                    />}
                <Col md={6}>
                    <h2 className="text-center">Upload File</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicFile">
                            <Form.Label>Select File</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                accept="video/*"
                            />
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={handleTitleChange}
                                ref={titleInputRef}
                                placeholder="Add title here"
                            />
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={handleDescriptionChange}
                                ref={descriptionInputRef}
                                placeholder="Add description here"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            {isLoading ? 'Uploading...' : 'Submit'}
                            {/* Submit */}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default UploadFile;
