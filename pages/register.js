import Register from "./../components/auth/Register";
import Layout from "./../components/layout/Layout";
import { getSession } from "next-auth/client";

export default function RegisterPage() {
   return (
		<Layout title='e-Reserve | Register'>
			<Register />
		</Layout>
	);
}
