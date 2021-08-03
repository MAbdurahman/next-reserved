import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { updateProfile, clearErrors } from './../../redux/actions/userActions';
import { UPDATE_PROFILE_RESET } from './../../redux/constants/userConstants';
import ButtonLoader from './../layout/ButtonLoader';
import Loader from './../layout/Loader';

export default function Profile() {
	//**************** variables ****************//
	const dispatch = useDispatch();
	const router = useRouter();
	const default_avatar =
		'https://res.cloudinary.com/mdbdrrhm/image/upload/v1627989403/next-reserve/miscellaneous/default-avatar_mee41a.png';

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = user;
	const [avatar, setAvatar] = useState('');
	const [avatarPreview, setAvatarPreview] = useState(default_avatar);

	const { user: loadedUser, loading } = useSelector(state => state.loadedUser);
	const { error, isUpdated, loading: updateLoading } = useSelector(
		state => state.user
		);
		
	//**************** functions ****************//
	useEffect(() => {
		if (loadedUser) {
			setUser({
				name: loadedUser.name,
				email: loadedUser.email,
			});
			setAvatarPreview(loadedUser.avatar.url);
		}

		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			router.push('/');
			dispatch({ type: UPDATE_PROFILE_RESET });
		}
	}, [dispatch, isUpdated, error, loadedUser]);

	const submitHandler = e => {
		e.preventDefault();

		const userData = {
			name,
			email,
			password,
			avatar,
		};

		dispatch(updateProfile(userData));
	};

	const onChangeHandler = e => {
		if (e.target.name === 'avatar') {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatar(reader.result);
					setAvatarPreview(reader.result);
				}
			};

			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	};
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className='container container-fluid'>
					<div className='row wrapper'>
						<div className='col-10 col-lg-5'>
							<form className='shadow-lg update-box' onSubmit={submitHandler}>
								<h1 className='mb-3'>Update Profile</h1>

								<div className='form-group'>
									<label htmlFor='name_field'>Name</label>
									<input
										type='text'
										id='name_field'
										className='form-control'
										name='name'
										value={name}
										onChange={onChangeHandler}
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
										onChange={onChangeHandler}
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
										onChange={onChangeHandler}
									/>
								</div>

								<div className='form-group'>
									<label htmlFor='avatar_upload'>Avatar</label>
									<div className='d-flex align-items-center'>
										<div>
											<figure className='avatar mr-3 item-rtl'>
												<img
													src={avatarPreview}
													className='rounded-circle'
													alt='image'
												/>
											</figure>
										</div>
										<div className='custom-file'>
											<input
												type='file'
												name='avatar'
												className='custom-file-input'
												id='customFile'
												accept='images/*'
												onChange={onChangeHandler}
											/>
											<label
												className='custom-file-label'
												htmlFor='customFile'
											>
												Choose Avatar
											</label>
										</div>
									</div>
								</div>

								<button
									id='login_button'
									type='submit'
									className='button-3d py-3'
									disabled={updateLoading ? true : false}
								>
									{updateLoading ? <ButtonLoader /> : 'Update'}
								</button>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
