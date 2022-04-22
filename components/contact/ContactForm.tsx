import { faEnvelope, faEnvelopeOpenText, faUser } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import useNotification from "../../hooks/useNotification";
import { NotifStatus } from "../ui/Notification";
import { postContact } from "../../lib/contacts/contact";
import { Size } from "../../models/design-models";
import Button from "../ui/Button";
import LoadingSpinner from "../ui/design-elements/LoadingSpinner";
import classes from "./ContactForm.module.scss";

interface ContactFormValues {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

interface Props {
    email: string;
}

const labelClass = "text-xl text-slate-500 font-semibold";

const ContactForm: React.FC<Props> = ({ email }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { setNotification } = useNotification();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({ defaultValues: { email } });

    const submitHandler = useCallback(
        async (data: ContactFormValues) => {
            setIsLoading(true);
            setNotification(NotifStatus.PENDING);
            const { isSuccess, message } = await postContact(data);
            setIsLoading(false);
            if (isSuccess) {
                setNotification(NotifStatus.SUCCESS, message);
                reset();
            } else {
                setNotification(NotifStatus.ERROR, message);
            }
        },
        [setNotification, reset],
    );

    const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
        <form
            className={`px-6 pt-4 pb-6 flex flex-col gap-6 shadow-md text-slate-700 bg-slate-100 rounded-md border-2 border-slate-200 text-lg ${classes.form}`}
            onSubmit={handleSubmit(submitHandler)}
        >
            <div className="flex flex-col gap-3">
                <label className={labelClass} htmlFor="first-name">
                    <FontAwesomeIcon
                        icon={faUser}
                        className={`max-w-[1.3rem] inline text-[110%] mr-2`}
                    />
                    Name
                </label>
                <div className={`flex gap-2 w-[100%] justify-between`}>
                    <div className="flex flex-col gap-2 flex-1">
                        <input
                            className={`${classes.input}`}
                            type="text"
                            id="first-name"
                            aria-invalid={!!errors.firstName}
                            placeholder="First name"
                            {...register("firstName", {
                                required: "Your first name is required",
                                minLength: {
                                    value: 2,
                                    message: "Your first name should be at least 2 characters",
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Your first name should not exceed 30 characters",
                                },
                            })}
                        />
                        {errors.firstName && (
                            <p className="text-pink-500">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <input
                            className={`${classes.input}`}
                            type="text"
                            id="last-name"
                            aria-invalid={!!errors.lastName}
                            placeholder="Last name"
                            {...register("lastName", {
                                required: "Your last name is required",
                                minLength: {
                                    value: 2,
                                    message: "Your last name should be at least 2 characters",
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Your last name should not exceed 30 characters",
                                },
                            })}
                        />
                        <p className="text-pink-500">
                            {errors.lastName && errors.lastName.message}
                        </p>
                    </div>
                </div>
            </div>
            <div className={`flex flex-col gap-2`}>
                <label className={labelClass} htmlFor="email">
                    <FontAwesomeIcon
                        icon={faEnvelope}
                        className={`max-w-[1.3rem] inline text-[112%] mr-2`}
                    />
                    Email
                </label>
                <input
                    className={`${classes.input}`}
                    type="email"
                    id="email"
                    aria-invalid={!!errors.email}
                    placeholder="Your email address"
                    {...register("email", {
                        required: "Your email is required",
                        minLength: {
                            value: 5,
                            message: "Your email should be at least 5 characters",
                        },
                        maxLength: {
                            value: 50,
                            message: "Your email should not exceed 50 characters",
                        },
                        pattern: { value: emailRegex, message: "Email is invalid" },
                    })}
                />
                {errors.email && <p className="text-pink-500">{errors.email.message}</p>}
            </div>
            <div className={`flex flex-col gap-2`}>
                <label className={labelClass} htmlFor="message">
                    <FontAwesomeIcon
                        icon={faEnvelopeOpenText}
                        className={`max-w-[1.3rem] inline text-[110%] mr-2`}
                    />
                    Message
                </label>
                <textarea
                    placeholder="Your message to us"
                    className={classes.input}
                    aria-invalid={!!errors.message}
                    id="message"
                    cols={30}
                    rows={3}
                    {...register("message", {
                        required: "Your message is required",
                        minLength: {
                            value: 5,
                            message: "Your message should be at least 5 characters",
                        },
                        maxLength: {
                            value: 1000,
                            message: "Your email should not exceed 1000 characters",
                        },
                    })}
                />
                {errors.message && <p className="text-pink-500">{errors.message.message}</p>}
            </div>
            <div className="mt-2">
                {!isLoading ? (
                    <Button type="submit" className="!min-w-[9rem]">
                        Confirm
                    </Button>
                ) : (
                    <LoadingSpinner size={Size.MEDIUM} />
                )}
            </div>
        </form>
    );
};

export default ContactForm;
