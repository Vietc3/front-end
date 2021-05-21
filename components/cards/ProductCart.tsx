import React, { useState } from "react";
import { chakra, Box, Image, Flex, useColorModeValue, HStack } from "@chakra-ui/react";
import _ from 'lodash';
type Props = {
  product: any;
}

type ColorProps = {
  colors: any;
}
const ColorCard = ({ colors }: ColorProps) => {
console.log(colors);

  return (
    <HStack spacing="10px">
      {
        colors.map((color:string)=>(
          <Box w="25px" h="25px" borderRadius={30} bg={color}/>
        ))

      }
    </HStack>)

}

const ProductCard = ({ product }: Props) => {

  const [hover, setHover] = useState(false);
  const urlImage: any = Object.values(product.photos.photo_set);
  const onClick = () => {
    window.open(process.env.NEXT_PUBLIC_BASE_URL_SALES_PRODUCT + `/products/${product.id}`, '_blank');
  };

  const colors =  product.searchable.colors.filter((color:string)=>
    color.charAt(0)==="#"
  )

  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      w="full"
      alignItems="center"
      justifyContent="center"
      onClick={() => { onClick() }}
      cursor="pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ transform: `scale(${hover ? 1.01 : 1})` }}
      transition="ease-in 0.2s"
      h={{ base: "100%", lg: "100%" }}

    >
      <Box
        h={{ base: "100%", lg: "100%" }}
        w="100%"
        bg={useColorModeValue("white", "gray.800")}
        shadow="lg"
        p={5}
      >


        <Image
          h="130px"
          w="auto"

          mt={2}
          src={urlImage[0].photos[0]}
          alt={product.name}
        />
        <Box px={4} py={2}>
          {/* <chakra.h1
            color={useColorModeValue("gray.800", "white")}
            fontWeight="bold"
            fontSize="3xl"
            textTransform="uppercase"
          >
            {product.name}
          </chakra.h1> */}
          <chakra.h4
            color={useColorModeValue("black", "white")}
            fontWeight="bold"
            fontSize="md"
            textTransform="uppercase"
            pt={5}
          >
            {product.name.substr(0, 20)}
            {product.name.length > 20 ? '...' : ''}
          </chakra.h4>
        </Box>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          bg="white"
          roundedBottom="lg"
          px={4}
          py={2}
          pt={4}
        >
          <chakra.h1 color="gray.800" fontWeight="bold" fontSize="xs">
            {`AVAILABLE COLORS`}
          </chakra.h1>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          px={4}
          bg="white"
          roundedBottom="lg"
        >
          <ColorCard colors={colors}/>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          px={4}
          py={2}
          pt={3}
          bg="white"
          roundedBottom="lg"
        >
          <chakra.h1 color="black" fontWeight="bold" fontSize="lg">
            {`$${product.price}`}
          </chakra.h1>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProductCard;