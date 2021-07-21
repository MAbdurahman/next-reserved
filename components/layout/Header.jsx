import React from 'react';
import Link from 'next/link';

export default function Header() {
	return (
		<nav className='header navbar row justify-content-center sticky-top'>
			<div className='container'>
				<div className='col-3 p-0'>
					<div className='header navbar-brand'>
						<Link href='/'>
							<img
								src='/images/logo.png'
								alt='Logo'
								width='50px'
								height='50px'
							/>
						</Link>
						{''}
						<Link href='/'>e-Reserve</Link>
					</div>
				</div>

				<div className='col-3 mt-3 mt-md-0 text-center'>
					<Link href='/login'>
					<a className='button-3d px-4 float-right'>
						Login
					</a>
					</Link>
				</div>
			</div>
		</nav>
	);
}
