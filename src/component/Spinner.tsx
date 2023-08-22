import "./Spinner.css";
const Spinner = () => {
    return (
        <div
            style={{
                position: "fixed",
                inset: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                zIndex: "200px",
            }}
        >
            <div className="spin"
                style={{
                    border: "5px dashed grey",
                    padding: "30px",
                    borderTopColor: "black",
                    animation: "1.5s linear infinite spinner",
                    borderRadius: "50%",
                }}
            ></div>
        </div>
    );
};

export default Spinner;
