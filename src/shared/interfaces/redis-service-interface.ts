export interface IRedisService {
  getCache: (key: string) => Promise<any>
  getAllKeys: () => Promise<string[] | []>
  setCache: (key: string, value: any) => Promise<any>
  cleanCacheKey: (key: string[]) => Promise<number>
  cleanCache: (removingKeys: string[]) => Promise<number>
}
