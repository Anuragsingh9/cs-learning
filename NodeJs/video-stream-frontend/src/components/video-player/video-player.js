import React, { useEffect } from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './video-player.css';
import { Col, Row } from "react-bootstrap";
import LikeDislikeTemplate from "../like-dislike/like-dislike";
import DescriptionBox from "../description/description-box";
import VideoTitle from "../title/title";
const VideoPlayer = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (isModelOpen) => setShow(isModelOpen);

    useEffect(() => {
        console.log('video',props.video)
        handleShow(props.isModelOpen);
    }, [props]);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title><VideoTitle title={props.video.title}/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <video
                        style={{ width: '100%', height: '600px' }} controls>
                        <source src={props.video.filepath} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <Row className="like-dislike-box">
                        <LikeDislikeTemplate videoData={props.video} />
                    </Row>
                    <Row>
                        <DescriptionBox description={props.video.description}/>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default VideoPlayer;