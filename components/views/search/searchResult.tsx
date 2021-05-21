import React, { useEffect, useState } from "react";
import { Box } from '@chakra-ui/react';
import PostLastestCard from '../../cards/PostLastestCard';
import { useGetArticles } from '../../../helpers/articles';
import {useRecoilState} from 'recoil';
import {SearchKeyword} from '../../../recoil/search'
import { result } from "lodash";
type Props = {
    margin?: number;
    containerHeight?: number;
    articles?: any;
}

const SearchResult = () => {
    const [articles, setArticles] = useState([]);
    const [searchKeyword, setSearchKeyword] = useRecoilState(SearchKeyword);
    useEffect(() => {
        useGetArticles(`_q=${searchKeyword}`).then(
            (result) => {
                setArticles(result);
            }
        )
    }, [searchKeyword])

    return (

        <>
            {  articles ? <Box d="flex" flexDirection={{ base: 'column', lg: 'row' }}>
                <Box pl={{ base: '0px', lg: "70px" }}
                    pr={{ base: '0px', lg: "70px" }} d="flex" flexDirection="column" flex="4" as="section" marginY={'.7em'}>
                    {articles.map((post: any) => (
                        <Box key={post.title+'search' + post.id}>
                            <PostLastestCard post={post} />
                        </Box>
                    ))}
                </Box>
            </Box> : "No result"}

        </>
    );
};

export default SearchResult;