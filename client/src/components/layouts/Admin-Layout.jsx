import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaRegListAlt, FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
export const AdminLayout = () => {
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
								<NavLink to="/services">
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
