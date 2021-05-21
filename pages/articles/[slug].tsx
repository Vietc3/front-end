import { GetStaticProps } from 'next';
import Article from '../../components/views/article/Article'
import { Post } from '../../interfaces';
import { useGetAllArticles, useGetArticleById, useGetArticles } from '../../helpers/articles';
import NextStories from '../../components/views/article/NextStories'
import { NextSeo, ArticleJsonLd } from 'next-seo'
import Products from '../../components/views/article/Products';
import { useState, useEffect } from 'react';
import { useGetProductById } from '../../helpers/product';
import { getProductIds } from '../../helpers/commonFuction';
type Props = {
    article?: any;
    articlesNextStories?: any;
    morePosts?: Post[];
    errors?: string;
};

const PostDetail = ({ article, articlesNextStories }: Props) => {
    const [products, setProducts] = useState<Array<any>>([]);
    const productIds = getProductIds(article.products_relative);
    useEffect(() => {
        const result = productIds.map((id: string) => {
                return useGetProductById(id)         
        })
        Promise.all(result).then(res=>setProducts(res))
    },[])  
    return (
        <>
            <NextSeo
                title={article.title}
                description={article.summary}
                canonical={process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/articles/${article.id}`}
                openGraph={{
                    url: process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/articles/${article.id}`,
                    title: article.title,
                    description: article.summary,
                    images: [
                        {
                            url: process.env.NEXT_PUBLIC_BASE_URL + `${article.hero_desktop.url}`,
                            width: 800,
                            height: 600,
                            alt: 'Og Image Alt',
                        },
                        {
                            url: process.env.NEXT_PUBLIC_BASE_URL + `${article.hero_desktop.url}`,
                            width: 900,
                            height: 800,
                            alt: 'Og Image Alt Second',
                        },
                        { url: process.env.NEXT_PUBLIC_BASE_URL + `${article.hero_desktop.url}`, },
                        { url: process.env.NEXT_PUBLIC_BASE_URL + `${article.hero_desktop.url}`, },
                    ],
                }}
            />
            <ArticleJsonLd
                url={process.env.NEXT_PUBLIC_BASE_URL_CLIENT + `/articles/${article.id}`}
                title={article.title}
                images={[
                    process.env.NEXT_PUBLIC_BASE_URL + `${article.hero_desktop.url}`
                ]}
                datePublished={article.published_at}
                dateModified={article.createdAt}
                authorName={article.author}
                publisherName={article.author}
                publisherLogo= {process.env.NEXT_PUBLIC_BASE_URL + `${article.hero_desktop.url}`}
                description="This is a mighty good description of this article."
            />
            <Article article={article} />
            <NextStories articles={articlesNextStories} />
            <Products products={products}/>
        </>
    );
};

export default PostDetail;

export async function getStaticPaths() {
    let data = await useGetAllArticles();
    const paths = data.map((article: any) => {
        return {
            params: {
                slug: article.id.toString()
            }
        }
    })
    return { paths, fallback: false }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const slug = params?.slug;
        let data = await useGetArticleById(slug);
        let dataNextStories = await useGetArticles(`id_ne=${slug}&_sort=public_date:DESC&_limit=2`);
        return { props: { article: data, articlesNextStories: dataNextStories }, revalidate: 10 };
    } catch (err) {
        return { props: { errors: err.message } };
    }
};