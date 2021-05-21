import React from "react";
import { chakra, Box, Image, Flex, useColorModeValue } from "@chakra-ui/react";
import _ from 'lodash';
type Props = {
    product: any;
}

const ProductCard = ({product}:Props) => {

  
  const urlImage:any =  Object.values(product.photos.photo_set);
  const onClick = () => {
    window.open(process.env.NEXT_PUBLIC_BASE_URL_SALES_PRODUCT+`/products/${product.id}`, '_blank');
  };

    
  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      w="full"
      alignItems="center"
      justifyContent="center"
      onClick={()=>{onClick()}}
      cursor="pointer"
    >
      <Box
        w="100%"
        bg={useColorModeValue("white", "gray.800")}
        shadow="lg"
       
      >
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
            color={useColorModeValue("gray.800", "white")}
            fontWeight="bold"
            fontSize="xl"
            textTransform="uppercase"
          >
           {product.name.substr(0, 20)}
                    {product.name.length > 20 ? '...' : ''}
          </chakra.h4>
        </Box>

        <Image
          h="130px"
          w="full"
          fit="cover"
          mt={2}
          src={urlImage[0].photos[0]}
          alt={product.name}
        />

        <Flex
          alignItems="center"
          justifyContent="space-between"
          px={4}
          py={2}
          bg="gray.900"
          roundedBottom="lg"
        >
          <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
           {`$${product.price}`}
          </chakra.h1>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProductCard;