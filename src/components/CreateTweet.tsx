import { useState } from "react";
import { trpc } from "../utils/trpc";
import { object, string } from "zod";
import Router from "next/router";
import { useSession } from "next-auth/react";

//Define a Validation Schema for the Tweet using Zod
export const tweetSchema = object({
  content: string({
    required_error: "Tweet text is required",
  })
    .min(10)
    .max(280),
});

export const tweetId = object({
  id: string({
    required_error: "Tweet ID is required",
  }),
});

function CreateTweet() {
  const [tweet, setTweet] = useState("");
  const [error, setError] = useState<string>();
  const { data: SessionData } = useSession();
  //console.log(SessionData);

  const mutation = trpc.tweet.create.useMutation();

  async function handleSubmitTweet(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //Client Side validation for a Protected action (create tweet)
    if (SessionData === null) {
      setError("You must be logged in to tweet");
      return;
    }

    //Server Side Validation for a Protected action (create tweet)
    try {
      await tweetSchema.parseAsync({ content: tweet });
    } catch (err: any) {
      setError(err.message);
      return;
    }

    //Mutaion & Page Reload to reveal changes
    mutation.mutateAsync({ content: tweet });
    Router.reload();
  }
  return (
    <>
      {error && (
        <h2 className="text-2x text-red-500">
          {typeof error === "string" ? error : JSON.stringify(error)}
        </h2>
      )}
      <form onSubmit={(e) => handleSubmitTweet(e)}>
        <div className="flex items-center justify-center gap-4 ">
          <label htmlFor="tweet">
            Create New Tweet:
            <textarea
              className="block rounded-lg border-[1px] border-[#121212] px-2 py-1"
              placeholder="tweet here"
              id="tweet"
              name="tweet"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />
          </label>

          <button
            className="flex-shrink-0 rounded-md border-[2px] border-violet-500 px-2 py-1"
            type="submit"
            disabled={mutation.isLoading}
          >
            Tweet
          </button>
        </div>
        {mutation.error && (
          <p className="text-xs text-red-500">
            Something went wrong! {mutation.error.message}
          </p>
        )}
      </form>

      <div className="p-6" />
    </>
  );
}

export default CreateTweet;
