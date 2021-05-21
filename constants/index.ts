
export const NAVBAR_LINKS = [
    {
        to: '/',
        name: 'Home',
    },
    {
        to: '/',
        name: 'Magazine',
    },
    {
        to: '/',
        name: 'Sports',
    },
    {
        to: '/',
        name: 'Economy',
    },
];

export const FOOTER_LINKS = [
    {
        heading: 'About Us',
        links: [
            { href: '/', title: 'Company Profile' },
            { href: '/', title: 'Tems Of Use' },
            { href: '/', title: 'Privacy' },
        ],
    },
    {
        heading: 'Follow Us',
        links: [
            { href: '/', title: 'Facebook' },
            { href: '/', title: 'Twitter' },
            { href: '/', title: 'Instagram' },
        ],
    },
];

export const FOOTER_BOTTOM_LINKS = [
    { href: '/', title: 'Terms Of Use' },
    { href: '/', title: 'Privacy Policy' },
];

export const URL_BASE = process.env.NEXT_PUBLIC_BASE_URL;
export const URL_BASE_PRODUCT = process.env.NEXT_PUBLIC_BASE_URL_PRODUCT;
