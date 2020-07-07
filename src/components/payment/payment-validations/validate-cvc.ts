export function validateCVC(cvc : number){
    return cvc.toString().length === 3 || cvc.toString().length === 4
}