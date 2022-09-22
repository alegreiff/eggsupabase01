import Simple from "../layout/MainLayout";
import { useAppContext } from "../utils/context/AppContext";

export default function Partidos() {
  const { _pa: partidos } = useAppContext();
  return (
    <Simple>
      <h1>Los partidos</h1>

      <div>
        <pre>{JSON.stringify(partidos, null, 2)}</pre>
      </div>
    </Simple>
  );
}
