import React from 'react';
import { getSession } from 'next-auth/client';
import AllUsers from './../../../components/admin/AllUsers';
import Layout from './../../../components/layout/Layout';

export default function AllBookingsPage() {
	return (
		<Layout title='e-Reserve | (admin) All Users'>
			<AllUsers />
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	if (!session || session.user.role !== 'admin') {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
