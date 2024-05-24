import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import ItemWrapper from "@/components/questionpage/questionpage";

const QuestionAndAnswers = () => {
    const [question, setQuestion] = useState();
    const [answers, setAnswers] = useState();
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

    // useEffect(() => {
    //     if(router.query.id) {
    //         fetchQuestionAndAnswers()
    //     }
    // }, [router.query.id])

    useEffect(() => {
        router.query.id && fetchQuestionAndAnswers();
    }, [router]);

    return(
        <PageTemplate>
            {question && answers && <ItemWrapper question={question} answers={answers} />}
        </PageTemplate>
    )
}

export default QuestionAndAnswers;