import { UserDTO } from "@/dtos/user.dto";
import UserDataIncompleteError from "@/errors/User/UserDataIncompleteError";

export function validateUserRegistration(data: UserDTO):void{
    if(!data.name || !data.lastName || !data.username || !data.email || !data.password){
        throw new UserDataIncompleteError("All fields are required");
    }
    if(data.name.length < 3){
        throw new UserDataIncompleteError("Name must be at least 3 characters long");
    }
    if(data.name.includes(" ")){
        throw new UserDataIncompleteError("Name must not contain spaces");
    }
    if(data.lastName.length < 3){
        throw new UserDataIncompleteError("Last name must be at least 3 characters long");
    }
    if(data.lastName.includes(" ")){
        throw new UserDataIncompleteError("Last name must not contain spaces");
    }
    if(data.username.length < 3){
        throw new UserDataIncompleteError("Username must be at least 3 characters long");
    }
    if(data.username.includes(" ")){
        throw new UserDataIncompleteError("Username must not contain spaces");
    }
    if(data.password.length < 8){
        throw new UserDataIncompleteError("Password must be at least 8 characters long");
    }
    if(data.email.length < 8){
        throw new UserDataIncompleteError("Email must be at least 8 characters long");
    }
    if(!data.email.includes("@")){
        throw new UserDataIncompleteError("Email must contain @");
    }
    if(!data.email.includes(".")){
        throw new UserDataIncompleteError("Email must contain .");
    }
    if(data.email.includes(" ")){
        throw new UserDataIncompleteError("Email must not contain spaces");
    }
}

export function validateUserLogin(data: UserDTO):void{
    if(!data.username || !data.password){
        throw new UserDataIncompleteError("All fields are required");
    }
    if(data.password.length < 8){
        throw new UserDataIncompleteError("Password must be at least 8 characters long");
    }
    if(data.username.length < 1){
        throw new UserDataIncompleteError("Username invalid");
    }
    if(data.username.includes(" ")){
        throw new UserDataIncompleteError("Username must not contain spaces");
    }
}