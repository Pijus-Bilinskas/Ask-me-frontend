import React from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { links } from "../../constants/link";
import LoginForm from "../../components/LoginForm/LoginForm";
import Link from "next/link";
import styles from "./login.module.css";

const Index = () => {
    return(
        <div>
            <div className={styles.contWrapper}>
            <PageTemplate>
            <LoginForm />
            <div className={styles.linkWrapper}>
            <p>Dont have an account:
            <Link href={"/register"} className={styles.link}> Sign up</Link>
            </p>
            </div>
            </PageTemplate>
            </div>
        </div>
    );
};

export default Index;