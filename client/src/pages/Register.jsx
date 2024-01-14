import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/auth/register";
export const Register = () => {
	const [user, setUser] = useState({
		username: "",
		email: "",
		phone: "",
		password: "",
	});

	const navigate = useNavigate();
	const {storeTokenInLS} = useAuth();

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
			const res_data = await response.json();
			// console.log(res_data);
			if (response.ok) {
				storeTokenInLS(res_data.token);
				toast.success("Registration Successful");
				setUser({
					username: "",
					email: "",
					phone: "",
					password: "",
				});

				navigate("/login");
			} else {
				toast(res_data.extraDetails ? res_data.extraDetails:res_data.message);
			}
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
