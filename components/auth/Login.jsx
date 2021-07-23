import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/client';

import { toast } from 'react-toastify';
import ButtonLoader from "./../layout/ButtonLoader";

export default function Login() {
	//**************** variables ****************//
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);

	//**************** functions ****************//
	const submitHandler = async e => {
		e.preventDefault();

      setLoading(true);

		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});

		setLoading(false);

		if (result.error) {
			toast.error(result.error);
		} else {
			window.location.href = '/';
		}
	};
	return (
		<div className='container container-fluid'>
			<div className='row wrapper'>
				<div className='col-10 col-lg-5'>
					<form className='shadow-lg login-box' onSubmit={submitHandler}>
						<h1 className='mb-3'>Login</h1>
						<div className='form-group'>
							<label htmlFor='email_field'>Email</label>
							<input
								type='email'
								id='email_field'
								className='form-control'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='password_field'>Password</label>
							<input
								type='password'
								id='password_field'
								className='form-control'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>

						<button
							id='login_button'
							type='submit'
							className='button-3d py-3'
                     disabled={loading ? true : false}
						>
							{loading ? <ButtonLoader/> : 'Login'}
						</button>
						<div className='login-links'>
							<a href='#' className='forgot-link'>
								Forgot Password
							</a>
							&nbsp;/&nbsp;
							<a href='/register' className='register-link'>
								Register
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
