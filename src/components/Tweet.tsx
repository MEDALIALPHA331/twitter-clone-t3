import type { TweetType } from "./Timeline";
import { trpc } from "../utils/trpc";
import Router from "next/router";
import { ClockIcon, DeleteIcon, SerperateIcon, UserIcon } from "./Icons";
//import { useState, useEffect } from "react";

export default function Tweet({ tweet }: { tweet: TweetType }) {
  const { mutateAsync } = trpc.tweet.delete.useMutation();

  const username = trpc.tweet.findUser.useQuery({ AuthorId: tweet.authorId })
    .data?.name;

  async function handleDelete(id: string) {
    await mutateAsync({ id });
    Router.reload();
  }

  return (
    <div className="flex flex-col  justify-center rounded-lg bg-[#111111] p-2 text-white">
      <section aria-label="tweet information">
        {/*TODO: Some button to expand the tweet into its onw dynamic route, it should be positioned absolute  */}

        <div className="mb-1 flex items-center justify-center gap-4 text-sm">
          <span className="flex items-center justify-start gap-1 text-violet-400">
            <UserIcon />
            {username || "user " + tweet.authorId.slice(0, 4) || "user"}
          </span>
          <SerperateIcon />
          <span className="flex items-center justify-start gap-1 text-blue-400">
            <ClockIcon />
            {tweet.createdAt.toLocaleDateString()}
          </span>

          {/* TODO: add Tooltips Created At & Username */}
        </div>
      </section>

      <section className="py-4 px-2 text-center" aria-label="tweet content">
        <h3>{tweet.content}</h3>
      </section>

      {/* TODO: Add some type of validation: only the user who creates the tweet can delete it */}
      <section
        aria-label="utils section: edit and delete"
        className="mt-auto flex items-center justify-center justify-self-end px-2"
      >
        <div>
          <button
            className="rounded-full"
            aria-label="delete tweet button"
            onClick={() => handleDelete(tweet.id)}
          >
            <DeleteIcon />
          </button>
        </div>
      </section>
    </div>
  );
}
