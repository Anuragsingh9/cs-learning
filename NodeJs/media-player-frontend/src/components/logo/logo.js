import React from "react";
import logo from '../../../src/media/youtube_logo_icon.png'
const Logo = ({ width, height, className }) => {
    return (
        <img
            src={logo}
            alt="Logo"
            className={`img-fluid ${className}`}
            style={{ width: width || 'auto', height: height || 'auto' }}
            // style={{ width: '100px', height: 'auto' }}
        />
    );
}

export default Logo;