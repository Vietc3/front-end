import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import { compact, flatten } from 'lodash';

class HeadCustom extends Head {
    // https://github.com/zeit/next.js/blob/d467e040d51ce1f8d2bf050d729677b6dd99cb96/packages/next/pages/_document.tsx#L187
    getCssLinks(files) {
        const { assetPrefix } = this.context;
        const cssFiles = files && files.allFiles && files.allFiles.length ? files.allFiles.filter((f) => /\.css$/.test(f)) : [];
        const cssLinkElements = [];
        cssFiles.forEach((file) => {
            cssLinkElements.push(
                <link
                    key={file}
                    nonce={this.props.nonce}
                    rel="stylesheet"
                    href={`${assetPrefix}/_next/${encodeURI(file)}`}
                    crossOrigin={this.props.crossOrigin || process ? process.crossOrigin : false}
                />,
            );
        });

        return cssLinkElements.length === 0 ? null : cssLinkElements;
    }

    getPreloadMainLinks() {
        return [];
    }

    getPreloadDynamicChunks() {
        return [];
    }
}

class NextScriptCustom extends NextScript {
    render() {
      const orgNextScripts = flatten(super.render().props.children);
  
      const scripts = compact(
        orgNextScripts.map((child) => {
          if (child.props.id === '__NEXT_DATA__') {
            return {
              props: { ...child.props },
              content: child.props.dangerouslySetInnerHTML.__html
            };
          }
  
          if (child?.type === 'script') {
            return {
              props: { ...child.props },
              content: ''
            };
          }
  
          return null;
        })
      );
  
      const initialFilterer = props => !props.src || !props.src.includes('chunk');
      const initialLoadScripts = scripts.filter(({ props }) => initialFilterer(props));
      const chunkedScripts = scripts.filter(({ props }) => !initialFilterer(props));
  
      const jsContent = `
        var chunkedScripts = ${JSON.stringify(chunkedScripts)};
        setTimeout(() => {
          chunkedScripts.map((script) => {
            if (!script || !script.props) return;
            try {
              var scriptTag = document.createElement('script');
    
              scriptTag.src = script.props.src;
              scriptTag.async = script.props.async;
              scriptTag.defer = script.props.defer;
              
              if (script.props.id) scriptTag.id = script.props.id;
              if (script.content) scriptTag.innerHTML = script.content;
              document.body.appendChild(scriptTag);
            }
            catch(err) {
              console.log(err);
            }
          });
        // 1800ms seems like when PageSpeed Insights stop waiting for more js       
        }, 1800);
      `;
  
      return (
        <>
          {initialLoadScripts.map(({ props }) => (
            <script key={props.id} {...props} src={props.src} />
          ))}
  
          <script id="__NEXT_SCRIPT_CUSTOM" defer dangerouslySetInnerHTML={{ __html: jsContent }} />
        </>
      );
    }
  }
export default class Document extends NextDocument {
    static getInitialProps(ctx: DocumentContext) {
        return NextDocument.getInitialProps(ctx);
    }

    render() {
        return (
            <Html>
                <HeadCustom>
                <link rel="shortcut icon" href="/static/favicon.ico" />
                </HeadCustom>
                <body>
                    <ColorModeScript initialColorMode="light" />
                    <Main />
                   <NextScriptCustom/>
                </body>
            </Html>
        );
    }
}
