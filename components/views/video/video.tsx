import React, { useState, useEffect } from "react";
import { Box, Center, Button } from '@chakra-ui/react';
import PostLastestCard from '../../cards/PostLastestCard';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useGetArticles } from '../../../helpers/articles'
type Props = {
    margin?: number;
    containerHeight?: number;
    articles: any;
}

const VideoCard = ({
    articles,
}: Props) => {

    const [isFetching, setIsFetching] = useState(false);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 3;
    const total = articles.length;

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight)
            return;
        else {
            setPage(page + 1)
            setIsFetching(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        if (total > items.length) {

            useGetArticles(`youtube_url_ne=&_start=${limit * (page - 1)}&_limit=${limit}`).then(
                (result) => {
                    const newItem = [...items]
                    setItems(newItem.concat(result));
                    setIsFetching(false);
                }
            )
        } else setIsFetching(false);


    }, [isFetching]);



    useEffect(() => {
        useGetArticles(`youtube_url_ne=&_start=0&_limit=${limit}`).then(
            (result) => {
                setItems(result);
            }
        )
    }, [])

    return (
        <>
            <Box d="flex" flexDirection={{ base: 'column', lg: 'row' }}>
                <Box pl={{ base: '0px', lg: "70px" }}
                    pr={{ base: '0px', lg: "70px" }} d="flex" flexDirection="column" flex="4" as="section" marginY={'.7em'}>
                    {items.map((post: any) => (
                        <Box key={post.title+'videos' + post.id}>
                            <PostLastestCard post={post} />
                        </Box>
                    ))}
                </Box>
            </Box>
            {isFetching && <Center h="100px" color="black">
                <Button colorScheme="black" variant="outline">
                    Loading More
                </Button>

            </Center>}
        </>
    );
};

export default VideoCard;