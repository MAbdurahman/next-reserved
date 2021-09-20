import React, { useEffect } from 'react';
import Link from 'next/link';
import { MDBDataTable } from 'mdbreact';
import easyinvoice from 'easyinvoice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../redux/actions/bookingActions';

export default function MyBookings() {
	//**************** variables ****************//
	const dispatch = useDispatch();
	let { bookings, error } = useSelector(state => state.bookings);

	//**************** functions ****************//
	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch]);

	const setBookings = () => {
		const data = {
			columns: [
				{
					label: 'Reservation ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'Check In',
					field: 'checkIn',
					sort: 'asc',
				},
				{
					label: 'Check Out',
					field: 'checkOut',
					sort: 'asc',
				},
				{
					label: 'Amount Paid',
					field: 'amount',
					sort: 'asc',
				},
				{
					label: 'Actions',
					field: 'actions',
					sort: 'asc',
				},
			],
			rows: [],
		};

		bookings &&
			bookings.forEach(booking => {
				data.rows.push({
					id: booking._id,
					checkIn: new Date(booking.checkInDate).toLocaleString('en-US'),
					checkOut: new Date(booking.checkOutDate).toLocaleString('en-US'),
					amount: `$${booking.amountPaid}`,
					actions: (
						<>
							<Link href={`/bookings/${booking._id}`}>
								<a className='btn button-gold'>
									<i className='fa fa-eye'></i>
								</a>
							</Link>

							<button
								className='btn button-green mx-2'
								onClick={() => downloadInvoice(booking)}
							>
								<i className='fa fa-download'></i>
							</button>
						</>
					),
				});
			});

		return data;
	};

	const downloadInvoice = async booking => {
		const data = {
			documentTitle: 'Reservation Invoice', //Defaults to INVOICE
			currency: 'USD',
			taxNotation: 'vat', //vat or gst
			marginTop: 25,
			marginRight: 25,
			marginLeft: 25,
			marginBottom: 25,
			logo: 'https://res.cloudinary.com/mdbdrrhm/image/upload/v1627728092/next-reserve/miscellaneous/project-logo_yjikyh.png',
			sender: {
				company: 'e-Reserve',
				address: '1234 SomeStreet Ave. #100',
				zip: 'SomeCity',
				city: 'SomeState',
				country: '11235-3747',
			},
			client: {
				company: `${booking.user.name}`,
				address: `${booking.user.email}`,
				zip: '',
				city: `Check In: ${new Date(booking.checkInDate).toLocaleString(
					'en-US'
				)}`,
				country: `Check Out: ${new Date(
					booking.checkOutDate
				).toLocaleString('en-US')}`,
			},
			invoiceNumber: `${booking._id}`,
			invoiceDate: `${new Date(Date.now()).toLocaleString('en-US')}`,
			products: [
				{
					quantity: `${booking.daysOfStay}`,
					description: `${booking.room.name}`,
					tax: '9.25',
					price: booking.room.pricePerNight,
				},
			],
			bottomNotice:
				'An auto generated invoice of your reservation on e-Reserve.',
		};

		const result = await easyinvoice.createInvoice(data);
		easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
	};

	return (
		<div className='container container-fluid'>
			<h1 className='my-5'>My Reservations</h1>

			<MDBDataTable
				responsive
				data={setBookings()}
				className='px-3'
				bordered
				striped
				hover
			/>
		</div>
	);
}
