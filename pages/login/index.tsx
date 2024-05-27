import React from "react";
import Header from "../../components/Header/Header";
import { links } from "../../constants/link";
import LoginForm from "../../components/LoginForm/LoginForm";
import Link from "next/link";
import styles from "./login.module.css";

const Index = () => {
    return(
        <div>
            <div className={styles.contWrapper}>
            <Header WebTitle={"Ask me"} links={links} />
            <LoginForm />
            <div className={styles.linkWrapper}>
            <p>Dont have an account:
            <Link href={"/register"} className={styles.link}> Sign up</Link>
            </p>
            </div>
            </div>
        </div>
    );
};

export default Index;