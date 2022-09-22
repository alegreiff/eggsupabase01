import { Badge, Stack } from "@chakra-ui/react";
import { format, parse, addHours } from "date-fns";
import { es } from "date-fns/locale";

export const FechaSingle = ({ date }) => {
  date = new Date(date);
  const dia = format(date, "cccc", { locale: es });
  const fecha = format(date, "MMM dd", { locale: es });
  const hora = format(date, "H':'mm a");
  return (
    <Stack direction="row">
      <Badge>{dia}</Badge>
      <Badge>{fecha}</Badge>
      <Badge fontSize="1.2rem" colorScheme="green">
        {hora}
      </Badge>
    </Stack>
  );
};

/* 

*/
