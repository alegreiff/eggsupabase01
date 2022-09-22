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
  const [equipos, setEquipos] = useState([]);

  supabase.auth.onAuthStateChange(async (_event, session) => {
    if (_event === "SIGNED_OUT") {
      setCurrentUser(null);
    }
    setSession(session);
  });

  useEffect(() => {
    const getEquipos = async () => {
      const { data: equipos, error } = await supabase
        .from("equipos")
        .select("*");

      setEquipos(equipos);
    };

    const getCurrentUser = async () => {
      if (session?.user.id) {
        const { data: currentUser } = await supabase
          .from("usuarios")
          .select("*")
          .eq("id", session.user.id);

        if (currentUser.length) {
          const foundUser = currentUser[0];
          setCurrentUser(foundUser);

          const sub = supabase
            .from(`usuarios:id=eq.${foundUser.id}`)
            .on("UPDATE", (payload) => {
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
    getEquipos().catch(console.error);
  }, [session]);

  //console.log("CCUU", currentUser);
  return { currentUser, session, supabase, equipos };
};

export default useSupabase;
