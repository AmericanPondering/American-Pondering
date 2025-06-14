import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import classNames from "classnames"

import * as copy from "../copy/components/list-form"

import styles from "./ListForm.module.scss"
import Seperator from "../assets/images/seperator.svg?react"

export default function ListForm() {
    return <div className={styles.mainContainer}>
        <h1>{copy.header}</h1>
        <Seperator className={styles.seperator} />
        <div className={styles.contentContainer}>
            <Form />
            <div className={styles.textContainer}>
                <p>{copy.infoParagraph}</p>
                <ul>
                    <li>{copy.infoBullets[0]}</li>
                    <li>{copy.infoBullets[1]}</li>
                    <li>{copy.infoBullets[2]}</li>
                    <li>{copy.infoBullets[3]}</li>
                </ul>
            </div>

            <div className={styles.printInfoContainer}>
                <h2>{copy.printInfoHeader}</h2>
                <h3>{copy.printInfoSubheader}</h3>
                <ul>
                    <li>{copy.printInfoBullets[0]}</li>
                    <li>{copy.printInfoBullets[1]}</li>
                    <li>{copy.printInfoBullets[2]}</li>
                    <li>{copy.printInfoBullets[3]}</li>
                    <li>{copy.printInfoBullets[4]}</li>
                    <li>{copy.printInfoBullets[5]}</li>
                </ul>
            </div>
        </div>
    </div>;
}

function Form() {
    const [loading, setLoading] = useState(false);
    const [responseJSON, setResponseJSON] = useState();

    const validationSchema = z.object({
        fullName: z.string().min(1, copy.nameRequiredError),
        email: z.string().min(1, copy.emailRequiredError).email(),
        phoneNumber: z.string().refine(
            (val) => val.length === 0 || /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/.test(val),
            copy.invalidPhoneNumberError
        ),
        questions: z.string().max(500, copy.stringTooLongError)
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(validationSchema)
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await fetch("https://backend-2-996982189694.us-east5.run.app/publish", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error(`Response status: ${response.status}`);

            const json = await response.json();
            setLoading(false);
            setResponseJSON(json);

        } catch (err) {
            console.log("Error sending form data:");
            console.log(err);
            setLoading(false);
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.formField}>
            <span className={styles.formLabel}>Name*</span>
            <input
                {...register("fullName")}
                placeholder="Name (required)"
                disabled={loading || responseJSON}
                className={styles.formControl}
            />
            {errors.fullName && <span className={styles.errorMessage}>{errors.fullName.message}</span>}
        </label>


        <label className={styles.formField}>
            <span className={styles.formLabel}>Email*</span>
            <input
                {...register("email")}
                placeholder="Email (required)"
                disabled={loading || responseJSON}
                className={styles.formControl}
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
        </label>

        <label className={styles.formField}>
            <span className={styles.formLabel}>Phone number</span>
            <input
                {...register("phoneNumber")}
                placeholder="Phone number"
                disabled={loading || responseJSON}
                className={styles.formControl}
            />
            {errors.phoneNumber && <span className={styles.errorMessage}>{errors.phoneNumber.message}</span>}
        </label>


        <label className={styles.formField}>
            <span className={styles.formLabel}>Questions</span>
            <textarea
                {...register("questions")}
                placeholder="Questions"
                disabled={loading || responseJSON}
                className={styles.formControl}
            />
            {errors.questions && <span className={styles.errorMessage}>{errors.questions.message}</span>}
        </label>
        
        <button
            type="submit"
            disabled={loading || responseJSON}
            className={classNames({
                    [styles.submitAnimation]: loading,
                    [styles.submitSuccess]: responseJSON && !responseJSON?.errCode,
                    [styles.submitError]: responseJSON && responseJSON?.errCode
                },
                styles.submitButton
            )}
        >{
            responseJSON ?
                (responseJSON?.errCode ? interpretErrCode(responseJSON.errCode): copy.reponseSuccess)
                : "Submit"
        }</button>
    </form>;
}

function interpretErrCode(errCode) {
    switch (errCode) {
        case 1:
            return copy.reponseInvalidInfoError;
        case 2:
            return copy.reponseValidationError;
        case 3:
            return copy.reponseAPIError;
    }
}