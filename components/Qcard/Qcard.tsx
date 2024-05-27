import React from "react";
import styles from "./Qcard.module.css"
import Link from "next/link";

type QcardProps = {
    id: string;
    question_text: string;
    date: string;
};

const Qcard = ({ id, question_text, date }: QcardProps) => {
    return(
        <Link href={`/question/${id}`} className={styles.wrapper}>
            <div className={styles.infoCard}>
            <h2>{question_text}</h2>
            <h3>{date}</h3>
            </div>
        </Link>
    )
}

export default Qcard;