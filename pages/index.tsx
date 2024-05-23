import axios from "axios";
import { links } from "../constants/link";
import React,{ useEffect ,useState } from "react";
import Cookies from "js-cookie";
import styles from "@/styles/Home.module.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { QuestionType } from "@/types/question";
import Link from "next/link";
import { useRouter } from "next/router";





const Index = () => {
    const router = useRouter();

    const [questions, setQuestions] = useState<QuestionType[] | null>(null);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${process.env.SERVER_URL}/questions`);

            setQuestions(response.data.questions);

            console.log(response);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchQuestions();
    }, []);


    return(
        <PageTemplate>
           <div className={styles.linkWrapper}>
            <Link href="/ask question">Ask a question</Link>
           </div>

            
        </PageTemplate>
    )
}


export default Index;