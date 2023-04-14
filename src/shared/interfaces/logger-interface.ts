export interface ILogger {
  debug: (primaryMessage: string, complement?: any) => Promise<void>
  warn: (primaryMessage: string, complement?: any) => Promise<void>
  error: (primaryMessage: string, complement?: any) => Promise<void>
  info: (primaryMessage: string | null, complement?: any) => Promise<void>
}
