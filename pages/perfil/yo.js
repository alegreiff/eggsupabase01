import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Simple from "../../layout/MainLayout";
import { supabase } from "../../utils/supabase";
import useSupabase from "../../utils/useSupabase";
import * as Yup from "yup";
import { useEffect, useState } from "react";

export default function Jefe() {
  return (
    <Simple>
      <h4>Hola</h4>
    </Simple>
  );
}

/* export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return { props: {}, redirect: { destination: "/" } };
  }
  const { data: profile, error } = await supabase
    .from("usuarios")
    .select("id")
    .eq("id", user.id)
    .single();
  console.log("perfil", user.id, profile);
  const perfil = profile;

  if (error) {
    console.log("ERROR", error);
  }

  return { props: { user, perfil } };
} */

/* 
[{"id":"5a47d784-6ea8-4864-9ecf-22b2f07a0e83","created_at":"2022-09-22T01:30:23+00:00","username":"Ja Y me","correo":"a.legreiff@gmail.com","isPollero":true,"favorito":2,"hincha":"Independiente Santa Fe","isPagado":false,"alias":"Jardinero"}]
5a47d784-6ea8-4864-9ecf-22b2f07a0e83
5a47d784-6ea8-4864-9ecf-22b2f07a0e83

*/
