import React from "react";
import Gallery from "react-grid-gallery";
import { Icon } from "semantic-ui-react";

const InitialStateLogo = [
  {
    id: 0,
    uuid: "",
    src: "",
    thumbnail: "",
    thumbnailHeight: 0,
    thumbnailWidth: 0,
  },
];

const ImageGallery = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [logo, setLogo] = React.useState(InitialStateLogo);

  React.useEffect(() => {
    setLogo(props.logo);
  }, [props.logo]);

  const handleImageDelete = () => {
    const logoId = logo[currentImageIndex].id;
    const filename = logo[currentImageIndex].src;

    props.deleteLogo(logoId, filename);

    // handles the index when user starts deleting not from first index
    if (currentImageIndex + 1 === logo.length) setCurrentImageIndex(currentImageIndex - 1);
  };

  const prefix = "/public/images/";
  const logos = props.logo.map((logo) => ({
    ...logo,
    src: prefix + logo.src,
    thumbnail: prefix + logo.thumbnail,
  }));

  return (
    <Gallery
      images={logos}
      rowHeight={95}
      backdropClosesModal
      currentImageWillChange={(index) => setCurrentImageIndex(index)}
      customControls={[
        <Icon
          key='a'
          name='trash alternate'
          color='red'
          onClick={handleImageDelete}
          size='big'
          className='cursor'
        />,
      ]}
    />
  );
};

export default ImageGallery;
