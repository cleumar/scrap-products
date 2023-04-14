# Scrap de Produtos

Olá,

No Pelando, desejamos incentivar e tornar o mais fácil possível a inserção de promoções na nossa plataforma. Uma forma de simplificar esse processo é, a partir de uma URL de produto, identificar suas informações básicas e apresentar ao usuário no momento da inserção, poupando seu trabalho e tempo.

Nessa etapa, seu objetivo vai ser implementar um serviço REST que seja capaz de receber uma URL e retornar um JSON com os dados referente ao produto.

Quais dados esperamos receber como resposta?

- Título
- Imagem (apenas uma é suficiente)
- Preço (Se mais de 1 preço, pode ser o preço em destaque)
- Descrição
- URL

Seu serviço deve respeitar as seguintes regras:

1. Receber uma URL de produto como entrada e devolver um JSON como saída

2. Os dados dos produtos devem ser persistidos em um banco de dados

3. Se uma URL for enviada mais de uma vez e o tempo for inferior a 1h, a resposta deve vir do banco de dados, caso contrário, os dados devem ser coletados novamente

No final desse documento deixamos uma lista de URLs de exemplo, sabemos que diferentes lojas têm diferentes estruturas HTML e isso pode dificultar um pouco essa coleta, sinta-se livre para escolher algumas dessas lojas e trabalhar apenas com elas.

## Ferramentas
- [Redis] -  version=7.0.9
- [Docker] - Versao v20.10.11
- [Node] -   Versao 16 ou superior
- [docker-compose] - version: '3.7'

## Tecnologia
- Node com typescript, usando banco redis para armazenamento dos dados
- Docker

## Pré Requisitos

1. Precisamos primeiramente ter instalado o `docker` e o `docker-compose`.
2. Criar arquivos .env, .env.docker e .env.test
3. instalar o yarn como o comando: `npm install --global yarn ` 


### Variáveis de Ambiente

No repositorio subi os arquivo envs(não é uma boa pratica subir) conforme abaixo

```
PORT=3001 (porta que vai subir a aplicação)
NODE_ENV=dev (ambiente)

#Redis local
REDIS_HOST=localhost  (host do banco)
REDIS_PASSWORD=root  (senha do banco)
REDIS_PORT=6379 (porta do banco)

CACHE_EXPIRES_SECONDS=3600 (tempo de expiracao do registro no redis)
AXIOS_TIMEOUT=6000 (timeout de resposta do axios)

```
## Start do APP rodando local

1. clonar o repositorio: git clone https://github.com/cleumar/scrap-products.git
2. na raiz do projeto, em um terminal executar o comando: `yarn`
3. startando o redis: na raiz do projeto executar o comando: `docker-compose up redis`
4. para o start da aplicação: `yarn start:dev` (para esse teste em ambiente de desenvolvimento)



## Start do APP rodando no docker

1. na raiz do projeto executar o comando: `docker-compose up -d --build`


## Comandos importantes

| Comando                       | Descrição                                                           |
| ----------------------------- | ------------------------------------------------------------------- |
| docker-compose up             | Subir container do docker                                           |
  docker-compose up -d --build  | Subir container do docker em background e builda a imagem           |
| yarn start:dev                | Rodar o projeto com nodemon                                         | 
| yarn build                    | Compilar TS > JS                                                    |
| yarn test                     | Rodar todos os testes                                               |
| yarn test:ci                  | Rodar todos os testes com coverage                                  |


## Detalhes a API

  # Rotas:
  - Redis 

        - metodo GET: (importar a url no postman, se for rodar local alterar a porta: 3001 para rodar no docker porta 3000) 
          - Listar todas as chaves 
            curl --location --request GET 'http://localhost:3001/redis/all'

          - Exibir registro de uma chave 
            curl --location --request GET 'http://localhost:3001/redis/?key=https://www.zattini.com.br/tamanco-vizzano-salto-medio-feminino-roxo-2dd-6563-198'

        - metodo DELETE
            - Deletar todas as chaves
              curl --location --request DELETE 'http://localhost:3000/redis/all'

            - Deletar registro de uma chave
              curl --location --request DELETE 'http://localhost:3001/redis/?key=https://www.zattini.com.br/tamanco-vizzano-salto-medio-feminino-roxo-2dd-6563-198'

  - Products
    - Seguindo os requisitos da aplicação: 
    
          - Receber uma URL de produto como entrada e devolver um JSON como saída:
              R: Na entrada é necessario passar um parametro no params conforme exemplo abaixo:
              chave: url
              valor: https://www.zattini.com.br/tamanco-vizzano-salto-medio-feminino-roxo-2dd-6563-198

              Obs: no valor usar a url do site zattini, pode ser realizado o filtro com outros produtos

          - Os dados dos produtos devem ser persistidos em um banco de dados
            R: apos realizar consulta, os dados sera armazenado em uma base do REDIS

          - Se uma URL for enviada mais de uma vez e o tempo for inferior a 1h, a resposta deve vir do banco de dados, caso contrário, os dados devem ser coletados novamente\
            R: no arquivo .env possui uma chave para definir o tempo de expiracao: CACHE_EXPIRES_SECONDS=3600 (esta com esse valor como padrao, que equivale a 1 hora)

          - metodo GET: (importar o curl no postman, se for rodar local alterar a porta: 3001 para rodar no docker porta 3000)
              curl --location --request GET 'http://localhost:3000/products?url=https://www.zattini.com.br/tamanco-vizzano-salto-medio-feminino-roxo-2DD-6563-198'

        
