export interface IAudit {
  info: (comment: string, complement?: any) => Promise<void>

  error: (comment: string, complement?: any) => Promise<void>
}
