import React from "react";
import Header from "../../components/Header/Header";
import { links } from "../../constants/link";
import LoginForm from "../../components/LoginForm/LoginForm";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

const Index = () => {
    return(
        <div>
            <Header logo={"Ask me"} links={links} />
            <LoginForm />
            <div className={styles.linkWrapper}>
            <Link href={"/register"}>Register</Link>
            </div>
        </div>
    );
};

export default Index;