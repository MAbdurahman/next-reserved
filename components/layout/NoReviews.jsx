import React from 'react';
import { Image } from 'react-bootstrap';

export default function NoReviews() {
	return (
		<div className='text-center no-review-box'>
			<Image
				src='images/reviews/no-reviews.jpg'
				className='no-reviews-img'
				alt='No Reviews Image'
			/>
			<h2 className='no-review-text'>
				<span className='goldColor'>No</span>{' '}
				<span className='greenColor'>Reviews</span>
			</h2>
		</div>
	);
}
