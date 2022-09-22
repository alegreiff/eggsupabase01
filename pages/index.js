import Head from "next/head";
import { useEffect, useState } from "react";
import Auth from "../components/Auth";
import Chat from "../components/Chat";
import Simple from "../layout/MainLayout";
import styles from "../styles/Home.module.css";
import { useAppContext } from "../utils/context/AppContext";

export default function Home({ currentUser, session, supabase }) {
  const { _eq: equipos } = useAppContext();
  console.log(equipos);
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

      <Simple currentUser={currentUser}>
        <main className={styles.main}>
          {loggedIn ? (
            <Chat supabase={supabase} session={session} />
          ) : (
            <Auth supabase={supabase} />
          )}
        </main>
      </Simple>
    </div>
  );
}

/* 


*/
