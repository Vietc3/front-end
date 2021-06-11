import React, { useState } from 'react';
import { Image as ChakraImage, ImageProps, Skeleton } from '@chakra-ui/react';

interface Props extends ImageProps {}

const Image = ({ ...props }: Props) => {
    const [isLoaded, setIsLoaded] = useState(false);

    if (!isLoaded)
        return (
           
                <ChakraImage fallbackSrc='/placeholder-1-1.png' {...props} />
       
        );

    return <ChakraImage {...props} />;
};

export default Image;
