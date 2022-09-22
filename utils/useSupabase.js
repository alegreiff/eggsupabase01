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
  const [partidos, setPartidos] = useState([]);

  supabase.auth.onAuthStateChange(async (_event, session) => {
    if (_event === "SIGNED_OUT") {
      setCurrentUser(null);
    }
    setSession(session);
  });

  useEffect(() => {
    const getPartidos = async () => {
      const { data: partidos, error } = await supabase.from("fixture").select(
        `
        id, ronda,
        LOC:equipos!fixture_loc_fkey (
          nombre, rank, code
        ),
        VIS:equipos!fixture_vis_fkey (
          nombre, rank, code
        )
        `
      );

      console.log(partidos);
      setPartidos(partidos);
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
    getPartidos().catch(console.error);
  }, [session]);

  //console.log("CCUU", currentUser);
  return { currentUser, session, supabase, partidos };
};

export default useSupabase;
