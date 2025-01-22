import React from "react";
import "./description-box.css"; 

const DescriptionBox = (props) => {
    return (
        <>
            <div className="description-box">
                <span>
                    <b>{props.description}</b>
                </span>
            </div>
        </>
    );
}

export default DescriptionBox;