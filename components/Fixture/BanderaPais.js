import {
  Badge,
  HStack,
  Image,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";

export const BanderaPais = ({ bandera, nombre, tipo = "local" }) => {
  const [isChiqui] = useMediaQuery("(max-width: 768px)");
  const bordeImagen = useColorModeValue("polla.negro", "polla.blanco");
  const bg = useColorModeValue("red.500", "red.200");

  return (
    <>
      <HStack
        width="130px"
        justifyContent={tipo === "local" ? "flex-end" : "flex-start"}
      >
        {tipo === "local" && <Badge fontSize="18px">{nombre}</Badge>}
        {!isChiqui && (
          <Image
            border={`3px solid`}
            borderColor={bordeImagen}
            src={`/banderas/${bandera.toLowerCase()}.png`}
            alt={nombre}
            height={22}
            width={22}
            borderRadius="full"
          />
        )}
        {tipo === "visitante" && <Badge fontSize="18px">{nombre}</Badge>}
      </HStack>
    </>
  );
};
