import { useUser } from "@supabase/auth-helpers-react";

import { useEffect } from "react";
import Simple from "../../layout/MainLayout";

export default function Test() {
  const { user } = useUser();

  /* console.log("isLoading", isLoading);
  console.log("USER", user);
  console.log("ERRORE", error); */

  useEffect(() => {
    if (user) {
      console.log("IUser", user);
    } else {
      console.log("NOU ser");
    }
  }, [user]);
  return (
    <Simple>
      <h4>Hola</h4>
      <p>¿Que hace?</p>
    </Simple>
  );
}
