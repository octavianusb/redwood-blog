import type { Prisma } from '@prisma/client';
import type { QueryResolvers, CommentRelationResolvers } from 'types/graphql';

import { requireAuth } from 'src/lib/auth';
import { db } from 'src/lib/db';

interface CreateCommentArgs {
    input: Prisma.CommentCreateInput;
}

interface DeleteCommentArgs {
    id: Prisma.CommentWhereUniqueInput['id'];
}

export const comments: QueryResolvers['comments'] = ({
    postId,
}: Required<Pick<Prisma.CommentWhereInput, 'postId'>>) => {
    return db.comment.findMany({ where: { postId } });
};

export const comment: QueryResolvers['comment'] = ({ id }) => {
    return db.comment.findUnique({
        where: { id },
    });
};

export const Comment: CommentRelationResolvers = {
    post: (_obj, { root }) => {
        return db.comment.findUnique({ where: { id: root?.id } }).post();
    },
};

export const createComment = ({ input }: CreateCommentArgs) => {
    return db.comment.create({
        data: input,
    });
};

export const deleteComment = ({ id }: DeleteCommentArgs) => {
    requireAuth({ roles: 'moderator' });
    return db.comment.delete({
        where: { id },
    });
};
