import React from "react";
import { Box, Typography, List, TextField, Button } from "@mui/material";

const About: React.FC = () => {
	return (
		<Box
			className="todo-list-container"
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
		>
			<Typography variant="h2" component="h2" className="todo-list-title">
				About
			</Typography>
			<p>about hahahah</p>
		</Box>
	);
};

export default About;
