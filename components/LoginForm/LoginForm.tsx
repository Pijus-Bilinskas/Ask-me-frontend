import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import Cookies from "js-cookie";


const LoginForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setError] = useState(false);
    const [isBadData, setBadData] = useState(false);

    const onLogin = async () => {
        const loginBody = {
            email: email,
            password: password,
        };

        if(!email || !password) {
            setError(true);
            return;
        };

        setError(false);

        try{
         const response = await axios.post(
            `${process.env.SERVER_URL}/login`,
            loginBody
         );
         
         if(response.status === 200) {
            setBadData(false);
            Cookies.set("jwt_token", response.data.jwt_token)
            router.push("/");
         }

         console.log("response", response)
        } catch (err) {
            setBadData(true);
            console.log("err", err);
        }
    };

    return (
        <div className={styles.form}>
            <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            />

            <input
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            />

            <Button onClick={onLogin} title="Login" />

            {isError && (
                <div className={styles.error}>Please fill all the boxes</div>
            )}

            {isBadData &&(
                <div className={styles.error}>Provided incorrect data</div>
            )}
        </div>
    );
};

export default LoginForm;