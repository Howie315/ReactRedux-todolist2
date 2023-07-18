import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useLocation,
} from "react-router-dom";
import { Container, AppBar, Toolbar, Button } from "@mui/material";
import TodoList from "./components/TodoList";
import About from "./components/About";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.css";

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

			<AnimatedRoutes />
		</Router>
	);
}

function AnimatedRoutes() {
	const location = useLocation();
	return (
		<Container maxWidth="sm">
			<TransitionGroup>
				<CSSTransition key={location.key} classNames="fade" timeout={300}>
					<Routes location={location}>
						<Route path="/" element={<TodoList />} />
						<Route path="/about" element={<About />} />
					</Routes>
				</CSSTransition>
			</TransitionGroup>
		</Container>
	);
}

export default App;
