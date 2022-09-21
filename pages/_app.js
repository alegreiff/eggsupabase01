import "../styles/globals.css";
import useSupabase from "../utils/useSupabase";

function MyApp({ Component, pageProps }) {
  const { currentUser: usser, session, supabase } = useSupabase();
  return (
    <Component
      currentUser={usser}
      session={session}
      supabase={supabase}
      {...pageProps}
    />
  );
}

export default MyApp;
