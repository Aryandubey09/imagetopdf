import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./Footer.css"; // custom CSS for dark theme

const Footer = () => {
  return (
    <MDBFooter className="footer-container text-light py-4">
      {/* Social links */}
      <section className="d-flex justify-content-center justify-content-lg-between py-2 border-bottom border-secondary">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          {["facebook-f", "twitter", "google", "instagram", "linkedin", "github"].map(
            (icon, idx) => (
              <a
                href="#"
                className="me-3 text-reset footer-icon"
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MDBIcon fab icon={icon} />
              </a>
            )
          )}
        </div>
      </section>

      {/* Links & Info + Feedback form */}
      <section className="mt-3">
        <MDBContainer className="text-center text-md-start">
          <MDBRow className="mt-3">
            {/* Company info */}
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-3">
              <h6 className="text-uppercase fw-bold mb-3">
                <MDBIcon icon="gem" className="me-2" />
                MargDarshak
              </h6>
              <p>
                Delivering quality services and experiences. We guide users with clarity and trust.
              </p>
            </MDBCol>

            {/* Products */}
            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-3">
              <h6 className="text-uppercase fw-bold mb-3">Products</h6>
              {["Angular", "React", "Vue", "Laravel"].map((prod, i) => (
                <p key={i}>
                  <a href="#!" className="text-reset footer-link">
                    {prod}
                  </a>
                </p>
              ))}
            </MDBCol>

            {/* Useful links */}
            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-3">
              <h6 className="text-uppercase fw-bold mb-3">Useful Links</h6>
              {["Pricing", "Settings", "Orders", "Help"].map((link, i) => (
                <p key={i}>
                  <a href="#!" className="text-reset footer-link">
                    {link}
                  </a>
                </p>
              ))}
            </MDBCol>

            {/* Contact + Feedback */}
            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-3">
              <h6 className="text-uppercase fw-bold mb-3">Contact / Feedback</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-2" />
                info@margdarshak.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-2" />
                +01 234 567 88
              </p>

              {/* Simple feedback form */}
              <form className="mt-2">
                <MDBInput
                  contrast
                  label="Your Email"
                  type="email"
                  className="mb-2"
                  size="sm"
                />
                <MDBInput
                  contrast
                  label="Message"
                  textarea
                  rows={2}
                  className="mb-2"
                  size="sm"
                />
                <MDBBtn color="primary" size="sm">
                  Send
                </MDBBtn>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className="text-center pt-3 border-top border-secondary">
        © 2025 Copyright:
        <a className="text-reset fw-bold ms-1" href="#">
          MargDarshak.com
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
