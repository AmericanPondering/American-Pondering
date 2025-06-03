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
    const validationSchema = z.object({
        fullName: z.string().min(1, copy.nameRequiredError),
        phoneNumber: z.string().refine(
            (val) => val.length === 0 || /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/.test(val),
            copy.invalidPhoneNumberError
        ),
        questions: z.string().max(500),
        email: z.string().min(1, copy.emailRequiredError).email()
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(validationSchema)
    });

    const onSubmit = (data) => {
        // TODO: Implement call to backend
        console.log(data);
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("fullName")} placeholder="Name" />
        {errors.fullName && <span>{errors.fullName.message}</span>}

        <input {...register("phoneNumber")} placeholder="Number" />
        {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}

        <input {...register("questions")} placeholder="Questions" />
        {errors.questions && <span>{errors.questions.message}</span>}

        <input {...register("email")} placeholder="We'll email you back" />
        {errors.email && <span>{errors.email.message}</span>}
        
        <button type="submit">Submit</button>
    </form>;
};