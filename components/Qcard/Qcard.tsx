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
        <Link href={`/yes/${id}`} className={styles.wrapper}>
            <h2>{question_text}</h2>
            <h3>{date}</h3>
        </Link>
    )
}

export default Qcard;