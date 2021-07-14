import React from 'react';
import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

export default function Layout({
	children,
	title = 'e-Reserve | Good Memories Begin Here!',
}) {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<Header />
			{children}
			<Footer />
		</div>
	);
}
