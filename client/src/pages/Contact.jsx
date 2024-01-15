import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Contact = () => {
	const [contact, setContact] = useState({
		username: "",
		email: "",
		message: "",
	});
	const [userData, setUserData] = useState(true);
	const { user,API } = useAuth();

	const URL = `${API}/api/form/contact`;
	// console.log(user.user);

	if (user && userData) {
		setContact({ username: user.username, email: user.email, message: "" });
		setUserData(false);
	}

	// lets tackle our handleInput
	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setContact({
			...contact,
			[name]: value,
		});
	};

	// handle form getFormSubmissionInfo
	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(contact);
		try {
			const response = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(contact),
			});
			const responseData = await response.json();
			// console.log(responseData);
			if (response.ok) {
				setContact({
					...contact,
					message: "",
				});
				toast.success(responseData.message);
				// console.log(responseData);
			} else {
				toast.error(
					responseData.extraDetails
						? responseData.extraDetails
						: responseData.message
				);
			}
			// console.log(response);
		} catch (error) {
			console.log("Login ", error);
		}
	};

	return (
		<>
			<section className="section-contact">
				<div className="contact-content container">
					<h1 className="main-heading">contact us</h1>
				</div>
				{/* contact page main  */}
				<div className="container grid grid-two-cols">
					<div className="contact-img">
						<img src="/images/support.png" alt="we are always ready to help" />
					</div>

					{/* contact form content actual  */}
					<section className="section-form">
						<form onSubmit={handleSubmit}>
							<div>
								<label htmlFor="username">username</label>
								<input
									type="text"
									name="username"
									id="username"
									autoComplete="off"
									value={contact.username}
									onChange={handleInput}
									required
								/>
							</div>

							<div>
								<label htmlFor="email">email</label>
								<input
									type="email"
									name="email"
									id="email"
									autoComplete="off"
									value={contact.email}
									onChange={handleInput}
									required
								/>
							</div>

							<div>
								<label htmlFor="message">message</label>
								<textarea
									name="message"
									id="message"
									autoComplete="off"
									value={contact.message}
									onChange={handleInput}
									required
									cols="30"
									rows="6"
								></textarea>
							</div>

							<div>
								<button type="submit">submit</button>
							</div>
						</form>
					</section>
				</div>

				<section className="mb-3">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.3459551386136!2d73.83420907597024!3d18.467982270776986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf8d94414f8f%3A0xc6091a80e79be235!2sSinhgad%20College%20of%20Engineering%2C%20Pune!5e0!3m2!1sen!2sin!4v1705071314069!5m2!1sen!2sin"
						width="100%"
						height="450"
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					></iframe>
				</section>
			</section>
		</>
	);
};
