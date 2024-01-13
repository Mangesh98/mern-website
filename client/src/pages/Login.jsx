import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const URL = "http://localhost:5000/api/auth/login";
export const Login = () => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();
	const { storeTokenInLS } = useAuth();

	const handleInput = (e) => {
		let name = e.target.name;
		let value = e.target.value;

		setUser({
			...user,
			[name]: value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(user);
		try {
			const response = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			if (response.ok) {
				const res_data = await response.json();
				storeTokenInLS(res_data.token);
				alert("Login Successful");
				setUser({
					email: "",
					password: "",
				});
				navigate("/");
			} else {
				alert("Invalid Credential");
			}
			console.log(response);
		} catch (error) {
			console.log("Login ", error);
		}
	};
	return (
		<>
			<section>
				<main>
					<div className="section-login">
						<div className="container grid grid-two-cols">
							<div className="login-image">
								<img
									src="/images/login.png"
									alt="let's fill the login form"
									width="500"
									height="500"
								/>
							</div>
							<div className="login-form">
								<h1 className="main-heading mb-3">Login form</h1>
								<br />
								<form onSubmit={handleSubmit}>
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
										Login Now
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
