export function formatCurrency(amount: number){
    return Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(amount)
}