import React from "react";
import Header from "../../components/Header/Header";
import { links } from "../../constants/link";
import LoginForm from "../../components/LoginForm/LoginForm";

const Index = () => {
    return(
        <div>
            <Header logo={"Ask me"} links={links} />
            <LoginForm />
        </div>
    );
};

export default Index;