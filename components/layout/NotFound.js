import React from 'react';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='page-not-found-wrapper'>
			<h1 id='title_404'>404</h1>
			<h2 id='description_404'>Page Not Found!</h2>
			<button className='button-3d'>
				<Link href='/'>
					<a>Go to Home</a>
				</Link>
			</button>
		</div>
	);
}
