import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";

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
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
