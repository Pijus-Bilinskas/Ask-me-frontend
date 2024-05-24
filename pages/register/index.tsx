import React from "react";
import Header from "../../components/Header/Header";
import { links } from "../../constants/link";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const Index = () => {
    return(
        <div>
            <Header logo={"Ask me"} links={links} />
            <RegisterForm />
        </div>
    );
};

export default Index;