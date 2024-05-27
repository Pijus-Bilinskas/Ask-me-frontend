import React from "react";
import Header from "../../components/Header/Header";
import { links } from "../../constants/link";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import styles from "./register.module.css"

const Index = () => {
    return(
        <div>
            <Header logo={"Ask me"} links={links} />
            <div className={styles.wrapper}>
            <RegisterForm />
            </div>
        </div>
    );
};

export default Index;