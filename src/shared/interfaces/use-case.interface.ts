// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export interface IUseCase<T, K = void | any> {
  execute: (...args: T[]) => K
}
