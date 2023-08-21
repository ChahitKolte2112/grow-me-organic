import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Posts from "./pages/posts";
import Protectedpages from "./component/Protectedpages";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/post"
                        element={
                            <Protectedpages>
                                <Posts />
                            </Protectedpages>
                        }
                    />
                    <Route path="/" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
