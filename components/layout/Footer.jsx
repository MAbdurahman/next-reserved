import React from 'react';
import Link from 'next/link';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import { Navbar, Image } from 'react-bootstrap';

export default function Footer() {
	return (
		<footer id='footer' className='footer container-fluid'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-5 col-xs-12 about-company mt-lg-3'>
						<Navbar.Brand className='navbar-brand'>
							<Image src='/images/logo.png' width='30px' height='30px' />
							<Link href='/'>
								<a className='footer-navbar-brand'>e-Reserve</a>
							</Link>
						</Navbar.Brand>
						<p className='pr-5'>
							We are a brand whose incredible family of associates put
							soul in hospitality everyday. The needs of our guests and
							associates are at the forefront of what we do. Through
							authenticity and innovation, we create good memorable
							experiences.
						</p>
						<p className='social-icons'>
							<a href='!#' className='social-icon facebook'>
								<i className='fa fa-facebook-square'></i>
							</a>
							<a href='!#' className='social-icon twitter'>
								<i className='fa fa-twitter-square'></i>
							</a>
							<a href='!#' className='social-icon instagram'>
								<i className='fa fa-instagram'></i>
							</a>
						</p>
					</div>
					<div className='col-lg-3 col-xs-12 about-links mt-lg-3'>
						<h4 className='about-links-heading'>Links</h4>
						<div className='link-container'>
							<ul className='m-0 p-0 link-list'>
								<li className='link'>
									<a href='!#'>Home</a>
								</li>
								<li className='link'>
									<a href='!#'>About</a>
								</li>
								<li className='link'>
									<a href='!#'>Team</a>
								</li>
								<li className='link'>
									<a href='!#'>Rooms</a>
								</li>
								<li className='link'>
									<a href='!#'>Contact</a>
								</li>
							</ul>
						</div>
					</div>
					<div className='col-lg-4 col-xs-12 about-location mt-lg-3'>
						<h4 className='about-location-address'>Location</h4>
						<p className='about-location-address mb-0'>
							1234 SomeStreet Avenue #100
						</p>
						<p className='about-location-item mb-1'>
							SomeCity, SomeState 11235
						</p>
						<p className='about-location-item mb-0'>
							Work-hours: 9:00am - 12:00am
						</p>
						<p className='about-location-item mb-1 link'>
							<PhoneIcon />
							<a href='tel:901-425-5525'>123-456-7890</a>
						</p>
						<p className='about-location-item mb-2 link'>
							<EmailIcon />{' '}
							<a
								href='mailto:mdbdrrhm2@gmail.com'
								target='_blank'
								rel='noreferrer'
							>
								rooms@e-reserve.com
							</a>
						</p>
					</div>
				</div>
				<div className='row'>
					<div className='col copyright'>
						<p className='copyright-item text-center link'>
							<small>
								<a href='!#' target='_blank' rel='noreferrer'>
									Terms and Conditions
								</a>
								&nbsp;|&nbsp;
								<a href='!#' target='_blank' rel='noreferrer'>
									Privacy Policy
								</a>
								<br />
							</small>
							<small className='copyright-text'>
								&copy;&nbsp;2021 e-Reserve, All rights reserved
							</small>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
