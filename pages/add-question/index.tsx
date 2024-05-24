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
            const newQuestion = async () => {
                question_text: question_text
            };

            const headers = {
                authorization: Cookies.get("jwt_token"),
            };

            const response = await axios.post(
                `${process.env.SERVER_URL}/question`,
                newQuestion,
                {
                    headers,
                }
            );
            console.log(response);

            if(response.status === 200) {
                router.push("/")
            }
        } catch (err) {
            console.log(err)
        }
    };

    const isQuestionInserted = 
    question_text;
    
    return(
        <PageTemplate>
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
        </PageTemplate>
    );
};

export default AddQuestion;