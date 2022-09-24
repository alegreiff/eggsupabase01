// pages/api/auth.ts

import { supabase } from "../../utils/supabase";

const handler = (req, res) => {
  //console.log("AUTH", req.body.session);
  supabase.auth.api.setAuthCookie(req, res);
  //supabase.auth.api.setAuthCookie(req, res);
};

export default handler;
