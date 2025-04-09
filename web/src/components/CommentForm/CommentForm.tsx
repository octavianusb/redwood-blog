import { useState } from 'react';

import type { CreateCommentMutation, CreateCommentMutationVariables } from 'types/graphql';

import {
    Form,
    Label,
    TextField,
    TextAreaField,
    Submit,
    FormError,
    SubmitHandler,
    useForm,
} from '@redwoodjs/forms';
import type { TypedDocumentNode } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY as CommentsQuery } from 'src/components/CommentsCell';

const CREATE: TypedDocumentNode<CreateCommentMutation, CreateCommentMutationVariables> = gql`
    mutation CreateCommentMutation($input: CreateCommentInput!) {
        createComment(input: $input) {
            id
            name
            body
            createdAt
        }
    }
`;

interface FormValues {
    name: string;
    comment: string;
}

interface CommentFormProps {
    postId: number;
}

const CommentForm = ({ postId }: CommentFormProps) => {
    const formMethods = useForm();
    const [hasPosted, setHasPosted] = useState(false);
    const [createComment, { loading, error }] = useMutation(CREATE, {
        refetchQueries: [{ query: CommentsQuery, variables: { postId } }],
        onCompleted: () => {
            setHasPosted(true);
            formMethods.reset();
            toast.success('Thank you for your comment!');
        },
    });

    const onSubmit: SubmitHandler<FormValues> = (input) => {
        createComment({ variables: { input: { ...input, postId } } });
    };

    return (
        <div className={hasPosted ? 'hidden' : ''}>
            <h3 className="font-light text-lg text-gray-600">Leave a Comment</h3>
            <Form className="mt-4 w-full" onSubmit={onSubmit} formMethods={formMethods}>
                <FormError
                    error={error}
                    titleClassName="font-semibold"
                    wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
                />
                <Label name="name" className="block text-sm text-gray-600">
                    Name
                </Label>
                <TextField
                    name="name"
                    className="block w-full p-1 border rounded text-xs"
                    validation={{ required: true }}
                />

                <Label name="body" className="block mt-4 text-sm text-gray-600">
                    Comment
                </Label>
                <TextAreaField
                    name="body"
                    className="block w-full p-1 border rounded h-24 text-xs"
                    validation={{ required: true }}
                />

                <Submit
                    disabled={loading}
                    className="block mt-4 bg-blue-500 text-white text-xs font-semibold uppercase tracking-wide rounded px-3 py-2 disabled:opacity-50"
                >
                    Submit
                </Submit>
            </Form>
        </div>
    );
};

export default CommentForm;
