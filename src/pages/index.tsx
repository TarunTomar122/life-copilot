import { FC, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import axios from "axios";

export const IndexPage: FC = () => {
	const [windows, setWindows] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:3001/")
			.then((response) => {
				console.log("here we have the response", response.data);
				setWindows(response.data);
			})
			.catch((er) => {
				console.log("here we get some error", er);
			});
	}, []);

	return (
		<Layout>
			<div className="p-8">
				{windows.length > 0 && (
					<div>
						<h1>List of all Chrome Windows</h1>
						{windows.map((window, i) => {
							return (
								<div
									className="border-4 border-sky-500 my-4 p-4"
									onClick={() => {
										axios({
											method: "post",
											url: "http://localhost:3001/open_a_group",
											data: {
												targetWindowTitle: window,
											},
										});
									}}
								>
									<h2>{window}</h2>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</Layout>
	);
};

