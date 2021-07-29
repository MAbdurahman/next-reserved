import React, { useEffect } from 'react';
import Link from 'next/link';
import { MDBDataTable } from 'mdbreact';
// import easyinvoice from 'easyinvoice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../redux/actions/bookingActions';

export default function MyBookings() {
	//**************** variables ****************//
	const dispatch = useDispatch();
	const { bookings, error } = useSelector(state => state.bookings);

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
								<a className='btn btn-primary'>
									<i className='fa fa-eye'></i>
								</a>
							</Link>

							<button
								className='btn btn-success mx-2'
								onClick={() => downloadInvoice(booking)}
							>
								<i className='fa fa-download'></i>
							</button>
						</>
					),
				});
			});

			const downloadInvoice = async (booking) => {

			}

		return data;
	};
	return (
		<div className='container container-fluid'>
			<h1 className='my-5'>My Reservations</h1>

			<MDBDataTable
				data={setBookings()}
				className='px-3'
				bordered
				striped
				hover
			/>
		</div>
	);
}
