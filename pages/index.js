import Head from "next/head";
import { useEffect, useState } from "react";
import Auth from "../components/Auth";
import Chat from "../components/Chat";
import Fixture from "../components/Fixture";
import Simple from "../layout/MainLayout";
import styles from "../styles/Home.module.css";
import { useAppContext } from "../utils/context/AppContext";

export default function Home({ currentUser, session, supabase }) {
  const { _eq: partidos } = useAppContext();

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(!!session);
    //Investigar la doble exclamación
  }, [session]);

  return (
    <Simple>
      <Fixture partidos={partidos} />
      {loggedIn ? (
        <Chat supabase={supabase} session={session} />
      ) : (
        <Auth supabase={supabase} />
      )}
    </Simple>
  );
}

/* 


*/
