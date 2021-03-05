import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';


const ProfileImageComponent = (props) => {
    const hiddenInput = useRef()
    let [files, setFiles] = useState([])

    const handleClick = () => {
        if(!props.disabled){
            //hiddenInput.current.click()
        }
    }

    return (
        <div>
            <img src="user.png" className="profile-image" onClick={handleClick} style={{ width: 200 }}/>
            {/* <input type="file" id="hiddenInput" ref={hiddenInput} style={{display: 'none'}} value={files} onChange={ (e) => setFiles(e.target.files) }/> */}
        </div>
    );
}

ProfileImageComponent.propTypes = {
    disabled: PropTypes.bool.isRequired,
    getSelectedFile: PropTypes.func,
};

export default ProfileImageComponent