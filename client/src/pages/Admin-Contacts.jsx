import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
	const [contacts, setContacts] = useState([]);

	const { authorizationToken,API } = useAuth();
	const URL = `${API}/api/admin/contacts`;
	const getAllContactsData = async () => {
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
				setContacts(data);
				// console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const deleteContact = async (id, username) => {
		const shouldDelete = window.confirm(
			`Are you sure you want to delete ${username}?`
		);
		if (shouldDelete) {
			try {
				const URL = `${API}/api/admin/contacts/delete/${id}`;
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
					getAllContactsData();
				} else {
					toast.error(message);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	useEffect(() => {
		getAllContactsData();
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
							<th>Message</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{contacts.map((curUser, index) => {
							let { username, email, message, _id } = curUser;
							return (
								<tr key={index}>
									<td>{username}</td>
									<td>{email}</td>
									<td>{message}</td>
									<td>
										<button onClick={() => deleteContact(_id, username)}>
											Delete
										</button>
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
