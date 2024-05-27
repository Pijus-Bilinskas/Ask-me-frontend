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

    const [answerList, setAnswerList] = useState(answers);
    

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
            // @ts-expect-error this is correct way to catch error
            if(err.response.status === 401) {
                router.push("/login")
            }
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
             // @ts-expect-error this is correct way to catch error
            if(err.response.status === 401) {
                router.push("/login")
            }
    }
}

const likeAnswer = async (answer_id: string)  => {
    try{
        const headers = {
            authorization: cookies.get("jwt_token")
        };

        const response = await axios.post(
            `${process.env.SERVER_URL}/answer/${answer_id}/like`,
            {},
            {headers}
        );

        console.log(response);
        if (response.status === 200) {
            setAnswerList(answerList.map(answer =>
                answer.id === answer_id ? { ...answer, gained_likes_number: response.data.likes } : answer
            ));
         }
         window.location.reload(); 
    }catch (err) {
          // @ts-expect-error this is correct way to catch error
          if(err.response.status === 401) {
            router.push("/login")
        }
    }
}

    return( 
            <main className={styles.mainwrapper}>
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
                                    <Button
                                        className={styles.Like}
                                        type="NORMAL"
                                        title={`Likes: ${answer.gained_likes_number}`}
                                        onClick={() => likeAnswer(answer.id)}
                                    />
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
                        <div className={styles.NoneAnswers}>No answers yet.</div>
                    )}
                </div>
                </main>
        );

};


export default ItemWrapper;