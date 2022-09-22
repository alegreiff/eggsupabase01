import { Badge, HStack, VStack } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";

export const EstrellasPartido = ({ times, value }) => {
  return (
    <VStack>
      <Badge fontSize="1.5em" colorScheme="green">
        {value * 1}
      </Badge>

      <HStack>
        {Array(times)
          .fill(1)
          .map((el, i) => (
            <AiFillStar
              key={i}
              style={{
                padding: 0,
                margin: 0,
                color: "crimson",
                fontSize: "1.4rem",
              }}
            />
          ))}
      </HStack>
    </VStack>
  );
};
