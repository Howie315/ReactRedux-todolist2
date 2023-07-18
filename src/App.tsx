import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Button } from "@mui/material";
import TodoList from "./components/TodoList";
import About from "./components/About";

function App() {
	return (
		<Router>
			<AppBar position="static">
				<Toolbar>
					<Button color="inherit" component={Link} to="/">
						Todo List
					</Button>
					<Button color="inherit" component={Link} to="/about">
						About
					</Button>
				</Toolbar>
			</AppBar>

			<Container maxWidth="sm">
				<Routes>
					<Route path="/" element={<TodoList />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
