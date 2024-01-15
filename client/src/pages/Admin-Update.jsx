import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

export const AdminUpdate = () => {
	const [userData, setUserData] = useState({
		username: "",
		email: "",
		phone: "",
	});

	// lets tackle our handleInput
	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setUserData({
			...userData,
			[name]: value,
		});
	};

	// handle form getFormSubmissionInfo
	const navigate = useNavigate();
	const handleUpdate = async (e) => {
		e.preventDefault();
		// console.log(contact);
		try {
			// console.log(userData);
			const response = await fetch(
				`http://localhost:5000/api/admin/users/update/${params.id}`,
				{
					method: "PATCH",
					headers: {
						Authorization: authorizationToken,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(userData),
				}
			);
			const responseData = await response.json();
			// console.log(responseData);
			if (response.ok) {
				toast.success(responseData.message);
				// console.log(responseData);
				navigate("/admin/users");
			} else {
				toast.error("User Not Updated");
			}
			// console.log(response);
		} catch (error) {
			console.log("Login ", error);
		}
	};

	const params = useParams();
	const { authorizationToken } = useAuth();
	const getSingleUserData = async () => {
		try {
			// const { id } = useParams();
			const response = await fetch(
				`http://localhost:5000/api/admin/users/${params.id}`,
				{
					method: "GET",
					headers: {
						Authorization: authorizationToken,
					},
				}
			);
			// console.log(authorizationToken);
			if (response.ok) {
				const data = await response.json();
				setUserData(data);
				// console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getSingleUserData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<section className="section-contact">
				<div className="contact-content container">
					<h1 className="main-heading">Update user data</h1>
				</div>
				{/* contact page main  */}
				<div className="container grid grid-two-cols">
					{/* contact form content actual  */}
					<section className="section-form">
						<form onSubmit={handleUpdate}>
							<div>
								<label htmlFor="username">username</label>
								<input
									type="text"
									name="username"
									id="username"
									autoComplete="off"
									value={userData.username}
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
									value={userData.email}
									onChange={handleInput}
									required
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
									value={userData.phone}
									onChange={handleInput}
								/>
							</div>

							<div>
								<button type="submit">Update</button>
							</div>
						</form>
					</section>
				</div>
			</section>
		</>
	);
};
