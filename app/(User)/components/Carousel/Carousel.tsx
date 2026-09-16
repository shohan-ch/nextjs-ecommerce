"use client";

import "./carousel.scss";

import React, { useEffect } from "react";

type Image = {
  path: string;
  title: string;
  description?: string;
};

type Props = {
  images: Image[];
};

const Carousel = (props: Props) => {
  const { images } = props;

  const [previewImage, setPreviewImage] = React.useState({
    image: images[0],
    index: 0,
  });

  const [disableBtn, setDisableBtn] = React.useState({
    next: false,
    prev: false,
  });

  const [slideDirection, setSlideDirection] = React.useState<"next" | "prev">(
    "next",
  );

  // ============================
  // NEXT
  // ============================

  const handleNext = () => {
    const lastImageIndex = images.length - 1;

    setSlideDirection("next");

    if (lastImageIndex !== previewImage.index) {
      const currentIndex = previewImage.index;

      setPreviewImage({
        image: images[currentIndex + 1],
        index: currentIndex + 1,
      });
    }

    // Last image -> first image
    if (lastImageIndex === previewImage.index) {
      setPreviewImage({
        image: images[0],
        index: 0,
      });
    }
  };

  // ============================
  // PREVIOUS
  // ============================

  const handlePrevious = () => {
    if (previewImage.index !== 0) {
      setSlideDirection("prev");

      const currentIndex = previewImage.index;

      setPreviewImage({
        image: images[currentIndex - 1],
        index: currentIndex - 1,
      });
    }
  };

  // ============================
  // AUTO SLIDE
  // ============================

  // useEffect(() => {
  //   const id = setTimeout(() => {
  //     handleNext();
  //   }, 8000);

  //   return () => clearTimeout(id);
  // }, [previewImage]);

  // ============================
  // BUTTON DISABLE STATE
  // ============================

  useEffect(() => {
    const lastImageIndex = images.length - 1;

    if (lastImageIndex === previewImage.index) {
      setDisableBtn({
        prev: false,
        next: true,
      });
    } else if (previewImage.index === 0) {
      setDisableBtn({
        next: false,
        prev: true,
      });
    } else {
      setDisableBtn({
        next: false,
        prev: false,
      });
    }
  }, [previewImage, images.length]);

  // ============================
  // CHANGE SLIDE USING DOT
  // ============================

  const handleDotClick = (index: number) => {
    setSlideDirection(index > previewImage.index ? "next" : "prev");

    setPreviewImage({
      image: images[index],
      index,
    });
  };

  // ============================
  // RENDER
  // ============================

  return (
    <div className="carousel-wrapper">
      {/* ========================
          IMAGE
      ======================== */}

      <img
        key={previewImage.index}
        src={previewImage.image.path}
        alt={previewImage.image.title}
        className="carousel-image"
        style={{
          animation:
            slideDirection === "next"
              ? "slideFromRight 0.5s ease-in-out"
              : "slideFromLeft 0.5s ease-in-out",
        }}
      />

      {/* ========================
          LIGHT GRADIENT
      ======================== */}

      <div className="carousel-gradient" />

      {/* ========================
          CONTENT
      ======================== */}

      <div className="carousel-content">
        <h2 className="carousel-title">{previewImage.image.title}</h2>

        {previewImage.image.description && (
          <p className="carousel-description">
            {previewImage.image.description}
          </p>
        )}

        <button className="carousel-shop-button">
          Shop Now
          <span className="carousel-shop-arrow">→</span>
        </button>
      </div>

      {/* ========================
           BUTTONS
      ======================== */}

      {images.length > 1 && (
        <>
          <button
            className="carousel-prev"
            onClick={handlePrevious}
            aria-label="Previous slide"
            color="black"
            style={{
              display: disableBtn.prev ? "none" : "block",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className="carousel-next"
            onClick={handleNext}
            aria-label="Next slide"
            style={{
              display: disableBtn.next ? "none" : "block",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="black"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {/* ========================
          SLIDE DOTS
      ======================== */}

      {images.length > 1 && (
        <div className="carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`carousel-dot ${
                index === previewImage.index ? "active" : ""
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
