import { MaterialIcons } from "@expo/vector-icons"
import { ImageSourcePropType, TextInputProps, TouchableOpacityProps } from "react-native"
import { MaskInputProps } from "react-native-mask-input"


export enum UserRole{
  ADMIN,USER
}
export interface CustomDrawerItemProps{
  label:string
  onPress:()=>void
  iconName:keyof typeof MaterialIcons.glyphMap
  index:number
  props:any
}
export interface InputGroupProps extends TextInputProps {
  label:string  
}
export interface SocialLoginButtonProps extends TouchableOpacityProps{
  icon: ImageSourcePropType
}
export interface SearchInputProps extends MaskInputProps{
  onPress: () => void
}
export interface CnpjItemProps{
  itemTitle:string
  item: any |null
}
export interface CnpjItemGroupProps{
  itens: CnpjItemProps[]
 }
export interface CnpjDataObj{
  codigo:string |number
  descricao:string
}
export interface Socio{
  cnpj_basico:string
  cpf_cnpj_socio:string
  data_entrada_sociedade:string
  faixa_etaria:CnpjDataObj
  id:number
  identificador_socio:CnpjDataObj
  nome_do_representante:string
  nome_socio_razao_social:string
  pais: string
  qualificacao_representante_legal:CnpjDataObj
  qualificacao_socio:CnpjDataObj
  representante_legal:string
  isActive:boolean
}
export interface Empresa{
  capital_social:number
  cnpj_basico:string
  ente_federativo_responsavel:string
  natureza_juridica:CnpjDataObj
  porte_empresa:CnpjDataObj
  qualificacao_responsavel:CnpjDataObj
  razao_social:string
  socios:Socio[]
}


export interface Cnpj{
 e:Estabelecimento
 cnaes:CnpjDataObj[]
}

export interface Estabelecimento{
  bairro:string
  cep:string
  cnae_fiscal_principal:CnpjDataObj
  cnpj:string
  complemento:string
  correio_eletronico:string
  data_inicio_atividade:string
  data_situacao_cadastral:string
  data_situacao_especial:string
  ddd_1:string
  ddd_2:string
  ddd_fax:string
  empresa:Empresa
  fax:string
  identificador_matriz_filial:CnpjDataObj
  logradouro:string
  motivo_situacao_cadastral:CnpjDataObj
  municipio:CnpjDataObj
  nome_cidade_exterior:string
  nome_fantasia:string
  numero:string
  pais:CnpjDataObj
  simples:string
  situacao_cadastral:CnpjDataObj
  situacao_especial:string
  telefone_1:string
  telefone_2:string
  tipo_logradouro:string
  uf:string
}
export interface GoogleData{
  email: string
  family_name: string
  given_name: string
  id: string
  name: string
  picture: string
  verified_email: boolean
}
export interface FaceBookData{
  id: string
  name: string
  picture: {
    data:{
      height:number
      is_silhouette:false
      url: string
      width: number
    }
  }
}
export interface UserContext {
  token?:string
  googleData?:GoogleData
  facebookData?:FaceBookData
  isLoading:boolean
  cnpj:Cnpj
  signIn: (email: string, password: string) => void
  signInWithGoogle: () => void
  signInWithFacebook: () => void
  register:(user: string, password: string, role:UserRole) =>void
  searchCnpj:(cnpj:string) => Promise<void>
  signOut:() => void,
}
