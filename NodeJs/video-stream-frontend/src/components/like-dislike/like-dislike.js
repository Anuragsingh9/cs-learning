import React, { useEffect, useState } from "react";
import LikeIcon from "../../media/like-icon.png";
import DislikeIcon from "../../media/dislike-icon.png";
import Icon from "../icon/icon";

const LikeDislikeTemplate = (props) => {
    const { like_count, dislike_count, id } = props.videoData;
    const [likesCount, setLikesCount] = useState(like_count);
    const [dislikesCount, setDislikesCount] = useState(dislike_count);

    useEffect(() => {

    }, [likesCount,dislikesCount])

    const addLikeHandler = async () => {
        const updatedLikesCount = likesCount + 1;
        const formData = new FormData();
        formData.append("count", updatedLikesCount);
        formData.append("type", 'like');
        formData.append("video_id", id);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/add-like-dislike`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setLikesCount(Number(result.data));
                console.log('Like added successfully:', result);
            }
        } catch (error) {
            console.log('Error in updating Video like');
        }
    }

    const addDislikeHandler = async () => {
        const updatedDislikesCount = dislikesCount + 1;
        const formData = new FormData();
        formData.append("count", updatedDislikesCount);
        formData.append("type", 'dislike');
        formData.append("video_id", id);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/add-like-dislike`, {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                setDislikesCount(Number(result.data));
                console.log('Dislike added successfully:', result);
            }
        } catch (error) {
            console.log('Error in updating Video dislike');
        }
    }

    return (
        <>
            <div className="inline-block-div cursor-pointer">
                <Icon width="40px" height="auto" className={""} iconImg={LikeIcon} onClick={addLikeHandler} />
                <span>{likesCount}</span>
            </div>
            <div className="inline-block-div cursor-pointer">
                <Icon width="40px" height="auto" className={""} iconImg={DislikeIcon} onClick={addDislikeHandler} />
                <span>{dislikesCount}</span>
            </div>
        </>
    );
}

export default LikeDislikeTemplate;
