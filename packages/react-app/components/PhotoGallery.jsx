import React from "react";
import Gallery from "react-photo-gallery";

const PhotoGallery = props => {
  const onPhotoClick = event => {
    console.log(event.target.src);
  };
  return <Gallery photos={props.photos} onClick={onPhotoClick} />;
};

export default PhotoGallery;
