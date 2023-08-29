import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useLocation,
} from "react-router-dom";
import {
	Container,
	AppBar,
	Toolbar,
	Button,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemText,
	Menu,
	MenuItem,
	Hidden,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TodoList from "./feature/TodoList/presentation/TodoList";
import About from "./components/About";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.css";

function App() {
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenuClick = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<Router>
			<AppBar position="static">
				<Toolbar>
					<Hidden smUp>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="menu"
							onClick={handleMenuClick}
							className="menu-icon"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							anchorEl={document.querySelector(".menu-icon")}
							open={menuOpen}
							onClose={handleMenuClick}
							className="mobile-menu"
						>
							<MenuItem component={Link} to="/" onClick={handleMenuClick}>
								Todo List
							</MenuItem>
							<MenuItem component={Link} to="/about" onClick={handleMenuClick}>
								About
							</MenuItem>
						</Menu>
					</Hidden>
					<Hidden xsDown>
						<Button
							color="inherit"
							component={Link}
							to="/"
							className="mobile-hidden"
						>
							Todo List
						</Button>
						<Button
							color="inherit"
							component={Link}
							to="/about"
							className="mobile-hidden"
						>
							About
						</Button>
					</Hidden>
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
