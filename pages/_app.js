import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { AppWrapper } from "../utils/context/AppContext";
import useSupabase from "../utils/useSupabase";

function MyApp({ Component, pageProps }) {
  const { currentUser: usser, session, supabase } = useSupabase();

  return (
    <AppWrapper>
      <ChakraProvider>
        <Component
          currentUser={usser}
          session={session}
          supabase={supabase}
          {...pageProps}
        />
      </ChakraProvider>
    </AppWrapper>
  );
}

export default MyApp;
