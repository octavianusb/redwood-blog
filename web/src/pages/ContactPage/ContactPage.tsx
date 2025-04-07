import {
    FieldError,
    Form,
    FormError,
    Label,
    Submit,
    TextAreaField,
    TextField,
    useForm,
} from '@redwoodjs/forms';
import { Metadata, useMutation } from '@redwoodjs/web';
import { Toaster, toast } from '@redwoodjs/web/toast';

const CREATE_CONTACT = gql`
    mutation CreateContactMutation($input: CreateContactInput!) {
        createContact(input: $input) {
            id
        }
    }
`;

const ContactPage = () => {
    const formMethods = useForm();
    const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
        onCompleted: () => {
            toast.success('Thank you for your message!');
            formMethods.reset();
        },
        // onError: (_err) => {
        //     const errTxt = _err?.message;
        //     toast.error(errTxt || 'Something went wrong. Please try again.');
        // },
    });
    const onSunbmit = (data: any) => {
        console.log('Form data:', data);
        create({ variables: { input: data } });
    };

    return (
        <>
            <Metadata title="Contact" description="Contact page" />

            <Toaster />
            <Form onSubmit={onSunbmit} formMethods={formMethods} error={error}>
                <FormError error={error} wrapperClassName="form-error" />
                <Label name="name" errorClassName="error">
                    Name
                </Label>
                <TextField
                    name="name"
                    id="name"
                    validation={{ required: true }}
                    errorClassName="error"
                />
                <FieldError name="name" className="error errorTxt" />

                <Label name="email" errorClassName="error">
                    Email
                </Label>
                <TextField
                    name="email"
                    id="email"
                    validation={{
                        required: true,
                        // pattern: {
                        //   value: /^[^@]+@[^.]+\..+$/,
                        //   message: 'Please enter a valid email address',
                        // },
                    }}
                    errorClassName="error"
                />
                <FieldError name="email" className="error errorTxt" />

                <Label name="message" errorClassName="error">
                    Message
                </Label>
                <TextAreaField
                    name="message"
                    id="message"
                    validation={{ required: true }}
                    errorClassName="error"
                />
                <FieldError name="message" className="error errorTxt" />

                <Submit disabled={loading}>Send message</Submit>
            </Form>
        </>
    );
};

export default ContactPage;
