import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState("");

	//function to stored the token in local storage
	const storeTokenInLS = (serverToken) => {
		setToken(serverToken);
		return localStorage.setItem("token", serverToken);
	};

	//   this is the get the value in either true or false in the original state of token
	let isLoggedIn = !!token;
	// console.log("token", token);
	// console.log("isLogged ", isLoggedIn);

	//   to check whether is loggedIn or not
	const LogoutUser = () => {
		setToken("");
		return localStorage.removeItem("token");
	};

	// JWT AUTHENTICATION - to get the currently loggedIN user data

	const userAuthentication = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/auth/user", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const data = await response.json();

				// our main goal is to get the user data 👇
				setUser(data.userData);
				// console.log(data.userData);
			} else {
				console.error("Error fetching user data");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		userAuthentication();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, storeTokenInLS, LogoutUser, user }}
		>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const authContextValue = useContext(AuthContext);
	if (!authContextValue) {
		throw new Error("useAuth used outside of the Provider");
	}
	return authContextValue;
};
