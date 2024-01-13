import { useState } from "react";

export const Register = () => {
	const [user, setUser] = useState({
		username: "",
		email: "",
		phone: "",
		password: "",
	});
	// Handling the input value
	const handleInput = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setUser({
			...user,
			[name]: value,
		});
	};

	//  Handling form submit
	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(user);

		try {
			const response = fetch(`http://localhost:5000/api/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			console.log(response);
		} catch (error) {
			console.log("Register", error);
		}
	};
	return (
		<>
			<section>
				<main>
					<div className="section-registration">
						<div className="container grid grid-two-cols">
							<div className="registration-image">
								<img
									src="/images/register.png"
									alt="a girl is trying to do registration"
									width="500"
									height="500"
								/>
							</div>
							<div className="registration-form">
								<h1 className="main-heading mb-3">Registration form</h1>
								<br />
								<form onSubmit={handleSubmit}>
									<div className="">
										<label htmlFor="username">username</label>
										<input
											type="text"
											name="username"
											placeholder="Enter your Username"
											autoComplete="off"
											required
											value={user.username}
											onChange={handleInput}
										/>
									</div>
									<div className="">
										<label htmlFor="email">email</label>
										<input
											type="email"
											name="email"
											placeholder="Enter your Email"
											autoComplete="off"
											required
											value={user.email}
											onChange={handleInput}
										/>
									</div>
									<div className="">
										<label htmlFor="phone">phone</label>
										<input
											type="number"
											name="phone"
											placeholder="Enter your Phone"
											autoComplete="off"
											required
											value={user.phone}
											onChange={handleInput}
										/>
									</div>
									<div className="">
										<label htmlFor="password">password</label>
										<input
											type="password"
											name="password"
											placeholder="Enter your Password"
											autoComplete="off"
											required
											value={user.password}
											onChange={handleInput}
										/>
									</div>
									<br />
									<button type="submit" className="btn btn-submit">
										Register Now
									</button>
								</form>
							</div>
						</div>
					</div>
				</main>
			</section>
		</>
	);
};
