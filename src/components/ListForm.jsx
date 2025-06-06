import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import * as copy from "../copy/components/list-form"

export default function ListForm() {
    return <div>
        <h1>{copy.header}</h1>
        <hr />
        <Form />
        <hr />
        <h2>{copy.infoHeader}</h2>
        <pre>{copy.infoParagraph}</pre>
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
        questions: z.string().max(500)
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
        <input {...register("fullName")} placeholder="Name (required)" />
        {errors.fullName && <span>{errors.fullName.message}</span>}

        <input {...register("email")} placeholder="Email (required)" />
        {errors.email && <span>{errors.email.message}</span>}

        <input {...register("phoneNumber")} placeholder="Phone number" />
        {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}

        <input {...register("questions")} placeholder="Questions" />
        {errors.questions && <span>{errors.questions.message}</span>}
        
        <button type="submit" disabled={loading || responseJSON?.result}>Submit</button>

        {/* Response UI */}
        {responseJSON && (responseJSON?.errCode ? <InterpretErrCode errCode={responseJSON.errCode} /> : <span>Information submitted</span>)}
    </form>;
}

function InterpretErrCode({ errCode }) {
    switch (errCode) {
        case 1:
            return <span>Something was wrong with your information.</span>;
        case 2:
            return <span>Something went wrong validating your information.</span>;
        case 3:
            return <span>Something went wrong adding your information to the list.</span>;
    }
}