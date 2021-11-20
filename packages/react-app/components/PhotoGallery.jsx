import React from "react";
import Gallery from "react-photo-gallery";

const PhotoGallery = props => {
  const passData = event => {
    props.onPhotoClick(event.target);
  };
  return <Gallery photos={props.photos} onClick={passData} />;
};

export default PhotoGallery;
