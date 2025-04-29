import React from 'react';
import { Carousel } from 'react-bootstrap';
import './HomeCarousel.css'; // Optional: Add your custom CSS for styling if needed

const HomeCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/p1.jpg" // Image located in the public folder
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First Slide</h3>
          <p>Description for first slide.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/p2.jpg" // Image located in the public folder
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second Slide</h3>
          <p>Description for second slide.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/p3.jpg" // Image located in the public folder
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third Slide</h3>
          <p>Description for third slide.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/p4.jpg" // Image located in the public folder
          alt="Fourth slide"
        />
        <Carousel.Caption>
          <h3>Fourth Slide</h3>
          <p>Description for fourth slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeCarousel;
