import React from 'react';
import { getSession } from 'next-auth/client';
import BookingDetails from './../../../components/booking/BookingDetails';
import Layout from './../../../components/layout/Layout';
import { getBookingDetails } from './../../../redux/actions/bookingActions';
import { wrapper } from './../../../redux/store';

export default function BookingDetailsPage() {
	return (
		<Layout title='e-Reserve | Reservation Details'>
			<BookingDetails />
		</Layout>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ req, params, store }) => {
		const session = await getSession({ req });

		if (!session) {
			return {
				redirect: {
					destination: '/login',
					permanent: false,
				},
			};
		}

		await store.dispatch(
			getBookingDetails(req.headers.cookie, req, params.id)
		);
	}
);
