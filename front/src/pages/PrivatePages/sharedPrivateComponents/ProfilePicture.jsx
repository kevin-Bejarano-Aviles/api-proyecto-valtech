/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
// eslint-disable-next-line react/prop-types
function ProfilePicture({ picture, alt, event, styles }) {
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  return <img src={picture} alt={alt} className={styles} onClick={event} />;
}

export default ProfilePicture;
