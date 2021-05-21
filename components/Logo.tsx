import React from 'react';
import { Box, Image } from '@chakra-ui/react';
const Logo = (props: any) => {
    return (
        <Box {...props} >
            <Image src="/logoTV.png" fontWeight="bold" />
        </Box>
    );
};

export default Logo;
