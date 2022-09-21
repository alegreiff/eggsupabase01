import Head from "next/head";
import { useEffect, useState } from "react";
import Auth from "../components/Auth";
import Chat from "../components/Chat";
import styles from "../styles/Home.module.css";

export default function Home({ currentUser, session, supabase }) {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(!!session);
    //Investigar la doble exclamación
  }, [session]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Supabasse</title>
      </Head>

      <main className={styles.main}>
        {loggedIn ? (
          <Chat
            currentUser={currentUser}
            supabase={supabase}
            session={session}
          />
        ) : (
          <Auth supabase={supabase} />
        )}
      </main>
    </div>
  );
}
