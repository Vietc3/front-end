import React from 'react';

import Head  from 'next/head';

class HeadCustom extends Head {
  getCssLinks(files) {
    const { assetPrefix } = this.context;
    const cssFiles =
    files && files.length ? files.filter((f) => /\.css$/.test(f)) : [];
    const cssLinkElements = [];
    cssFiles.forEach((file) => {
    cssLinkElements.push(
    <link
    key={file}
    nonce={this.props.nonce}
    rel="stylesheet"
    href={`${assetPrefix}/_next/${encodeURI(file)}`}
    crossOrigin={this.props.crossOrigin || (process).crossOrigin}
    />
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

export default HeadCustom;