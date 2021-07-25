import React from 'react';

export default function Loader() {
	return (
		<div className='d-flex justify-content-center center-loader'>
			<div className='lds-ellipsis'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
