import React, {useState } from "react";
import { links } from "../../constants/link";
import Button from "@/components/Button/Button";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./AddQuestion.module.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";

const AddQuestion = () => {
    const router = useRouter();

    const [question_text, setQuestionText] = useState("");


    const addQuestion = async () => {
        try{
        
            const headers = {
                authorization: Cookies.get("jwt_token"),
            };

            const response = await axios.post(
                `${process.env.SERVER_URL}/question`,
                {question_text: question_text},
                {
                    headers,
                }
            );
            console.log(response);

            if(response.status === 200) {
                router.push("/")
            }
        } catch (err) {
           // @ts-expect-error this is correct way to catch error
           if(err.response.status === 401) {
            router.push("/login")
        }
        }
    };

    const isQuestionInserted = 
    question_text;
    
    return(
        <PageTemplate>
            <div className={styles.wrapper}>
            <div className={styles.form}>
            <input
            placeholder="question"
            value={question_text}
            onChange={(e) => setQuestionText(e.target.value)}
            />

            <Button  
            className={`${isQuestionInserted ? styles.validBtn : styles.invalidBtn }`}
            title="Add Question"
            onClick={addQuestion}
            />
            </div>
            </div>
        </PageTemplate>
    );
};

export default AddQuestion;