import React from "react";

function ProfilePicture({ picture, alt, event, styles }) {
 return <img src={picture} alt={alt} className={styles} onClick={event} />;
}

export default ProfilePicture;
