import { IBook } from "./book";

export interface IUser{
    id:number;
    username: string;
    password: string;
    email:string;
    image:string;
    cart:IBook[];
    }