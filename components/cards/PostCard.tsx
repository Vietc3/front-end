import React, { useState } from 'react';
import { chakra, HStack, Box, Flex, useColorModeValue, FlexProps, Icon, Center, Spacer } from '@chakra-ui/react';
// import Image from '../Image';
import { useRouter } from 'next/router';
import { BsCalendar, BsPencil } from 'react-icons/bs';
import { AiFillPlayCircle } from 'react-icons/ai';
import { getUrlImage, formatDatePublic } from '../../helpers/commonFuction';
import Image from 'next/image';

interface Props extends FlexProps {
    alt: string;
    idArticle: string;
    article: any;
}

const PostCard = ({ idArticle, article }: Props) => {
    const [hover, setHover] = useState(false);
    const router = useRouter();
    const onClick = () => {
        router.push(`/articles/${idArticle}`);
    };
    return (
        <Flex
            className="carousel test"
            bg={useColorModeValue('white', 'gray.800')}
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
            onClick={() => onClick()}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                mx="0"
                display={{ lg: 'flex' }}
                rounded={{ lg: 'lg' }}
                w="full"
            >
                {/* <Box
                    w={{ lg: '100%' }}
                    display={{ base: 'none', md: 'none', lg: 'flex' }}
                    style={{
                        backgroundImage: hover
                            ? `url("${getUrlImage(article.hero_desktop.url)}`
                            : `linear-gradient(rgb(106 95 107 / 37%), #2c333c),url("${getUrlImage(
                                  article.hero_desktop.url,
                              )}")`,
                        backgroundRepeat: 'no-repeat',
                        width: '100%',
                        backgroundSize: 'cover',
                    }}
                    justifyContent="flex-end"
                    flexDirection="column"
                    h={{ base: '350px', lg: '660px' }}
                    pl={{ base: '0px', lg: '80px' }}
                    pr={{ base: '0px', lg: '80px' }}
                ></Box> */}

                <Box w="100%" display={{ base: 'flex', lg: 'none' }}>
                    <div
                        style={{
                            position: 'relative',
                            width: '100vw',
                            height: '400px',
                            maxHeight: '400px',
                            maxWidth: '100vw',
                        }}
                    >
                        <Image
                            src={getUrlImage(article.hero_mobile.url)}
                            layout="fill"
                            placeholder="blur"
                            style={{
                                width: '100vw',
                                height: '400px',
                                maxHeight: '400px',
                                maxWidth: '100vw',
                            }}
                        />
                    </div>
                </Box>

                <HStack pl="10px" justify="center" pos="absolute" bottom="8px" w="full">
                    <Box py={20} px={6} maxW={{ base: 'xl', lg: '5xl' }} textAlign="center" w={{ lg: '80%' }}>
                        <chakra.h1
                            data-aos="fade-left"
                            fontSize={{ base: '2xl', md: '3xl' }}
                            color="white"
                            fontWeight="bold"
                        >
                            {article.title}
                        </chakra.h1>
                        {/* <chakra.p mt={4} c color="white">
         {title}
          </chakra.p> */}
                        <Box textAlign="center" alignItems="center" px={6} py={3} data-aos="fade-left">
                            <Center>
                                <Flex>
                                    <Icon as={BsCalendar} h={6} w={6} color="white" />
                                    <chakra.h2 mx={3} color="white" fontWeight="bold" fontSize="lg">
                                        {formatDatePublic(article.public_date)}
                                    </chakra.h2>
                                </Flex>
                                <Flex>
                                    <Icon as={BsPencil} h={6} w={6} color="white" />
                                    <chakra.h2 mx={3} color="white" fontWeight="bold" fontSize="lg">
                                        {article.author}
                                    </chakra.h2>
                                </Flex>
                            </Center>
                        </Box>
                    </Box>
                </HStack>
                {article.youtube_url ? (
                    <HStack pl="10px" justify="center" pos="absolute" bottom="20px" w="full">
                        <Spacer />
                        <Box>
                            <Icon mr="10px" as={AiFillPlayCircle} h="60px" w="60px" color="white" />
                        </Box>
                    </HStack>
                ) : null}
            </Box>
        </Flex>
    );
};

export default PostCard;
