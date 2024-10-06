import React, { useState, useRef } from 'react';
import img from '../../assets/original-5fcdc62f8266e353ea97ca56731ad804.png';
import Styles from "./ContactForm.module.css";
import emailjs from '@emailjs/browser';
import { toastify } from "../Toast/Toast.jsx";
import Neptune from "../3D_Models/SpritOpp.jsx";

function ContactForm() {

  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isFullScreen, setIsFullScreen] = useState(false);
  const iframeRef = useRef(null);

  const sendEmail = () => {
    const { VITE_SERVICE_ID, VITE_TEMPLATE_ID, VITE_PUBLIC_KEY } = import.meta.env;

    emailjs
      .send(VITE_SERVICE_ID, VITE_TEMPLATE_ID, contactInfo, {
        publicKey: VITE_PUBLIC_KEY,
      })
      .then(
        () => {
          setContactInfo({
            name: "",
            email: "",
            message: ""
          });
          toastify("Mail sent", true);
        },
        (error) => {
          toastify('Error', false);
        },
      );
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (contactInfo.name === "" || contactInfo.email === "" || contactInfo.message === "") {
      toastify("fill all required fields", false);
      return;
    }

    if (!contactInfo.email.match(
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    )) {
      toastify("Invalid email", false);
      return;
    }

    if (!(contactInfo.message.split(" ").length >= 5)) {
      toastify("Message should contain at least 5 words", false);
      return;
    }
    sendEmail();
  }

  function handleChange(e) {
    setContactInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    const iframe = iframeRef.current;
    if (!document.fullscreenElement) {
      iframe.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen().catch(err => console.error(err));
    }
  };

  return (
    <>
      <h1 align="center" className={Styles["section_title"]} id="contact">Explore The JWST</h1>
      <div className={Styles["contact-form"]}>
        <div className={Styles["left"]}>
          <Neptune />
        </div>
        <div className={Styles["right"]}>
          <div ref={iframeRef} className={Styles["iframe-container"]}>
            <iframe 
              src="https://eyes.nasa.gov/apps/solar-system/#/sc_jwst?interactPrompt=true" 
              allowFullScreen 
              className={isFullScreen ? Styles["iframe-fullscreen"] : Styles["iframe"]}
            />
            <button onClick={toggleFullScreen} className={Styles["fullscreen-btn"]}>
              {isFullScreen ? "Exit Full Screen" : "Full Screen"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
