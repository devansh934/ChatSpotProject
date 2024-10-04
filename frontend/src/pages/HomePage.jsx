import {
	Box,
	Container,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react";

import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Homepage() {
	const navigate = useNavigate();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("userInfo"));
		if (user) {
			navigate("/chats");
		}
	}, [navigate]);
	
	return (
		<Container maxW="xl" centerContent>
			<Box
				display="flex"
				justifyContent="center"
				p={3}
				bg="white"
				w="100%"
				m="40px 0 15px 0"
				borderRadius="lg"
				borderWidth="1px"
			>
				<Text
					fontSize="3xl"
					as="b"
					letterSpacing={4}
					fontFamily="Poppins"
					color={"blue.800"}
					fontWeight={3}
				>
					CHATSPOT
				</Text>
			</Box>
			<Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
				<Tabs isFitted variant="soft-rounded">
					<TabList mb="1em">
						<Tab>Login</Tab>
						<Tab>Sign Up</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Login />
						</TabPanel>
						<TabPanel>
							<SignUp />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Container>
	);
}
export default Homepage;
