export const schema = gql`
    type User {
        id: Int!
        email: String!
        # hashedPassword: String!
        # salt: String!
        # resetToken: String
        # resetTokenExpiresAt: DateTime
        createdAt: DateTime!
        updatedAt: DateTime!
        roles: String!
        posts: [Post]!
    }

    type Query {
        users: [User!]! @requireAuth
    }

    input CreateUserInput {
        email: String!
        hashedPassword: String!
        salt: String!
        resetToken: String
        resetTokenExpiresAt: DateTime
        roles: String!
    }

    input UpdateUserInput {
        email: String
        hashedPassword: String
        salt: String
        resetToken: String
        resetTokenExpiresAt: DateTime
        roles: String
    }
`;
