import { QuestionType } from "../../types/question";
import React from "react";
import Qcard from "../Qcard/Qcard";
import styles from "./QcardWrapper.module.css";

type QcardsWrapper = {
    questions: QuestionType[];
};

const QcardsWrapper = ({ questions }: QcardsWrapper) => {
    return (
        <div className={styles.qcardsWrapper}>
            {questions.map((question) => (
                <Qcard
                id={question.id}
                key={question.id}
                question_text={question.question_text}
                date={question.date}
                />
            ))}
        </div>
    );
};

export default QcardsWrapper;