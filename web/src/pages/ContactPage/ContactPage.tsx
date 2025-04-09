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
import { toast } from '@redwoodjs/web/toast';

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
        create({ variables: { input: data } });
    };

    return (
        <>
            <Metadata title="Contact" description="Contact page" />

            <Form
                onSubmit={onSunbmit}
                formMethods={formMethods}
                error={error}
                className="max-w-sm [&>div]:mb-4"
            >
                <FormError error={error} wrapperClassName="form-error" />

                <div>
                    <Label
                        name="name"
                        errorClassName="error block m-0 mb-1 text-sm font-light"
                        className="block m-0 mb-1 text-sm font-extralight text-gray-900"
                    >
                        Name
                    </Label>
                    <TextField
                        name="name"
                        id="name"
                        validation={{ required: true }}
                        errorClassName="error block w-full p-2.5 text-sm rounded-lg"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    <FieldError name="name" className="error errorTxt" />
                </div>

                <div>
                    <Label
                        name="email"
                        errorClassName="error block m-0 mb-1 text-sm font-light"
                        className="block m-0 mb-1 text-sm font-extralight text-gray-900"
                    >
                        Email
                    </Label>
                    <TextField
                        name="email"
                        id="email"
                        validation={{
                            required: true,
                            pattern: {
                                value: /^[^@]+@[^.]+\..+$/,
                                message: 'Please enter a valid email address',
                            },
                        }}
                        errorClassName="error block w-full p-2.5 text-sm rounded-lg"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    <FieldError name="email" className="error errorTxt" />
                </div>

                <div>
                    <Label
                        name="message"
                        errorClassName="error block m-0 mb-1 text-sm font-light"
                        className="block m-0 mb-1 text-sm font-extralight text-gray-900"
                    >
                        Message
                    </Label>
                    <TextAreaField
                        name="message"
                        id="message"
                        validation={{ required: true }}
                        errorClassName="error block w-full p-2.5 text-sm rounded-lg"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <FieldError name="message" className="error errorTxt" />
                </div>

                <Submit
                    disabled={loading}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                    Send message
                </Submit>
            </Form>
        </>
    );
};

export default ContactPage;
