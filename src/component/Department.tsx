import React, { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import uparrow from "../assets/uparrow.png";
import downarrow from "../assets/downarrow.png";
interface DepartmentType {
    department: string;
    sub_departments: string[];
}

interface DepartmentCheck {
    department: string;
    sub_departments: string[];
    parent: boolean;
    child: boolean[];
    open: boolean;
}
const data: DepartmentType[] = [
    {
        department: "customer_service",
        sub_departments: ["support", "customer_success"],
    },
    {
        department: "design",
        sub_departments: ["graphic_design", "product_design", "web_design"],
    },
];

const Department = () => {
    const [departmentCheckBox, setDepartmentCheckBox] = useState<
        DepartmentCheck[]
    >([]);

    const [tampo, setTampo] = useState<boolean>(false);
    const [departmentData, setDepartmenData] = useState<DepartmentType[]>(data);
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => {
        const initBool = () => {
            let temp: DepartmentCheck[] = [];
            for (let i = 0; i < data.length; i++) {
                let obj: DepartmentCheck = {
                    department: data[i].department,
                    sub_departments: data[i].sub_departments,
                    parent: false,
                    child: [],
                    open: false,
                };
                for (let j = 0; j < data[i].sub_departments.length; j++) {
                    obj.child.push(false);
                }
                temp.push(obj);
            }

            setDepartmentCheckBox(temp);
        };
        initBool();

        setTampo(true);
    }, []);

    const parentClickHandler = (idx: number, prev: boolean) => {
        let temp2: DepartmentCheck[] = departmentCheckBox.map(
            (item: DepartmentCheck, index: number) => {
                if (index === idx) {
                    let child: boolean[] = [];
                    for (let i = 0; i < item.child.length; i++)
                        child.push(!prev);

                    let item1: DepartmentCheck = { ...item, child: child };
                    return { ...item1, parent: !prev };
                } else {
                    return item;
                }
            }
        );
        setDepartmentCheckBox(temp2);
    };

    const childClickHandler: any = (idx: number, idx1: number) => {
        let temp2: DepartmentCheck[] = departmentCheckBox.map(
            (item: DepartmentCheck, index: number) => {
                if (index == idx) {
                    let childArr: boolean[] = item.child.map(
                        (ch: boolean, index1: number) => {
                            if (index1 == idx1) {
                                return !ch;
                            } else {
                                return ch;
                            }
                        }
                    );
                    return { ...item, child: childArr };
                } else return item;
            }
        );

        let temp3: DepartmentCheck[] = temp2.map(
            (item: DepartmentCheck, index: number) => {
                if (index == idx) {
                    let count: number = 0;

                    for (let i = 0; i < item.child.length; i++) {
                        if (item.child[i] == true) count += 1;
                    }
                    if (item.parent === true) {
                        return { ...item, parent: false };
                    }
                    if (count == item.child.length) {
                        return { ...item, parent: true };
                    }
                    return item;
                } else {
                    return item;
                }
            }
        );
        setDepartmentCheckBox(temp3);
    };
    const handleOpen = (idx: number) => {
        let temp2: DepartmentCheck[] = departmentCheckBox.map(
            (item: DepartmentCheck, index: number) => {
                if (index == idx) {
                    return { ...item, open: !item.open };
                } else {
                    return item;
                }
            }
        );
        setDepartmentCheckBox(temp2);
    };

    return (
        <>
            <Box>
                {
                    <div
                        style={{
                            padding: "25px",
                            width: "40%",
                            backgroundColor: "white",
                        }}
                    >
                        {departmentCheckBox.length > 0 &&
                            departmentCheckBox.map(
                                (value: DepartmentCheck, idx: number) => {
                                    return (
                                        <div
                                            key={idx}
                                            style={{
                                                marginBottom: "30px",
                                            }}
                                        >
                                            <div style={{ display: "flex" }}>
                                                <img
                                                    src={`${value.open}=== true ? ${uparrow}:${downarrow}`}
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                        marginBottom: "-30px",

                                                        cursor: "pointer",
                                                    }}
                                                    alt="loading"
                                                    onClick={() => {
                                                        handleOpen(idx);
                                                    }}
                                                />{" "}
                                                <Checkbox
                                                    sx={{ marginTop: "-10px" }}
                                                    checked={value?.parent}
                                                    onChange={() =>
                                                        parentClickHandler(
                                                            idx,
                                                            value.parent
                                                        )
                                                    }
                                                ></Checkbox>
                                                <p
                                                    style={{
                                                        cursor: "pointer",
                                                        marginTop: "0px",
                                                    }}
                                                >
                                                    {value?.department}
                                                </p>
                                            </div>
                                            {value.open && (
                                                <div
                                                    style={{
                                                        marginLeft: "40px",
                                                    }}
                                                >
                                                    {value?.sub_departments.map(
                                                        (
                                                            value1: string,
                                                            idx1: number
                                                        ) => {
                                                            return (
                                                                <div
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                    }}
                                                                >
                                                                    <Checkbox
                                                                        checked={
                                                                            value
                                                                                ?.child[
                                                                                idx1
                                                                            ]
                                                                        }
                                                                        onChange={() => {
                                                                            childClickHandler(
                                                                                idx,
                                                                                idx1
                                                                            );
                                                                        }}
                                                                    ></Checkbox>
                                                                    <p
                                                                        style={{
                                                                            cursor: "pointer",
                                                                        }}
                                                                    >
                                                                        {value1}
                                                                    </p>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }
                            )}
                    </div>
                }
            </Box>
        </>
    );
};

export default Department;
