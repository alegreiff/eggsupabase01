import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

//Este es un custom HOOK
const useSupabase = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [session, setSession] = useState(supabase.auth.session());

  supabase.auth.onAuthStateChange(async (_event, session) => {
    setSession(session);
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      if (session?.user.id) {
        const { data: currentUser } = await supabase
          .from("usuarios")
          .select("*")
          .eq("id", session.user.id);

        if (currentUser.length) {
          const foundUser = currentUser[0];
          setCurrentUser(foundUser);
          console.log("el id es: ", foundUser.id);

          const sub = supabase
            .from(`usuarios:id=eq.${foundUser.id}`)
            .on("UPDATE", (payload) => {
              console.log("Upatéate", payload);
              setCurrentUser(payload.new);
            })
            .subscribe();

          //return foundUser;
        } else {
          setCurrentUser("jaime");
        }
      }
    };

    getCurrentUser().catch(console.error);
  }, [session]);

  //console.log("CCUU", currentUser);
  return { currentUser, session, supabase };
};

export default useSupabase;
