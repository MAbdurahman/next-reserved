import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearErrors } from './../../redux/actions/userActions';
import ButtonLoader from './../layout/ButtonLoader';

export default function Register() {
	//**************** variables ****************//
	/* const avatar_url = `https://res.cloudinary.com/mdbdrrhm/image/upload/v1627060688/next-reserve/avatars/default_avatar_zfeufh.jpg`; */
	// const default_avatar = `public/images/default-user.png`;
	const default_avatar = `public/images/profile-1.png`;
	const router = useRouter();
	const dispatch = useDispatch();
	const { success, error, loading } = useSelector(state => state.auth);
	const [avatar, setAvatar] = useState(default_avatar);
	
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		avatar,
	});

	const { name, email, password } = user;

	//**************** functions ****************//
	useEffect(() => {
		setAvatar(default_avatar);
		if (success) {
			router.push('/login');
		}

		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, success, error]);

	const submitHandler = e => {
		e.preventDefault();

		const userData = {
			name,
			email,
			password,
			avatar,
		};

		dispatch(registerUser(userData));
	};

	const onChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<div className='container container-fluid'>
			<div className='row wrapper'>
				<div className='col-10 col-lg-5'>
					<form
						className='shadow-lg register-box'
						onSubmit={submitHandler}
					>
						<h1 className='mb-3'>Register</h1>

						<div className='form-group'>
							<label htmlFor='name_field'>Full Name</label>
							<input
								type='text'
								id='name_field'
								className='form-control'
								name='name'
								value={name}
								onChange={onChange}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='email_field'>Email</label>
							<input
								type='email'
								id='email_field'
								className='form-control'
								name='email'
								value={email}
								onChange={onChange}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='password_field'>Password</label>
							<input
								type='password'
								id='password_field'
								className='form-control'
								name='password'
								value={password}
								onChange={onChange}
							/>
						</div>

						<button
							id='login_button'
							type='submit'
							className='button-3d py-3'
							disabled={loading ? true : false}
						>
							{loading ? <ButtonLoader /> : 'Register'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
