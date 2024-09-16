import { Cnpj } from "@/utils/interfaces";
import { StyleSheet,Text, ScrollView, View } from "react-native";
import { formatCurrency, formatCnpj, formatDate, formatCep } from "@/utils/format";
import { CnpjItem } from "./CnpjItem";
import { CnpjItemGroup } from "./CnpjItemGroup";

export default function CnpjForm(cnpj:Cnpj) {   
  if(cnpj.e){  
    return (
      <ScrollView> 
        <Text style={styles.title}>Dados da Pessoa Jurídica</Text>
        <CnpjItemGroup itens={[
          {itemTitle: "Razão Social",item: cnpj.e.empresa.razao_social},
          {itemTitle: "Porte",item: cnpj.e.empresa.porte_empresa}]}
        />
       <CnpjItemGroup itens={[
          {itemTitle: "CNPJ",item: formatCnpj(cnpj.e.cnpj)},
          {itemTitle: "Estabelecimento",item: cnpj.e.identificador_matriz_filial.descricao},
          {itemTitle: "Data Abertura",item: formatDate(cnpj.e.data_inicio_atividade)}]}
        />
        <CnpjItemGroup itens={[
          {itemTitle: "Natureza Jurídica",item: cnpj.e.empresa.natureza_juridica.descricao},
          {itemTitle: "Nome Fantasia",item: cnpj.e.nome_fantasia}]}
        /> 
        <CnpjItemGroup itens={[
          {itemTitle: "Sit. Cadastral",item: cnpj.e.situacao_cadastral.descricao},
          {itemTitle: "Data",item: formatDate(cnpj.e.data_situacao_cadastral)},
          {itemTitle: "Sit. Especial",item: cnpj.e.situacao_especial},
          {itemTitle: "Data",item: formatDate(cnpj.e.data_situacao_especial)}]}
        /> 
        <CnpjItem itemTitle="Motivo Situação Cadastral" item={cnpj.e.motivo_situacao_cadastral.descricao}/>
        <CnpjItem itemTitle="Endereço" item={cnpj.e.tipo_logradouro + " " + cnpj.e.logradouro + ", " +cnpj.e.numero + " "+ cnpj.e.complemento + ", " + cnpj.e.bairro + ", " + formatCep(cnpj.e.cep) + " - " + cnpj.e.municipio.descricao}/>
        <CnpjItemGroup itens={[
          {itemTitle: "E-mail",item: cnpj.e.correio_eletronico},
          {itemTitle: "Telefone",item: cnpj.e.telefone_1}]}
        /> 
        <CnpjItem itemTitle="Atividade Econômica Principal" item={cnpj.e.cnae_fiscal_principal.descricao}/> 
        <CnpjItem itemTitle="Atividades Econômicas Secundárias"item={cnpj.cnaes}/> 
        
      
      
        <Text style={styles.title}>Quadro Social</Text>
        <CnpjItem itemTitle="Capital Social" item={formatCurrency(cnpj.e.empresa.capital_social)}/>
        <CnpjItem itemTitle="Sócios" item={cnpj.e.empresa.socios}/>
      </ScrollView>
    );
  }else return
}
  const styles = StyleSheet.create({
    title:{
        fontWeight:'800',
        lineHeight:25,
        fontSize:20,
        margin:10
    },
  })