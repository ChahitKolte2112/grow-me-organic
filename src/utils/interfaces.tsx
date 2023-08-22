export interface PostData {
    userId: string;
    id: string;
    title: string;
    body: string;
}
export interface Person {
    name: string;
    email: string;
    mobilenumber: string;
}

export interface FormData {
    email: string;
    name: string;
    mobilenumber: string;
}

export interface ErrorForm {
    email: boolean;
    name: boolean;
    mobilenumber: boolean;
}
