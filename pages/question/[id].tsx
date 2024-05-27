import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { AnswerType } from "@/types/answer";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import ItemWrapper from "@/components/questionpage/questionpage";
import Button from "@/components/Button/Button";
import styles from "./question.module.css"

const QuestionAndAnswers = () => {
    const [question, setQuestion] = useState();
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const [newAnswer, setNewAnswer ] = useState("")
    const router = useRouter();

    const fetchQuestionAndAnswers = async () => {
        try{
            const headers = {
                authorization: Cookies.get("jwt_token"),
            };

            const response = await axios.get(
                `${process.env.SERVER_URL}/question/${router.query.id}/answers`,
                {
                    headers,
                }
            );
            console.log(response)
            setQuestion(response.data.question);
            setAnswers(response.data.answers);
        } catch (err) {
            console.log("err", err);
        };
    };


    const handleAddAnswer = async () => {
        try {
            const headers = {
                authorization: Cookies.get("jwt_token")
            };

            const response = await axios.post(
                `${process.env.SERVER_URL}/question/${router.query.id}/answers`,
                { answer_text: newAnswer },
                { headers }
            );
            console.log(response)
            setAnswers([...answers, response.data.response])
            setNewAnswer("")
        } catch (err) {
            // @ts-expect-error this is correct way to catch error
            if(err.response.status === 401) {
                router.push("/login")
            }
        }
    }


    useEffect(() => {
        router.query.id && fetchQuestionAndAnswers();
    }, [router]);

    useEffect(() => {
        console.log("Current answers state:", answers);
    }, [answers]);

    const isAnswerInserted = newAnswer;

    return(
        <PageTemplate>
            <div className={styles.mainWrapper}>
            {question && answers && <ItemWrapper question={question} answers={answers} />}
           <div className={styles.addAnswer}>
            <input 
            className={`${isAnswerInserted ? styles.addAnswerValid : styles.addAnswerr}`}
            type="text"
            value={newAnswer}
            onChange={(e)=> setNewAnswer(e.target.value)}
            placeholder="Write thy answer here..."
            />
            <Button
            className={`${isAnswerInserted ? styles.validBtn : styles.invalidBtn }`}
            title="Comment"
            onClick={handleAddAnswer}
            type="NORMAL"
            />
            </div>
            </div>
        </PageTemplate>
    )
}

export default QuestionAndAnswers;