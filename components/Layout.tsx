import React from 'react';
import Head from 'next/head';
import { Box, BoxProps } from '@chakra-ui/react';
import Navbar from './navbar';
import styles from '../constants/styles';
import Footer from './Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
    title?: string;
} & BoxProps;

const Layout: React.FC<Props> = ({ children, title = 'Modern News', ...props }) => (
    <Box>
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&amp;family=Rajdhani:wght@300;400;500;600;700&amp;display=swap" data-react-helmet="true"></link>
        </Head>
        <Box fontFamily="Manrope">
            <header>
                <Navbar />
            </header>
            <Box as="main" minH={'80vh'} maxW={styles.mainMaxWidth} style={{ paddingTop: '0px !important' }} marginX="auto" {...props}>
                <ToastContainer autoClose={2000} />
                {children}
            </Box>
            <Footer />
        </Box>
    </Box >
);

export default Layout;
