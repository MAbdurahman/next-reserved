import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Carousel } from 'react-bootstrap';
import { clearErrors } from './../../redux/actions/roomActions';
import RoomFeatures from './RoomFeatures';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function RoomDetails() {
	//**************** variables ****************//
	const [checkInDate, setCheckInDate] = useState();
	const [checkOutDate, setCheckOutDate] = useState();
	const dispatch = useDispatch();
	const { room, error } = useSelector(state => state.roomDetails);

	//**************** functions ****************//
	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, []);

	const onChangeHandler = (dates) => {
		const [ checkInDate, checkOutDate ] = dates;

		setCheckInDate(checkInDate);
		setCheckOutDate(checkOutDate);
	}
	return (
		<>
			<Head>
				<title>e-Reserve | {room.name}</title>
			</Head>
			<div className='container container-fluid'>
				<h2 className='mt-5'>{room.name}</h2>
				<p>{room.address}</p>

				<div className='ratings mt-auto mb-3'>
					<div className='rating-outer'>
						<div
							className='rating-inner'
							style={{ width: `${(room.ratings / 5) * 100}%` }}
						></div>
					</div>
					<span id='no_of_reviews'>({room.numOfReviews} Reviews)</span>
				</div>

				<Carousel indicators={false} hover='pause'>
					{room.images &&
						room.images.map(image => (
							<Carousel.Item key={image.public_id}>
								<div style={{ width: '100%', height: '440px' }}>
									<Image
										className='d-block m-auto'
										src={image.url}
										alt={room.name}
										layout='fill'
									/>
								</div>
							</Carousel.Item>
						))}
				</Carousel>
				<div className='row my-5'>
					<div className='col-12 col-md-6 col-lg-8'>
						<h3>Description</h3>
						<p>{room.description}</p>
						<RoomFeatures room={room} />
					</div>

					<div className='col-12 col-md-6 col-lg-4'>
						<div className='booking-card shadow-lg p-4'>
							<p className='price-per-night'>
								<b>${room.pricePerNight}</b> / night
							</p>

							<hr />

							<p className='mt-5 mb-3'>Select A Check In & Check Out Date</p>
							<DatePicker
								className='w-100 date-picker'
								selected={checkInDate}
								onChange={onChangeHandler}
								startDate={checkInDate}
								endDate={checkOutDate}
								minDate={new Date()}
								excludeDates={''}
								selectsRange
								inline
							/>

							<button className='btn btn-block py-3 button-3d'>
								Pay
							</button>
						</div>
					</div>
				</div>

				<div className='reviews w-75'>
					<h3>Reviews:</h3>
					<hr />
					<div className='review-card my-3'>
						<div className='rating-outer'>
							<div className='rating-inner'></div>
						</div>
						<p className='review_user'>by John</p>
						<p className='review_comment'>Good Quality</p>

						<hr />
					</div>

					<div className='review-card my-3'>
						<div className='rating-outer'>
							<div className='rating-inner'></div>
						</div>
						<p className='review_user'>by John</p>
						<p className='review_comment'>Good Quality</p>

						<hr />
					</div>
				</div>
			</div>
		</>
	);
}
