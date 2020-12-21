export function validateName(name : string){
    const regName = /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/;
    return regName.test(name)
}