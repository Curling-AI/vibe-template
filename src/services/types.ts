// Tipos para as entidades da aplicação
export interface Clicks {
  clicks: number
}

// Tipos para respostas da API
export interface ClicksResponse {
  data: Clicks
  message: string
}
