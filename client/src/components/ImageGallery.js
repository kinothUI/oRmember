import React, { Component } from "react";
import Gallery from "react-grid-gallery";
import { Icon } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

class ImageGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: this.props.images,
      currentImage: 0
    };

    this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ images: nextProps.images });
  }

  deleteImage = () => {
    const { images, currentImage } = this.state;
    const { deleteLogo } = this.props;

    deleteLogo(images[currentImage].src, images[currentImage].uuid);

    if (currentImage > 1 && currentImage === 1) {
      this.setState({ currentImage: currentImage - 1 });
    } else if (currentImage + 1 === images.length) {
      this.setState({ currentImage: currentImage - 1 });
    }
  };

  onCurrentImageChange = index => {
    this.setState({ currentImage: index });
  };

  render() {
    const { images } = this.props;
    return (
      <div>
        <Gallery
          images={images}
          rowHeight={95}
          backdropClosesModal
          currentImageWillChange={this.onCurrentImageChange}
          customControls={[
            <Icon
              key='a'
              name='trash alternate'
              color='red'
              onClick={this.deleteImage}
              size='big'
            />
          ]}
        />
      </div>
    );
  }
}

export default ImageGallery;
