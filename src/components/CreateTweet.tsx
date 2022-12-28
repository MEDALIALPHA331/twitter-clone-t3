import { useState } from "react";
import { trpc } from "../utils/trpc";
import { object, string } from "zod";
import Router from "next/router";

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
  const [error, setError] = useState("");

  const mutation = trpc.tweet.create.useMutation();

  async function handleSubmitTweet(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //Client Side validation agaisnt the schema //TODO: Fix it
    /*
    try {
      await tweetSchema.parse(tweet);
    } catch (e: any) {
      setError(e.message);
      return;
    }
    */

    mutation.mutateAsync({ content: tweet });
    Router.reload();
  }
  return (
    <>
      {error && JSON.stringify(error)}
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
            disabled={mutation.isLoading}
          >
            Tweet
          </button>
          {mutation.error && (
            <p className="text-xs text-red-500">
              Something went wrong! {mutation.error.message}
            </p>
          )}
        </div>
      </form>
      <div className="p-6" />
    </>
  );
}

export default CreateTweet;
