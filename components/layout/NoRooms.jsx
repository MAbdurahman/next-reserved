import React from 'react';
import Link from 'next/link';

export default function NoRooms() {
	return (
		<div className='text-center no-room-box'>
			<h2 className='no-room-text'>
				<span className='goldColor'>No</span>&nbsp;
				<span className='greenColor'>Rooms Found</span>
			</h2>
			<h3 className='no-room-subtext'>
				Try searching again and/or use different filter(s)
			</h3>
			{/* <button className='button-3d'>
				<Link href='/search'>
					<a>Search Again</a>
				</Link>
			</button> */}
		</div>
	);
}
