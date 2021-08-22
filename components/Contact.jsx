import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useForm } from 'react-hook-form';

export default function Contact() {
	//**************** variables ****************//
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const { register, handleSubmit, errors } = useForm();

	const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/i;
	const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

	const serviceID = process.env.EMAIL_JS_SERVICE_ID;
	const templateID = process.env.EMAIL_JS_TEMPLATE_ID;
	const userID = process.env.EMAIL_JS_USER_ID;
	//**************** functions ****************//
	const sendEmail = (serviceID, templateID, variables, userID) => {
		emailjs
			.send(serviceID, templateID, variables, userID)
			.then(() => {
				setSuccessMessage('Your message was sent successfully!');
			})
			.catch(err => console.error(`EmailJS Error - ${err}`));
	};

	const onSubmit = (data, r) => {
		setIsSubmitting(true);
		setTimeout(() => {
			setName('');
			setEmail('');
			setMessage('');
			setIsSubmitting(false);
		}, 2000);
		sendEmail(
			serviceID,
			templateID,
			{
				name: data.name,
				email: data.email,
				message: data.message,
			},
			userID
		);
		r.target.reset();
	};
	return (
		<div className='container container-fluid'>
			<div className='row wrapper contact-outer'>
				<div className='col-10 col-lg-6'>
					<form
						action=''
						className='shadow-lg contact-box'
						onSubmit={handleSubmit(onSubmit)}
					>
						<h2 className='mb-3 text-center'>Contact Us</h2>
						<span className='success-message greenColor'>
							{successMessage}
						</span>
						<div className='contact_fields'>
							<input
								type='text'
								className='form-control mb-1'
								id='name_field'
								placeholder='Name*'
								value={name}
								name='name'
								onChange={e => setName(e.target.value)}
								ref={register({
									required: 'First and last name are required!',
									pattern: {
										value: name_pattern,
										message: 'Invalid First and Last Name!',
									},
								})}
							/>
							<span className='error-message'>
								{errors.name && errors.name.message}
							</span>
						</div>
						<div className='contact_fields'>
							<input
								type='text'
								className='form-control mb-1'
								id='email_field'
								placeholder='Email*'
								value={email}
								name='email'
								onChange={e => setEmail(e.target.value)}
								ref={register({
									required: 'Email address is required!',
									pattern: {
										value: email_pattern,
										message: 'Invalid Email Address!',
									},
								})}
							/>
							<span className='error-message'>
								{errors.email && errors.email.message}
							</span>
						</div>
						<div className='contact_fields'>
							<textarea
								className='form-control mb-1'
								id='message_area'
								placeholder='Message*'
								rows='3'
								data-form-field='Message'
								name='message'
								value={message}
								onChange={e => setMessage(e.target.value)}
								ref={register({
									required: 'A brief message is required!',
									minLength: {
										value: 30,
										message:
											'Your message must be at least 30 characters!',
									},
								})}
							></textarea>{' '}
							<span className='error-message'>
								{errors.message && errors.message.message}
							</span>
						</div>
						<button
							type='submit'
							className='button-3d py-2'
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Please wait...' : 'Send Mail'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
