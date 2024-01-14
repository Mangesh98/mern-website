import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

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
	useEffect(() => {
		getAllUsersData();
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
							return (
								<tr key={index}>
									<td>{curUser.email}</td>
									<td>{curUser.phone}</td>
									<td>{curUser.username}</td>
									<td>Edit</td>
									<td>Delete</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};
