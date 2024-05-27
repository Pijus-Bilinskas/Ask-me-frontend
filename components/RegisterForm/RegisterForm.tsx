import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "../Button/Button";


const RegisterForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isError, setError] = useState(false);
    const [isBadData, setBadData] = useState(false);

    const onRegister = async () => {
        const registerBody = {
            name: name,
            email: email,
            password: password,
        };
        
        if(!name || !email || !password) {
            setError(true);
            return;
        };
        

        setError(false);

        try{
            const response = await axios.post(
                `${process.env.SERVER_URL}/register`,
                registerBody
            );

            if(response.status === 200) {
                setBadData(false);
                router.push("/login");
            }

            console.log("response", response)
        } catch (err) {
            setBadData(true);
            console.log("err", err)
        }
    };

    return(
        <div className={styles.form}>
            <input 
            value={name}
            onChange={(e)=> setName(e.target.value)}
            placeholder="username"
            />

            <input 
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            placeholder="email"
            />

            <input
            type="password" 
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="password"
            />

            <Button  onClick={onRegister} className={styles.button} title="Register" />

            {isError && (
                <div className={styles.error}>Please fill all the boxes</div>
            )}

            {isBadData &&(
                <div className={styles.error}>Provided incorrect data</div>
            )}
        </div>
    );
};

export default RegisterForm;