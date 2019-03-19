import Head from 'next/head';
import * as React from 'react';

import '../styles/index.css';

interface Props {
  title: string;
  children: React.ReactNode;
}

const Layout = ({ children, title }: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </div>
  );
};

export default Layout;
