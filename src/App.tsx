import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import Posts from "./pages/Home";
import Protectedpages from "./component/Protectedpages";
import Spinner from "./component/Spinner";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/home"
                        element={
                            <Protectedpages>
                                <Posts />
                            </Protectedpages>
                        }
                    />
                    <Route path="/" element={<Login />} />
                    <Route path="/spinner" element={<Spinner />} />
                
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
