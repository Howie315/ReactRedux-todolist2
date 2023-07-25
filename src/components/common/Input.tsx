import React from "react";
import { TextField as MuiTextField, TextFieldProps } from "@mui/material";

const Input: React.FC<TextFieldProps> = (props) => {
	return <MuiTextField {...props} />;
};

export default Input;
