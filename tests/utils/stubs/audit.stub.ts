import { IAudit } from '@/shared/interfaces/audit-interface'

const stub = Object.freeze({
  info: jest.fn(),
  error: jest.fn(),
  alert: jest.fn()
})

export const auditStub = () => stub as IAudit
