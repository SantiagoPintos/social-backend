import { UserToRegisterDTO, UserToLoginDTO } from "@/dtos/user.dto";

export function validateUserRegistration(data: UserToRegisterDTO):void{
    if(!data.name || !data.lastName || !data.username || !data.email || !data.password){
        throw new Error("All fields are required");
    }
    if(data.name.length < 3){
        throw new Error("Name must be at least 3 characters long");
    }
    if(data.name.includes(" ")){
        throw new Error("Name must not contain spaces");
    }
    if(data.lastName.length < 3){
        throw new Error("Last name must be at least 3 characters long");
    }
    if(data.lastName.includes(" ")){
        throw new Error("Last name must not contain spaces");
    }
    if(data.username.length < 3){
        throw new Error("Username must be at least 3 characters long");
    }
    if(data.username.includes(" ")){
        throw new Error("Username must not contain spaces");
    }
    if(data.password.length < 8){
        throw new Error("Password must be at least 8 characters long");
    }
    if(data.email.length < 8){
        throw new Error("Email must be at least 8 characters long");
    }
    if(!data.email.includes("@")){
        throw new Error("Email must contain @");
    }
    if(!data.email.includes(".")){
        throw new Error("Email must contain .");
    }
    if(data.email.includes(" ")){
        throw new Error("Email must not contain spaces");
    }
}

export function validateUserLogin(data: UserToLoginDTO):void{
    if(!data.username || !data.password){
        throw new Error("All fields are required");
    }
    if(data.password.length < 8){
        throw new Error("Password must be at least 8 characters long");
    }
    if(data.username.length < 1){
        throw new Error("Username invalid");
    }
    if(data.username.includes(" ")){
        throw new Error("Username must not contain spaces");
    }
}