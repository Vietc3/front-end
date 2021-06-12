import React, { useEffect, useMemo, useState } from 'react';
import TrendingCard from '../components/views/homepage/Trending';
import LastestCard from '../components/views/homepage/Lastest';
import { GetStaticProps } from 'next';
import { useGetArticles } from '../helpers/articles';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { Center, Button } from '@chakra-ui/react';

type Props = {
    featured?: any;
    articles?: any;
    errors?: string;
};

const IndexPage = ({ articles, featured }: Props) => {
    const [items, setItems] = useState<Array<any>>(articles);
    const [start, setStart] = useState(0);
    const [isShow, setIsShow] = useState(true);
    const defaultAticlesShowed = 10;
    const handelLoadMore = (result: any) => {
        setIsShow(false);
        setItems((pre) => {
            return [...pre, ...result];
        });
    };
    useEffect(() => {
        if (start === 0) return;
        useGetArticles(`featured=false&_sort=public_date:DESC&_start=${start}&_limit=${defaultAticlesShowed}`).then(
            (result) => {
                result.length === 0 || result.length < defaultAticlesShowed
                    ? handelLoadMore(result)
                    : setItems((pre) => {
                          return [...pre, ...result];
                      });
            },
        );
    }, [start]);

    return (
        <>
            <NextSeo
                title="Home"
                description="This is homepage of PlayIt Right Blog Store"
                canonical="https://playitright.tv/"
                openGraph={{
                    url: 'https://playitright.tv/',
                    title: 'Home',
                    description: 'This is homepage of PlayIt Right Blog Store',
                    images: [
                        {
                            url: 'https://playitright.tv/logoTV.png',
                            width: 800,
                            height: 600,
                            alt: 'Og Image Alt',
                        },
                        {
                            url: 'https://playitright.tv/logoTV.png',
                            width: 900,
                            height: 800,
                            alt: 'Og Image Alt Second',
                        },
                        { url: 'https://playitright.tv/logoTV.png' },
                        { url: 'https://playitright.tv/logoTV.png' },
                    ],
                }}
            />
            <ArticleJsonLd
                url='https://playitright.tv/'
                title="PlayItRight.tv"
                images={['https://playitright.tv/logoTV.png']}
                datePublished="01/06/2021"
                dateModified="01/06/2021"
                authorName="PlayItRight.tv"
                publisherName="PlayItRight.tv"
                publisherLogo="https://playitright.tv/logoTV.png"
                description="This is homepage of PlayIt Right Blog Store"
            />
            <TrendingCard articles={featured} />

            <LastestCard articles={items} />
            {isShow && (
                <Center h="100px" color="red">
                    <Button
                        onClick={() => setStart((pre) => pre + defaultAticlesShowed)}
                        borderRadius={30}
                        colorScheme="red"
                        variant="outline"
                    >
                        Load More
                    </Button>
                </Center>
            )}
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    const defaultAticlesShowed = 10;
    try {
        let data = await useGetArticles(
            `featured=false&_sort=public_date:DESC&_start=0&_limit=${defaultAticlesShowed}`,
        );
        let dataFeatured = await useGetArticles('featured=true');
        return { props: { articles: data, featured: dataFeatured }, revalidate: 10 };
    } catch (err) {
        return { props: { errors: err.message } };
    }
};

export default IndexPage;
