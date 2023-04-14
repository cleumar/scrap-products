import { IRedisService } from '@/shared/interfaces/redis-service-interface'

const stub = Object.freeze({
  getCache: jest.fn(async () =>
    JSON.stringify([
      {
        title: 'Tamanco Vizzano Salto Médio Feminino - Roxo',
        img: 'https://static.zattini.com.br/produtos/tamanco-vizzano-salto-medio-feminino/98/2DD-6563-198/2DD-6563-198_zoom1.jpg?ts=1657396351&ims=544x',
        price: 'R$ 119,99',
        description:
          'Dê um toque de cor para suas composições sociais do dia a dia com o Tamanco Vizzano Salto Médio! Perfeito para ser usado com vestidos longos ou midi e calças de alfaiataria, o calçado desenvolvido em material sintético de alta qualidade é resistente, confortável e indispensável para o guarda-roupa. Este tamanco da Vizzano tem salto médio grosso, tiras duplas na gáspea e uma tira no mediopé, abertura frontal, bico quadrado, palmilha anatômica, leve e macia, além de solado de borracha com frisos para maior tração ao solo. Leve já o seu!',
        url: 'https://www.zattini.com.br/tamanco-vizzano-salto-medio-feminino-roxo-2DD-6563-198'
      }
    ])
  ),
  getAllKeys: jest.fn(),
  setCache: jest.fn(),
  cleanCacheKey: jest.fn(),
  cleanCache: jest.fn()
})
export const redisServiceStub = () => stub as IRedisService
