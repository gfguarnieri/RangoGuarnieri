# Rango Food 

:warning: **Readme em construção** :construction:

### :memo: Funcionalidades
- [x] Restaurantes
    - [x] O sistema deve permitir o cadastro de restaurantes
    - [x] O sistema deve permitir o cadastro de imagem do restaurante
    - [x] O sistema deve permitir a alteração de restaurantes
    - [x] O sistema deve permitir a alteração da imagem do restaurante
    - [x] O sistema deve permitir a exclusão de restaurantes
    - [x] O sistema deve permitir a listagem de restaurantes
    - [x] O sistema deve permitir a busca de restaurante pelo Id
    - [x] O sistema deve permitir o cadastro de horário de funcionamento do restaurante
    - [x] O sistema deve permitir a alteração de horário de funcionamento do restaurante

- [ ] Produtos
    - [x] O sistema deve permitir o cadastro de categorias de produtos
    - [x] O sistema deve permitir a alteração de categorias de produtos
    - [x] O sistema deve permitir a exclusão de categorias de produtos
    - [x] O sistema deve permitir a listagem de categorias de produtos
    - [x] O sistema deve permitir a listagem de categorias de produtos de um restaurante
    - [ ] O sistema deve permitir o cadastro de produtos
    - [ ] O sistema deve permitir o cadastro de imagem do produto
    - [ ] O sistema deve permitir a alteração de produtos
    - [ ] O sistema deve permitir a alteração da imagem do produto
    - [ ] O sistema deve permitir a exclusão de produtos
    - [ ] O sistema deve permitir a listagem de produtos pelo restaurante
    - [ ] O sistema deve permitir a busca de produto pelo Id
    - [ ] O sistema deve permitir adicionar um produto em promoção
    - [ ] O sistema deve permitir remover um produto da promoção

### RFN - Requisitos não Funcionais 
- O sistema deve ser desenvolvido em NodeJS
- O sistema deve ter testes unitários
- O sistema deve ter testes de integração
- O sistema deve ter uma estrutura escalável
- O código deve ser legível e organizado
- Não utilizar framework que estabeleça um padrão de arquitetura
- Não utilizar query builder 
- Utilizar raw query para as consultas no banco de dados

### Melhorias Futuras 
- [ ] Criar rotas de pesquisa (/search) para restaurantes e produtos com filtros e paginação
- [ ] Criar novo provider de Armazenamento de arquivos na nuvem (AWS S3)
- [ ] As validações simples de dados já estão traduzidas (Zod i18n), mas as validações de caso de uso estão em inglês. Criar resources para tradução das mensagens de erro.

### Configuração do ambiente
Para configurar o ambiente é necessário ter:
- NodeJS
- Docker
- Docker Compose

#### Variáveis de ambiente
Para configurar as variáveis de ambiente, crie um arquivo `.env` na raiz do projeto e adicione os valores desejados. Utilizar como referência o arquivo `.env.example`.

- :computer: Utilize `.env.dev` para ambiente de desenvolvimento;
- :test_tube: Utilize `.env.test` para ambiente de testes;
- :rocket: Utilize `.env` para ambiente de produção;

#### Scripts
- `npm run dev`: Inicia o servidor em modo de desenvolvimento
- `npm run test`: Executa os testes unitários
- `npm run db-dev`: Inicia o banco de dados em modo de desenvolvimento com base no arquivo `.env.dev`

#### Banco de Dados (Docker)

Para configurar o banco de dados, execute o comando abaixo:
`docker-compose --env-file <.env file> up -d`

:warning: *Definir configuração do banco de dados em .env*

#### Instalação de dependências

Para instalar as dependências do projeto, execute o comando abaixo:
`npm install`

### Dependências
[NodeJS](https://nodejs.org/en/) - Ambiente de execução JavaScript
[Express](https://github.com/expressjs/express) - Framework para desenvolvimento de aplicações web
[Tsrynge](https://github.com/microsoft/tsyringe) - Injeção de dependência
[TypeORM](https://github.com/typeorm/typeorm) - Usado apenas para conexão com o banco de dados
[Vitest](https://github.com/vitest-dev/vitest) - Criação de testes automatizados
[http-status-codes](https://github.com/prettymuchbryce/http-status-codes) - Para enums contendo os códigos de status HTTP
[dotenv](https://github.com/motdotla/dotenv) - Para carregar variáveis de ambiente
[Zod](https://github.com/colinhacks/zod) - Para validação de dados

