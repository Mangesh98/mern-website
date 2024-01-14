import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUsers = () => {
	const [users, setUsers] = useState([]);

	const { authorizationToken } = useAuth();
	const URL = "http://localhost:5000/api/admin/users";
	const getAllUsersData = async () => {
		try {
			const response = await fetch(URL, {
				method: "GET",
				headers: {
					Authorization: authorizationToken,
				},
			});
			// console.log(authorizationToken);
			if (response.ok) {
				const data = await response.json();
				setUsers(data);
				// console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const deleteUser = async (id, username) => {
		const shouldDelete = window.confirm(
			`Are you sure you want to delete ${username}?`
		);
		if (shouldDelete) {
			try {
				const URL = `http://localhost:5000/api/admin//users/delete/${id}`;
				const response = await fetch(URL, {
					method: "DELETE",
					headers: {
						Authorization: authorizationToken,
					},
				});
				let message = await response.json();
				message = message.message;
				if (response.ok) {
					toast.success(message);
					// alert(message);
					getAllUsersData();
				} else {
					toast.error(message);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	useEffect(() => {
		getAllUsersData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<section className="admin-users-section">
				<div className="container">
					<h1>Admin Users Data</h1>
				</div>
			</section>
			<div className="container admin-users">
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{users.map((curUser, index) => {
							let { username, email, phone, _id } = curUser;
							return (
								<tr key={index}>
									<td>{email}</td>
									<td>{phone}</td>
									<td>{username}</td>
									<td>Edit</td>
									<td>
										<button onClick={() => deleteUser(_id,username)}>Delete</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};
