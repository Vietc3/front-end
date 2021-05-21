import {
    Box,
    Flex,
    Text,
    IconButton,
    InputGroup,
    InputRightElement,
    Input,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Spacer,
    Button,
    chakra,

} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon
} from '@chakra-ui/icons';
import {
    AiOutlineSearch,
} from "react-icons/ai";
import styles from '../../constants/styles';
import { useFormik } from 'formik';
import { useRecoilState } from 'recoil';
import { SearchKeyword } from '../../recoil/search';
import { useRouter } from 'next/router';
import Logo from '../Logo';
import React, { useState } from 'react';

export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
    const [OpenSearch, setOpenSearch] = useState(false);

    const [searchKeyword, setSearchKeyword] = useRecoilState(SearchKeyword);
    const router = useRouter();
    const onClick = () => {
        router.push(`/search`);
    };
    const formik = useFormik({
        initialValues: {
            keyword: searchKeyword,
        },
        onSubmit: async values => {
            setSearchKeyword(values.keyword);
            setOpenSearch(!OpenSearch)
            onClick();
        },
    });

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'90px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                // borderStyle={'solid'}
                // borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
                maxW={styles.mainMaxWidth}
                mx={'auto'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={10} h={10} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 10,lg:1 }} justify={{ base: 'left', md: 'start' }}>
                    <Button display={{ base: 'none', md: 'flex' }} variant="ghost">
                        <Link href="/">
                            <Logo w="100%" />
                        </Link>
                    </Button>

                    <Button display={{ base: 'flex', md: 'none' }} variant="ghost">
                        <Link href="/">
                            <Logo w="80%" h="80%" />
                        </Link>
                    </Button>


                    <Flex display={{ base: 'none', md: 'flex' }} w="100%" ml={5}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Flex display={{ base: 'none', md: 'flex' }} flex={{ base: 1 }} justify={{ base: 'center', md: 'end' }}>
                    <Spacer></Spacer>
                    <chakra.form w="50%" onSubmit={formik.handleSubmit}>
                        <InputGroup w="100%">
                            <InputRightElement
                                w="15%"
                                borderRadius={30}
                                bgColor="black"
                            >
                                <Button
                                    type="submit"
                                    zIndex="15"
                                    leftIcon={<AiOutlineSearch />} colorScheme="black" variant="solid">
                                </Button>
                            </InputRightElement>
                            <Input
                                id="keyword"
                                name="keyword"
                                onChange={formik.handleChange}
                                value={formik.values.keyword} bgColor="white" color="black" borderRadius={25} type="tel" placeholder="Search Keyword" />
                        </InputGroup>
                    </chakra.form>
                </Flex>

                <Stack
                    display={{ base: 'flex', md: 'none' }}
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}
                    pr={1}>
                    <IconButton
                        onClick={() => setOpenSearch(!OpenSearch)}
                        icon={
                            <AiOutlineSearch  size="md"/> 
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />

                </Stack>
            </Flex>


            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
            <Collapse in={OpenSearch} animateOpacity>
                <Box p={2} flex={{ base: 1 }} justify={{ base: 'center', md: 'end' }}>
                    <Flex>
                        <Spacer />
                        <IconButton
                        onClick={() => setOpenSearch(!OpenSearch)}
                        icon={
                            <CloseIcon />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />

                    </Flex>
                    

                    <chakra.form onSubmit={formik.handleSubmit}>
                        <InputGroup w="100%">
                            <InputRightElement
                                w="15%"
                                bgColor="black"
                            >
                                <Button
                                    type="submit"
                                    zIndex="15"
                                    leftIcon={<AiOutlineSearch />} colorScheme="black" variant="solid">
                                </Button>
                            </InputRightElement>
                            <Input
                                id="keyword"
                                name="keyword"
                                onChange={formik.handleChange}
                                value={formik.values.keyword} bgColor="white" color="black" type="tel" placeholder="Search Keyword" />
                        </InputGroup>
                    </chakra.form>
                </Box>
            </Collapse>
        </Box>

    );
}

const DesktopNav = () => {
    return (
        <Stack direction={'row'} spacing={8} pt={3}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'lg'}
                                fontWeight={800}
                                color={useColorModeValue('black', 'gray.200')}
                                _hover={{
                                    textDecoration: 'none',
                                    color: useColorModeValue('gray', 'white'),
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={useColorModeValue('white', 'gray.800')}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack >
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href }: NavItem) => {
    return (
        <Link
            href={href}
            // role={'group'}
            // display={'block'}
            p={2}
            fontWeight="bold"
            fontFamily={'heading'}
            // rounded={'md'}
            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
            <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontWeight="bold"
                color={useColorModeValue('gray.800', 'white')}>
                {label}
            </Text>

        </Link>
    );
};



const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [

    {
        label: 'HOME',
        href: '/',
    },
    {
        label: 'VIDEOS',
        href: '/videos',
    },
    {
        label: 'PLAYITRIGHT STORE',
        href: process.env.NEXT_PUBLIC_BASE_URL_SALES_PRODUCT
    },
];