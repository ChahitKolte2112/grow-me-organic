import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Protectedpages from "./component/Protectedpages";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/home"
                        element={
                            <Protectedpages>
                                <Home />
                            </Protectedpages>
                        }
                    />
                    <Route path="/" element={<Login />} />
                    <Route path="/*" element={<h1>404 Page Not Found</h1>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
