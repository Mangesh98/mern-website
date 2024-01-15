import { NavLink } from "react-router-dom";
import { Analytics } from "../components/Analytics";
import { useAuth } from "../store/auth";

export const About = () => {
	const { user } = useAuth();

	return (
		<>
			<main>
				<section className="section-hero">
					<div className="container grid grid-two-cols">
						<div className="hero-content">
							{/* <p>We are the World Best IT Company</p> */}
							<p>
								Welcome,{" "}
								{user ? `${user.username} to our website` : `to our website`}
							</p>
							<h1>Why Choose Us</h1>
							<p>
								Expertise: Our team consists of experienced IT professionals who
								are passionate about staying up-to-date with the latest industry
								trends.
							</p>
							<p>
								Customization: We understand that every business is unique.
								Thats why we create solutions that are tailored to your specific
								needs and goals.
							</p>
							<p>
								Customer-Centric Approach: We prioritize your satisfaction and
								provide top-notch support to address your IT concerns.
							</p>
							<p>
								Affordability: We offer competitive pricing without compromising
								on the quality of our services.
							</p>
							<p>
								Reliability: Count on us to be there when you need us. Were
								committed to ensuring your IT environment is reliable and
								available 24/7.
							</p>
							<div className="btn btn-group">
								<NavLink to="/contact">
									<button className="btn">connect now</button>
								</NavLink>
								<NavLink to="/service">
									<button className="btn secondary-btn">learn more</button>
								</NavLink>
							</div>
						</div>

						{/* hero images  */}
						<div className="hero-image">
							<img
								src="/images/about.png"
								alt="coding together"
								width="400"
								height="500"
							/>
						</div>
					</div>
				</section>
			</main>
			{/* 2nd section  */}
			<Analytics />
		</>
	);
};
