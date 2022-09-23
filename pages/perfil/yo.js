import Simple from "../../layout/MainLayout";
import { supabase } from "../../utils/supabase";

export default function Jefe() {
  return (
    <Simple>
      <h4>Mi perfil</h4>
    </Simple>
  );
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  //console.log(user);

  if (!user) {
    return { props: {}, redirect: { destination: "/demalas" } };
  }

  return { props: {} };
}
