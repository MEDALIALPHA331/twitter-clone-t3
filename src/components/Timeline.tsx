import { object, string } from "zod";
import { trpc } from "../utils/trpc";
import { Seperator, GridContainer } from "./Layout";
import Tweet from "./Tweet";

export interface TweetType {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

export const AuthorId = object({
  AuthorId: string({
    required_error: "Author ID is required",
  }),
});

export default function Timeline() {
  const { data: tweets } = trpc.tweet.getAllTweets.useQuery();
  //console.log(tweets);

  //handleUserName("clbrx6zps0000bwhg9sp5tivm");

  return (
    <div id="tweets" className="flex w-full flex-col ">
      <h1 className="my-0 mx-auto text-4xl text-violet-600">All Tweets</h1>
      <Seperator />
      <GridContainer>
        {tweets?.map((tweet: TweetType) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </GridContainer>
    </div>
  );
}
