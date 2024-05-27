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

    const deleteAnswer = async () => {
        try{

            const headers = {
                authorization: cookies.get("jwt_token"),
            };

            const response = await axios.delete(
                `${process.env.SERVER_URL}/answer/`,
                {
                    headers,
                }
            );

           console.log("response", response)
        } catch (err) {
            console.log(err);
        }
    };

    return( 
            <main>
                <div className={styles.questionWrapper}>
                    {question && (
                        <div className={styles.question}>
                            <h2>{question.question_text}</h2>
                            <p>{question.date}</p>
                        </div>
                    )}
                    {answers.length > 0 ? (
                        <div className={styles.answers}>
                            <h2>Answers</h2>
                            {answers.map((answer) => (
                                <div key={answer.id} className={styles.answer}>
                                    <h3>{answer.answer_text}</h3>
                                    <p>{answer.date}</p>
                                    <p>`Likes { answer.gained_likes_number}`</p>
                                    <Button 
                                    className={styles.Button}
                                    type="WARNING"
                                    title="Delete answer"
                                    onClick={() => setShowWarning(true)}
                                    />
                                </div>
                                // {isShowWarning && (
                                //     <Modal
                                //       message="Do you really want to delete this game?"
                                //       onConfirm={deleteItem}
                                //       onCancel={() => setShowWarning(false)}
                                //     />
                                //   )}
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