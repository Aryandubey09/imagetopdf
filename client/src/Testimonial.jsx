import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
// custom CSS

const Testimonial = () => {
  return (
    <MDBContainer className="py-5 testimonial-container">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" xl="8" className="text-center">
          <h3 className="mb-4 text-light">Testimonials</h3>
          <p className="mb-4 pb-2 mb-md-5 pb-md-0 text-light">
            Hear from our users about their experience. Quality, reliability, and
            excellence are our priorities.
          </p>
        </MDBCol>
      </MDBRow>

      <MDBRow className="text-center">
        {[
          {
            img: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp",
            name: "Maria Smantha",
            role: "Web Developer",
            quote:
              "this website is really awesom , it helped me a lot in my work .",
            stars: 4.5,
          },
          {
            img: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp",
            name: "Lisa Cudrow",
            role: "Graphic Designer",
            quote:
              "I am very satisfied with the service. The user interface is intuitive and easy to navigate.",
            stars: 5,
          },
          {
            img: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp",
            name: "John Smith",
            role: "Marketing Specialist",
            quote:
              "A reliable and efficient solution for converting images to PDFs. Highly recommended!",
            stars: 4,
          },
        ].map((item, idx) => (
          <MDBCol md="4" className="mb-5 mb-md-0" key={idx}>
            <div className="d-flex justify-content-center mb-4">
              <img
                src={item.img}
                className="rounded-circle shadow-1-strong"
                width="150"
                height="150"
                alt={item.name}
              />
            </div>
            <h5 className="mb-3 text-light">{item.name}</h5>
            <h6 className="text-primary mb-3">{item.role}</h6>
            <p className="px-xl-3 text-light">
              <MDBIcon fas icon="quote-left" className="pe-2" />
              {item.quote}
            </p>
            <MDBTypography
              listUnStyled
              className="d-flex justify-content-center mb-0"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i}>
                  <MDBIcon
                    fas
                    icon={i < Math.floor(item.stars) ? "star" : "star-half-alt"}
                    size="sm"
                    className="text-warning"
                  />
                </li>
              ))}
            </MDBTypography>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};

export default Testimonial;
