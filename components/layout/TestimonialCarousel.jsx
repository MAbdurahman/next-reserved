import React from 'react';
import { Image } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


export default function TestimonialCarousel() {
	return (
		<Carousel
			showArrows={false}
			infiniteLoop={true}
			showThumbs={false}
			showStatus={false}
			autoPlay={true}
			interval={3000}
		>
			<>
				<Image
					src='images/testimonials/testimonial-1.jpg'
					alt='Male Testimonial 1'
				/>
				<div className='myCarousel'>
					<h3>Aaron Cuppari</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Debitis ratione sequi saepe dicta blanditiis, molestias eum
						excepturi quod fugiat veniam!
					</p>
				</div>
			</>
			<>
				<Image
					src='images/testimonials/testimonial-2.jpg'
					alt='Female Testimonial 2'
				/>
				<div className='myCarousel'>
					<h3>Laura Spurrier</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Debitis ratione sequi saepe dicta blanditiis, molestias eum
						excepturi quod fugiat veniam!
					</p>
				</div>
			</>
			<>
				<Image
					src='images/testimonials/testimonial-3.jpg'
					alt='Male Testimonial 3'
				/>
				<div className='myCarousel'>
					<h3>Esfir Novikov</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Debitis ratione sequi saepe dicta blanditiis, molestias eum
						excepturi quod fugiat veniam!
					</p>
				</div>
			</>
			<>
				<Image
					src='images/testimonials/testimonial-4.jpg'
					alt='Female Testimonial 4'
				/>
				<div className='myCarousel'>
					<h3>Kaitlyn Devney</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Debitis ratione sequi saepe dicta blanditiis, molestias eum
						excepturi quod fugiat veniam!
					</p>
				</div>
			</>
			<>
				<Image
					src='images/testimonials/testimonial-5.jpg'
					alt='Male Testimonial 5'
				/>
				<div className='myCarousel'>
					<h3>Gary Bauer</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Debitis ratione sequi saepe dicta blanditiis, molestias eum
						excepturi quod fugiat veniam!
					</p>
				</div>
			</>
		</Carousel>
	);
}
