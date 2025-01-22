import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './video-box.css';
import playIcon1 from '../../media/play-icon-1.png';
import playIcon2 from '../../media/play-icon-2.png';
import pauseIcon1 from '../../media/pause-icon-1.png';
import VideoPlayer from '../video-player/video-player';

const VideoGrid = () => {
    const [videoList, setVideoList] = useState([]);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState([]);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const videoRefs = useRef([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/videos`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((json) => {
                setVideoList(json.data);
                setIsPlaying(new Array(json.data.length).fill(false));
            })
            .catch(error => {
                setError(error.message);
            });
    }, [isModelOpen]);

    const handlePlayClick = (index, video) => {
        videoRefs.current[index].play();
        updatePlayState(index, true);
        setIsModelOpen(true);
        setCurrentVideo(video);
    };

    const handlePauseClick = (index, video) => {
        videoRefs.current[index].pause();
        updatePlayState(index, false);
        setIsModelOpen(false);
        setCurrentVideo(video);
    };

    const updatePlayState = (index, playing) => {
        setIsPlaying(prevState => prevState.map((state, i) => (i === index ? playing : state)));
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    const ellipsisText = (text) => {
        if (text) {
            const truncatedText = text.length > 30 ? text.substring(0, 40) + "..." : text;
            return truncatedText;
        }
    };

    return (
        <Container>
            {isModelOpen &&
                <VideoPlayer isModelOpen={isModelOpen} video={currentVideo} ></VideoPlayer>
            }
            <Row className='my-4'>
                {videoList && videoList.map((video, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="video-box">
                        <video
                            ref={(el) => (videoRefs.current[index] = el)}
                            width="100%" controls>
                            <source src={`http://localhost:8000/api/video/${video.filename}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className='bottom-row'>
                            {isPlaying[index] ? (
                                <img
                                    src={pauseIcon1}
                                    alt='Pause'
                                    onClick={() => handlePauseClick(index, video.filename)}
                                    style={{ cursor: 'pointer', width: "30px" }} />
                            ) : (
                                <img
                                    src={playIcon1}
                                    alt='Play'
                                    onClick={() => handlePlayClick(index, video)}
                                    style={{ cursor: 'pointer' }} />
                            )}
                            <span className='ellipsis-text'>{ellipsisText(video.description)}</span>
                        </div>
                        {/* {isModelOpen &&
                            <VideoPlayer isModelOpen={isModelOpen} videoFilename={video.filename}></VideoPlayer>
                        } */}
                    </Col>
                ))}
            </Row>
        </Container>

    );
};

export default VideoGrid;
