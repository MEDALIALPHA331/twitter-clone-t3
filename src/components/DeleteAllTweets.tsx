import Router from "next/router";
import { trpc } from "../utils/trpc";

export default function DeleteAllTweets() {
  const { mutateAsync } = trpc.tweet.deleteAllTweets.useMutation();

  async function handledDeleteAllTweets() {
    mutateAsync();
    Router.reload();
  }
  return (
    <button
      className="rounded-md bg-red-500 p-4"
      onClick={handledDeleteAllTweets}
    >
      X All!
    </button>
  );
}
