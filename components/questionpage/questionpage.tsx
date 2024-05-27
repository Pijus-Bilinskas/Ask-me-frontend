import { QuestionType } from "../../types/question";
import { AnswerType } from "../../types/answer";
import React, { useState } from "react";
import styles from "./questionpage.module.css";
import Button from "../Button/Button";
import axios from "axios";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import PageTemplate from "../PageTemplate/PageTemplate";


type ItemWrapperProps = {
    question: QuestionType;
    answers: AnswerType[];
};


const ItemWrapper = ({ question, answers }: ItemWrapperProps) => {
    const router = useRouter();

    const [isShowWarning, setShowWarning] = useState(false);

    const deleteQuestion = async () => {
        try{

            const headers = {
                authorization: cookies.get("jwt_token"),
            };

            const response = await axios.delete(
                `${process.env.SERVER_URL}/question/${router.query.id}`,
                {
                    headers,
                }
            );

           console.log("response", response)
           if(response.status === 200) {
            router.push("/");
         }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteAnswer = async (answer_id: any) => {
        try{
            const headers = {
                authorization: cookies.get("jwt_token")
            }

            const response = await axios.delete(
                `${process.env.SERVER_URL}/answer/${answer_id}`,
                { headers }
            )

            console.log(response)
            window.location.reload()
         } catch (err) {
        console.log(err)
    }
}

    return( 
            <main>
                <div className={styles.questionWrapper}>
                    {question && (
                        <div className={styles.question}>
                            <div className={styles.questAndDate}>
                            <h2>{question.question_text}</h2>
                            <p>{question.date}</p>
                            </div>
                            <div className={styles.deletBtn}>
                            <Button 
                            className={styles.Button}
                            type="WARNING"
                            title="Delete question"
                            onClick={deleteQuestion}
                            />
                            </div>
                        </div>
                    )}
                    {answers.length > 0 ? (
                        <div className={styles.answers}>
                            {answers.map((answer) => (
                                <div key={answer.id} className={styles.answer}>
                                    <div>
                                    <h3>{answer.answer_text}</h3>
                                    <p>{answer.date}</p>
                                    <p>`Likes { answer.gained_likes_number}`</p>
                                    </div>
                                    <div className={styles.deletBtn}>
                                    <Button 
                                    className={styles.Button}
                                    type="WARNING"
                                    title="Delete answer"
                                    onClick={() =>deleteAnswer(answer.id)}
                                    />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>No answers yet.</div>
                    )}
                </div>
                </main>
        );

};


export default ItemWrapper;