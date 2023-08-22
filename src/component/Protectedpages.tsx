import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Protectedpages = (prop: any) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("userdetails")) {
        } else {
            navigate("/?redirect=home");
        }
    }, []);

    return <div>{prop.children}</div>;
};

export default Protectedpages;
