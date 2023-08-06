const CURREN_FORMATTER = new Intl.NumberFormat(undefined, { 
    currency: "USD", 
    style: "currency",
})

export function formatCurrency(number: number) {
    return CURREN_FORMATTER.format(number)
}