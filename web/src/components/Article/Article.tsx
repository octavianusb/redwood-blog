import type { Post } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';

import CommentsCell from 'src/components/CommentsCell'
import CommentForm from 'src/components/CommentForm';

const truncate = (text: string, length: number) => {
    return text.substring(0, length) + '...';
};

interface Props {
    article: Omit<Post, 'createdAt'>;
    summary?: boolean;
}

const Article = ({ article, summary = false }: Props) => {
    return (
        <article className="mt-10 bg-slate-200/30 rounded-md p-8 shadow-md">
            <header>
                <h2 className="text-xl text-blue-700 font-semibold">
                    <Link to={routes.article({ id: article.id })}>{article.title}</Link>
                    <span className="ml-2 text-gray-400 font-normal">
                        by {article?.user?.email}
                    </span>
                </h2>
            </header>

            <div className="mt-2 text-gray-900 font-light">
                {summary ? truncate(article.body, 100) : article.body}
            </div>

            {!summary && (
                <div className='mt-12'>
                    <CommentForm postId={article.id} />

                    <div className="mt-12"><CommentsCell postId={article.id} /></div>
                </div>
            )}
        </article>
    );
};

export default Article;
