import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import React from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import HeadCustom  from './headCustom';
// import NextScriptCustom  from './nextScriptCustom';
import { compact, flatten } from 'lodash';
export  class NextScriptCustom extends NextScript {
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
                    <NextScriptCustom />
                </body>
            </Html>
        );
    }
}
