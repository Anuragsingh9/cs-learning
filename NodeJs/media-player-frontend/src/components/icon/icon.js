import React from "react";
const Icon = ({ width, height, className, iconImg, onClick }) => {
    return (
        <img
            src={iconImg}
            alt="Icon"
            className={`img-fluid ${className}`}
            style={{ width: width || 'auto', height: height || 'auto' }}
            // style={{ width: '100px', height: 'auto' }}
            onClick={onClick}
        />
    );
}

export default Icon;