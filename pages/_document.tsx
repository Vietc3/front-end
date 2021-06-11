import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import DeferNextScript from './deferNextScript';
export default class Document extends NextDocument {
    static getInitialProps(ctx: DocumentContext) {
        return NextDocument.getInitialProps(ctx);
    }

    render() {
        return (
            <Html>
                <Head>
                <link rel="shortcut icon" href="/static/favicon.ico" />
                <script dangerouslySetInnerHTML={{ __html: `https://gist.github.com/bravetheheat/d0eeb93c15d689d769b3194629ce36ab.js` }} />
                {/* <script type="text/javascript" 
                
                src="https://gist.github.com/bravetheheat/d0eeb93c15d689d769b3194629ce36ab.js"></script> */}
                </Head>
                <body>
                    <ColorModeScript initialColorMode="light" />
                    <Main />
                   <DeferNextScript/>
                </body>
            </Html>
        );
    }
}
