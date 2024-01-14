import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Error } from "./pages/Error";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/service" element={<Service />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="*" element={<Error />} />
					<Route path="/admin" element={<AdminLayout />}>
						<Route path="users" element={<AdminUsers />} />
						<Route path="contacts" element={<AdminContacts />} />
					</Route>
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default App;
