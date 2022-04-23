import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import ContactForm from "./ContactForm";

const ContactMain: React.FC = () => {
    const userContext = useUser();
    const { email } = userContext.user || { name: "", user: "" };

    return (
        <main className="px-16 py-10 max-w-[60rem] m-auto">
            <h1 className="mb-4 capitalize text-[3rem] text-slate-500 font-normal">Contact Us</h1>
            <ContactForm email={email || ""} />
        </main>
    );
};

export default ContactMain;
