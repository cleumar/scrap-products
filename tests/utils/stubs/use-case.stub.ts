import { IUseCase } from '@/shared/interfaces/use-case.interface'

const stub = Object.freeze({
  execute: jest.fn()
})

export const useCaseStub = () => stub as IUseCase<any>
