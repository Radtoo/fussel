import React, { Component } from "react";
import Gallery from "react-photo-gallery";

import { Modal } from 'react-responsive-modal';
import './Gallery.css';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class Album extends Component {

  componentDidMount() {

  }

  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      viewerIsOpen: false
    };
    if(props.photo != null) {
        var index = this.findIndexByName(props.photo)
        this.state = {
          currentImage: index,
          viewerIsOpen: true
        };
        this.openLightbox(null,
          {
            index,
            photo: props.album["photos"][index],
//            previous: props.album["photos"][index - 1] || null,
//            next: props.album["photos"][index + 1] || null,
            updateState: false
          },
        );
    }
  }

  openLightbox = (event, obj) => {
    this.viewChange(this.state.currentImage, obj['index'])

    if(obj['updateState'] !== true) {
      this.setState({
        currentImage: obj['index'],
        viewerIsOpen: true
      })
    }

  };

  closeLightbox = () => {
    this.props.changeAlbum(this.props.album['name'])
    this.setState({
      currentImage: 0,
      viewerIsOpen: false
    })
  };

  viewChange = (oldIndex, newIndex) => {

    console.log("viewChange")

    var wrappers = document.getElementsByClassName("slick-current");
    console.log(wrappers)

    this.props.changePhoto(
        "album",
        this.props.album['name'],
        this.props.album["photos"][newIndex]["name"])
  }

  findIndexByName = (photoName) => {
    var index;
    for (index in this.props.album["photos"]) {
        if (this.props.album["photos"][index]["name"] === photoName) {
            return index
        }
    }
    console.log("didn't find index")
  }


  modalBackdrop = <div class='modal-backdrop'></div>


  carouselContents = (photos) => {
    return this.props.album["photos"].map(x => (
      <div className="image-wrapper">
          <img src={x.src} />
      </div>
      ))
  }
  
  render() {
    return (
      <div className="container" >
        <section className="hero is-small">
          <div className="hero-body">
            <nav className="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li key='albums' onClick={(e) => this.props.changeCollectionType("albums")}>
                  <i className="fas fa-book fa-lg"></i>
                  <a className="title is-4">&nbsp;&nbsp;Albums</a>
                </li>
                <li key='album-name' className="is-active">
                  <a className="title is-4">{this.props.album["name"]}</a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
        <Gallery photos={this.props.album["photos"]} onClick={this.openLightbox} />

        <Modal open={this.state.viewerIsOpen} 
          onClose={this.closeLightbox}
          center={false} 
          classNames={{
            overlay: 'customOverlay',
            modal: 'customModal'
          }}
          >

          <Slider
            dots={false}
              infinite={false}
              speed={200}
              centerMode={false}
              variableWidth={false}
              adaptiveHeight={true}
              lazyLoad='ondemand'
              fade={false}
              easing='ease'
              waitForAnimate={false}
              focusOnSelect={false}
              initialSlide={this.state.currentImage}
              afterChange={(newIndex) => {this.viewChange(this.state.currentImage, newIndex)}}
            >
            {this.carouselContents(this.props.album["photos"])}
          </Slider>
          {/* <Carousel className="carousel"
                showArrows={true} 
                useKeyboardArrows={true}
                dynamicHeight={false}
                showStatus={true}
                showIndicators={false}
                showThumbs={true}
                >
                {this.carouselContents(this.props.album["photos"])}
              </Carousel> */}
        </Modal>
        {/* <ModalGateway>
          {this.state.viewerIsOpen ? (
            <Modal onClose={this.closeLightbox} className="modal" >
              <Carousel className="carousel"
                showArrows={true} 
                useKeyboardArrows={true}
                dynamicHeight={true}
                showStatus={true}
                showIndicators={false}
                showThumbs={false}
                >
                {this.carouselContents(this.props.album["photos"])}
              </Carousel>
            </Modal>
          ) : null}
        </ModalGateway> */}

        {/* 
        <Modal class='modal'
          show={this.state.viewerIsOpen}
          onHide={() => this.closeLightbox}
          renderBackdrop={props => this.modalBackdrop}>
            <div>jldjljlkj</div>
        </Modal> */}
        {/* <ModalGateway>
          {this.state.viewerIsOpen ? (
            <Modal onClose={this.closeLightbox} >
              <Carousel
                currentIndex={this.state.currentImage}
                trackProps={{onViewChange:(index) => this.viewChange(index)}}
                views={this.props.album["photos"].map(x => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway> */}
      </div>
    );
  }
}
