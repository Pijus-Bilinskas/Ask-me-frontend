import React from "react";
import styles from "./Footer.module.css";
import insta from "../../assets/instagram-socials-social-media-icon-svgrepo-com.svg";
import linked from "../../assets/linkedin-socials-social-media-icon-svgrepo-com.svg";
import tumblr from "../../assets/socials-tumblr-icon-svgrepo-com.svg";


const Footer = () => {
    return <footer className={styles.wrapper}>
    <div className={styles.socials}>
        <img src={insta.src} alt="instagram"/>
        <img src={linked.src} alt="linkedIn" />
        <img src={tumblr.src} alt="tumblr" />
    </div>
    <div className={styles.adress}>
        <p>Kedainiai, 18 Lansbergio troba</p>
        <p>Kalabybiskes, EC2A 1AH LT</p>
        <p>©2002 some buis words and AITA</p>
    </div>
    </footer>
};

export default Footer;