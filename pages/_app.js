import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import useSupabase from "../utils/useSupabase";

function MyApp({ Component, pageProps }) {
  const { currentUser: usser, session, supabase } = useSupabase();
  return (
    <ChakraProvider>
      <Component
          currentUser={usser}
          session={session}
          supabase={supabase}
          {...pageProps}
        />
    </ChakraProvider>
  );
}

export default MyApp;
