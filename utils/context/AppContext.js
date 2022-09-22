import { createContext, useContext } from "react";
import useSupabase from "../useSupabase";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const { session, currentUser, supabase } = useSupabase();
  let sharedState = {
    /* whatever you want */ value: 42,
    _s: session,
    _sp: supabase,
    _cu: currentUser,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
