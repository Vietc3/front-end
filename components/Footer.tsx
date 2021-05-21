import React from 'react';
import { Box, Center, /*Divider,*/ Flex, Text/*, useColorModeValue*/ } from '@chakra-ui/react';
import Link from 'next/link';
import styles from '../constants/styles';
import Logo from './Logo';
import useColorTheme from '../hooks/useColorTheme';
import { FOOTER_LINKS/*, FOOTER_BOTTOM_LINKS*/ } from '../constants';

interface Props {}

const Footer: React.FC<Props> = () => {
    const colors = useColorTheme();
  
    return (
        <Box
            as="footer"
            margin={0}
            borderTop="1px"
            borderColor={colors.border}
            boxShadow="lg"
            paddingX={{ base: '.4rem', md: '1rem' }}
            paddingTop="2.4rem"
            color="black"
           
        >
            <Box maxW={styles.mainMaxWidth}  mx={'auto'}>
                <Flex
                    wrap="wrap"
                    w="100%"
                    bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
                    direction={{ base: 'column', md: 'row' }}
                >
                    <Flex justifyContent="left" mx="1rem">
                        <Box alignItems="center">
                            <Box padding={'2px'} _hover={{ textDecoration: 'underline' }} cursor="pointer">
                                <Link href="/">
                                    <a>
                                    <Logo />
                                    </a>
                                   
                                </Link>
                            </Box>

                            <Box  color="black" fontSize=".85em" mx={'3px'}>
                                <Text>(916) 728-5682 989</Text>
                                <Text>Vintage Oak Ave Galt</Text>
                                <Text>California(CA), 95632</Text>
                            </Box>
                        </Box>
                    </Flex>
                    <Flex direction={{ base: 'column', md: 'row' }}>
                        {FOOTER_LINKS.map((link) => {
                            return (
                                <Box
                                    key={link.heading}
                                    justifyContent="center"
                                    height="100%"
                                    margin="10px"
                                    flex="1"
                                    marginX={{ base: '1.4rem', md: '2rem' }}

                                >
                                    <Box textAlign="left">
                                        <Text fontWeight="bold">{link.heading}</Text>
                                        {link.links.map(({ href, title }) => {
                                            return (
                                                <Link key={title} href={href}>
                                                    <Text
                                                        margin="2px"
                                                        fontSize={'.95rem'}
                                                        cursor="pointer"
                                                        color="black"
                                                        _hover={{ textDecoration: 'underline' }}
                                                    >
                                                        {title}
                                                    </Text>
                                                </Link>
                                            );
                                        })}
                                    </Box>
                                </Box>
                            );
                        })}
                    </Flex>
                </Flex>
                <Center bgColor="black" textAlign="center" flexDirection={{ base: 'column', md: 'row' }} h={10} >
                    <Text fontSize={'.9rem'} color="gray.400">
                       Copyright © 2021 Playit Right Inc. All right reserved
                    </Text>
                </Center>
               
            </Box>
           
        </Box>
    );
};

export default Footer;
