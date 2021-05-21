import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import useColorTheme from '../hooks/useColorTheme';
const Logo = (props: any) => {
    const colors = useColorTheme();
    return (
        <Box {...props} >
            <Image src="./logo.png" fontWeight="bold" />
        </Box>
    );
};

export default Logo;
