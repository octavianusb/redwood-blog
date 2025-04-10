import { db } from 'api/src/lib/db';

// Manually apply seeds via the `yarn rw prisma db seed` command.
//
// Seeds automatically run the first time you run the `yarn rw prisma migrate dev`
// command and every time you run the `yarn rw prisma migrate reset` command.
//
// See https://redwoodjs.com/docs/database-seeds for more info

export default async () => {
    try {
        const posts = [
            {
                id: 1,
                title: 'Welcome to the blog!',
                body: "I'm baby single- origin coffee kickstarter lo - fi paleo skateboard.Tumblr hashtag austin whatever DIY plaid knausgaard fanny pack messenger bag blog next level woke.Ethical bitters fixie freegan,helvetica pitchfork 90's tbh chillwave mustache godard subway tile ramps art party. Hammock sustainable twee yr bushwick disrupt unicorn, before they sold out direct trade chicharrones etsy polaroid hoodie. Gentrify offal hoodie fingerstache.",
                userId: 1,
            },
        ];

        await db.post.createMany({ data: posts });

        console.info(
            '\n  No seed data, skipping. See scripts/seed.ts to start seeding your database!\n'
        );
    } catch (error) {
        console.error(error);
    }
};
