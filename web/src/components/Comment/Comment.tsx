const formatDate = (dateString: ConstructorParameters<typeof Date>[0]) => {
    const parsedDate = new Date(dateString);
    const month = parsedDate.toLocaleString('default', { month: 'long' });

    return `${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()}`;
};

interface CommentProps {
    comment: {
        name: string;
        createdAt: string;
        body: string;
    };
}

const Comment = ({ comment }: CommentProps) => {
    return (
        <div className="bg-gray-200 p-8 rounded-lg">
            <header className="flex justify-between">
                <h2 className="font-semibold text-gray-700">{comment.name}</h2>
                <time className="text-xs text-gray-500" dateTime={comment.createdAt}>
                    {formatDate(comment.createdAt)}
                </time>
            </header>

            <p className="text-sm mt-2">{comment.body}</p>
        </div>
    );
};

export default Comment;
