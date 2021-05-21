import React from "react";
import {Image, Box, chakra } from '@chakra-ui/react';
import ProductCart from '../../cards/ProductCart';

type Props = {
    margin?: number;
    containerHeight?: number;
    products: any;
}

const Products = ({
    products,
}: Props) => {
    // const index = Math.floor(Math.random() * articles.length)

    // const items = [];

    // items.push(articles[index])
    // items.push(articles[index === articles.length ? index-1 :index+1])



    return (
        <>{products && <>  <Box as="section" d='flex' pl={{ base: '0px', lg: "80px" }}
            pr={{ base: '0px', lg: "80px" }} >
            <chakra.h1
                fontWeight="bold"
                fontSize="2xl"
                textTransform="uppercase"
                marginTop="0.5rem" >
                Shop on
            </chakra.h1>
            <Image w="170px" src="https://s3-ap-southeast-1.amazonaws.com/oleh/assets/1/content/Logo-image-desktop-87J.png" h="48px"/>
            </Box>
            <Box d="flex" flexDirection={{ base: 'column', lg: 'row' }}  as="section" pl={{ base: '0px', lg: "80px" }}
                pr={{ base: '0px', lg: "80px" }} >
                {products?.map((product: any) => {
                    return (
                        <Box w={{ base: "100%", lg: "25%" }}   key={product.name + product.id} p={2} >
                            <ProductCart
                                product={product}
                            />
                        </Box>
                    );
                })}
            </Box></>}

        </>
    );
};

export default Products;