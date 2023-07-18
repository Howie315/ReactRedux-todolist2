import { Transition } from "react-transition-group";

// Transition styles
const transitionStyles = {
	entering: { transform: "translateX(100%)" },
	entered: { transform: "translateX(0)" },
	exiting: { transform: "translateX(-100%)" },
	exited: { transform: "translateX(-100%)" },
};

const duration = 300;

const SlideTransition = ({ in: inProp, children }) => (
	<Transition in={inProp} timeout={duration}>
		{(state) => (
			<div
				style={{
					...transitionStyles[state],
					transition: `transform ${duration}ms ease-in-out`,
				}}
			>
				{children}
			</div>
		)}
	</Transition>
);

export default SlideTransition;
