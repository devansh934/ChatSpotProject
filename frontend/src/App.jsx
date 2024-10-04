import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import ChatProvider from "./context/ChatProvider";

function App() {
	return (
		<div className="App">
			<Router>
				<ChatProvider>
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/chats" element={<ChatPage />} />
					</Routes>
				</ChatProvider>
			</Router>
		</div>
	);
}

export default App;
