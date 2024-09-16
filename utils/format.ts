import moment from "moment"

export function formatDate(data:string){
    const date = moment(data).format("DD/MM/YYYY")
    if(date =="Invalid date"){
        return "Não Informado"
    } 
    return date
}

export function formatCnpj(cnpj:string){
   return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
}

export function formatCurrency(valor:number){
    return valor.toLocaleString('pt-BR',{style:"currency",currency: 'BRL' })
}

export function formatCnpjInput(cnpj:string){
    return cnpj.replace(/[\.\-\/]/g, '')
}
export function formatCep(cep:string){
    return "CEP "+cep.replace(/^(\d{2})(\d{3})(\d{3})/, "$1$2-$3")
}