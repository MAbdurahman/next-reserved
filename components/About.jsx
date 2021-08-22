import React from 'react';
import { Image } from 'react-bootstrap';

export default function About() {
	return (
		<>
			<div id='about-page' className='container mt-3 mb-2 my-sm-5 py-3'>
				<div className='about-block'>
					<div className='about-info'>
						<h1 className='text-center mb-sm-4 mb-special'>About Us</h1>
						<p className='about-info-text'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Duis convallis velit quis sapien sollicitudin ultrices. Ut
							metus tortor, aliquet non rutrum ac, dapibus vehicula
							augue. Etiam congue erat sem, vitae gravida nunc pretium
							vitae. Fusce sed ex tellus. Quisque auctor viverra feugiat.
							Nulla urna odio, porta ut tristique ut, consequat non
							dolor. Etiam varius maximus dolor, at consectetur lectus.
							Mauris rutrum aliquet tellus, sed convallis diam.
						</p>
						<p className='about-info-text'>
							Etiam aliquam lectus eget mauris tempor fermentum. Praesent
							ac dolor quis diam ultrices commodo. Cras efficitur tellus
							ante, non facilisis justo varius vel. Maecenas aliquet
							finibus ultricies. Quisque nec est posuere, luctus orci
							suscipit, convallis lacus. Lorem ipsum dolor sit amet,
							consectetur adipiscing elit. Vivamus fermentum, ligula et
							bibendum gravida, turpis turpis imperdiet est, ac sodales
							orci ex volutpat lectus.
						</p>
						<p className='about-info-text'>
							Vivamus sit amet tortor interdum, ultricies neque eget,
							cursus massa. Ut maximus lorem in posuere luctus.
							Vestibulum imperdiet mi at orci pulvinar lobortis.
							Vestibulum finibus elementum dolor et bibendum. Donec eu
							velit dolor. Aliquam viverra maximus sapien et varius.
							Proin velit justo, fringilla vitae dui sed, vehicula
							pulvinar magna. Curabitur leo mi, sodales id lectus
							scelerisque, viverra auctor arcu. Pellentesque aliquam
							mattis tortor, quis malesuada libero posuere vel.
						</p>
					</div>
					<div className=''>
						<h2 className='text-center mb-sm-4'>Our Offices</h2>

						<div className='about-image'>
							<figure className='figure'>
								<Image
									src='images/dummy-images/building-2.jpg'
									className='figure-img img-fluid'
									alt='figure image'
								/>

								<figcaption className='figure-caption small'>
									<p className='font-italic mb-0'>
										Photo by: Photographer Name
									</p>
									<p className='mb-0'>
										Lorem ipsum dolor sit amet, consectetur adipiscing
										elit. In laoreet pellentesque lorem sed elementum.
									</p>
								</figcaption>
							</figure>
							<figure className='figure'>
								<Image
									src='images/dummy-images/building-1.jpg'
									className='figure-img img-fluid'
									alt='figure image'
								/>

								<figcaption className='figure-caption small'>
									<p className='font-italic mb-0'>
										Photo by: Photographer Name
									</p>
									<p className='mb-0'>
										Lorem ipsum dolor sit amet, consectetur adipiscing
										elit. In laoreet pellentesque lorem sed elementum.
									</p>
								</figcaption>
							</figure>
						</div>
					</div>
				</div>
				<h2 className='text-center mb-sm-4'>Our Associates</h2>
				<div className='row mb-4'>
					<div className='col-6 col-sm-4 col-lg-2 mb-3'>
						<Image
							src='images/dummy-images/lgo-1.jpg'
							className='img-fluid'
							alt='placeholder'
						/>
					</div>
					<div className='col-6 col-sm-4 col-lg-2 mb-3'>
						<Image
							src='images/dummy-images/lgo-2.jpg'
							className='img-fluid'
							alt='placeholder'
						/>
					</div>
					<div className='col-6 col-sm-4 col-lg-2 mb-3'>
						<Image
							src='images/dummy-images/lgo-3.jpg'
							className='img-fluid'
							alt='placeholder'
						/>
					</div>
					<div className='col-6 col-sm-4 col-lg-2 mb-3'>
						<Image
							src='images/dummy-images/lgo-4.jpg'
							className='img-fluid'
							alt='placeholder'
						/>
					</div>
					<div className='col-6 col-sm-4 col-lg-2 mb-3'>
						<Image
							src='images/dummy-images/lgo-5.jpg'
							className='img-fluid'
							alt='placeholder'
						/>
					</div>
					<div className='col-6 col-sm-4 col-lg-2 mb-3'>
						<Image
							src='images/dummy-images/lgo-6.jpg'
							className='img-fluid'
							alt='placeholder'
						/>
					</div>
					<div className='col-6 col-sm-4 col-lg-2 mb-3'>
						<Image
							src='images/dummy-images/lgo-7.jpg'
							className='img-fluid'
							alt='placeholder'
						/>
					</div>
					<div className='col-6 col-sm-4 col-lg-2 mb-3'>
						<Image
							src='images/dummy-images/lgo-8.jpg'
							className='img-fluid'
							alt='placeholder'
						/>
					</div>
					<div className='col-6 col-sm-4 col-lg-2 mb-3'>
						<Image
							src='images/dummy-images/lgo-9.jpg'
							className='img-fluid'
							alt='placeholder'
						/>
					</div>
					<div className='col-6 col-sm-4 col-lg-2 mb-3'>
						<Image
							src='images/dummy-images/lgo-10.jpg'
							className='img-fluid'
							alt='placeholder'
						/>
					</div>
					<div className='col-6 col-sm-4 col-lg-2 mb-3'>
						<Image
							src='images/dummy-images/lgo-11.jpg'
							className='img-fluid'
							alt='placeholder'
						/>
					</div>
					<div className='col-6 col-sm-4 col-lg-2 mb-3'>
						<Image
							src='images/dummy-images/lgo-12.jpg'
							className='img-fluid'
							alt='placeholder'
						/>
					</div>
				</div>
			</div>
		</>
	);
}
