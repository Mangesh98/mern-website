import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaHome, FaRegListAlt, FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
export const AdminLayout = () => {
	const { user, isLoading } = useAuth();
	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	if (!user.isAdmin) {
		toast.error("Not valid user !");
		// console.log(user);
		return <Navigate to="/a" />;
	}
	return (
		<>
			<header>
				<div className="container">
					<nav>
						<ul>
							<li>
								<NavLink to="/admin/users">
									<FaUser /> Users
								</NavLink>
							</li>
							<li>
								<NavLink to="/admin/contacts">
									<FaRegListAlt />
									Contacts
								</NavLink>
							</li>
							<li>
								<NavLink to="/service">
									<FaMessage /> Services
								</NavLink>
							</li>
							<li>
								<NavLink to="/">
									<FaHome />
									Home
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			<Outlet />
		</>
	);
};
