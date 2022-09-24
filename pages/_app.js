import { ChakraProvider } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { UserProvider } from "@supabase/auth-helpers-react";
import "../styles/globals.css";
import { AppWrapper } from "../utils/context/AppContext";
import useSupabase from "../utils/useSupabase";

function MyApp({ Component, pageProps }) {
  const { currentUser: usser, session, supabase } = useSupabase();

  return (
    <UserProvider supabaseClient={supabaseClient}>
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
    </UserProvider>
  );
}

export default MyApp;
