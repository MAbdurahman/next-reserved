import React from 'react';
import { getSession } from "next-auth/client";
import Layout from '../../../components/layout/Layout';
import NewRoom from '../../../components/admin/NewRoom';

export default function NewRoomPage() {
   return (
      <Layout title='e-Reserve | New Room'>
         <NewRoom />
      </Layout>
   )
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
