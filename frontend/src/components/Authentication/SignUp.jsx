import {
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	VStack,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const toast = useToast();
	const navigate = useNavigate();

	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [confirmpassword, setConfirmpassword] = useState();
	const [password, setPassword] = useState();
	const [pic, setPic] = useState();
	const [loading, setLoading] = useState(false);

	const submitHandler = async () => {
		setLoading(true);
		if (!name || !email || !confirmpassword || !password) {
			toast({
				title: "Please fill all the fields",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
			return;
		}
		if (confirmpassword !== password) {
			toast({
				title: "Passwords do not match",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});

			return;
		}
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const { data } = await axios.post(
				"/api/user",
				{ name, email, password, pic },
				config
			);
			toast({
				title: "Registration Successful",
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});

			localStorage.setItem("userInfo", JSON.stringify(data));
			setLoading(false);
			navigate("/chats");
		} catch (error) {
			console.error(error);
			toast({
				title: "An error occured",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
		}
	};

	const postDetails = (pics) => {
		setLoading(true);
		if (pics == undefined) {
			toast({
				title: "Please select an Image",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			return;
		}
		if (
			pics.type === "image/jpeg" ||
			pics.type === "image/png" ||
			pics.type === "image/jpg"
		) {
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "chat-app");
			data.append("cloud_name", "df3p3myyr");
			fetch("https://api.cloudinary.com/v1_1/df3p3myyr/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setPic(data.url.toString());
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		} else {
			toast({
				title: "Please select an Image",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setLoading(false);
			return;
		}
	};

	return (
		<VStack spacing="5px">
			<FormControl id="first-name" isRequired>
				<FormLabel>Name</FormLabel>
				<Input
					placeholder="Enter Your Name"
					onChange={(e) => setName(e.target.value)}
				/>
			</FormControl>
			<FormControl id="email" isRequired>
				<FormLabel>Email Address</FormLabel>
				<Input
					type="email"
					placeholder="Enter Your Email Address"
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormControl>
			<FormControl id="password" isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup size="md">
					<Input
						type={show ? "text" : "password"}
						placeholder="Enter Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={handleClick}>
							{show ? "Hide" : "Show"}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<FormControl id="password" isRequired>
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup size="md">
					<Input
						type={show ? "text" : "password"}
						placeholder="Confirm password"
						onChange={(e) => setConfirmpassword(e.target.value)}
					/>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={handleClick}>
							{show ? "Hide" : "Show"}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<FormControl id="pic">
				<FormLabel>Upload your Picture</FormLabel>
				<Input
					type="file"
					p={1.5}
					accept="image/*"
					onChange={(e) => postDetails(e.target.files[0])}
				/>
			</FormControl>
			<Button
				colorScheme="blue"
				width="100%"
				style={{ marginTop: 15 }}
				onClick={submitHandler}
				isLoading={loading}
			>
				Sign Up
			</Button>
		</VStack>
	);
};
export default SignUp;
