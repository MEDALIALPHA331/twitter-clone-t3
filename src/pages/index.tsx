import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import CreateTweet from "../components/CreateTweet";
import Timeline from "../components/Timeline";
import Image from "next/image";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-4">
        <nav className="flex w-full flex-row-reverse items-center justify-between px-4">
          {!sessionData && (
            <button
              className="block rounded-md border-[2px] border-violet-500 px-2 py-1"
              onClick={() => signIn()}
            >
              Log In
            </button>
          )}

          {sessionData && (
            <div className="flex items-center justify-center gap-2">
              <h3>{`Logged in as ${sessionData?.user?.name}`}</h3>
              <button
                className="block rounded-md border-[2px] border-violet-500 px-2 py-1"
                onClick={() => signOut()}
              >
                Log Out
              </button>
            </div>
          )}
          {sessionData?.user?.image && (
            <Image
              src={sessionData?.user?.image}
              alt="user image"
              width={70}
              height={70}
              style={{ borderRadius: "50%" }}
            />
          )}
        </nav>
        <div className="p-4" />
        <CreateTweet />
        <Timeline />
      </div>
    </>
  );
};

export default Home;