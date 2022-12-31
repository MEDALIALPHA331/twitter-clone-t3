import { router, publicProcedure, protectedProcedure } from "../trpc";
import { tweetSchema, tweetId } from "../../../components/CreateTweet";
import { AuthorId } from "./../../../components/Timeline";

export const tweetRouter = router({
  create: protectedProcedure
    .input(tweetSchema)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { content } = input;
      const userId = ctx.session.user.id; //this is the user id from the session
      return await prisma.tweet.create({
        data: {
          content,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),

  getAllTweets: publicProcedure.query(async ({ ctx }) => {
    const tweets = await ctx.prisma.tweet.findMany();
    return tweets;
  }),

  delete: protectedProcedure.input(tweetId).mutation(async ({ ctx, input }) => {
    const { id } = input;
    const tweet = await ctx.prisma.tweet.findUnique({
      where: {
        id,
      },
    });

    if (tweet) {
      const deletedTweet = await ctx.prisma.tweet.delete({
        where: {
          id,
        },
      });
      return deletedTweet;
    } else {
      throw new Error("Tweet not found");
    }
  }),

  findUser: publicProcedure.input(AuthorId).query(async ({ ctx, input }) => {
    const { AuthorId: id } = input;

    const user = ctx.prisma.user.findUnique({
      where: {
        id,
      },
    });

    /*
    if (!user) {
      return {
        name: "User Does Not Exist",
      };
    }
    */

    return user;
  }),

  deleteAllTweets: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.prisma.tweet.deleteMany();
  }),
});
