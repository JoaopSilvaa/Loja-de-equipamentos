# Loja de Equipamentos

# O que é o Loja de Equipamentos

API de loja de equipamentos medievais, capaz de fazer a Criação, Leitura, Atualização e Exclusão de dados <b>(CRUD)</b>

## Técnologias usadas

Back-end:
> Desenvolvido usando: TypeScript, Docker, API Restful, CRUD


## Você pode rodar o projeto com ou sem docker

## Com Docker

  > Rode os serviços `node` e `db` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queira fazer uso da aplicação em containers
  - Esses serviços irão inicializar um container chamado `trybesmith` e outro chamado `trybesmith_db`.
  - A partir daqui você pode rodar o container `trybesmith` via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it trybesmith bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`

## Sem Docker
  
  > Instale as dependências [**Caso existam**] com `npm install`
  
  Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.

## Executando a aplicação
* Para rodar a aplicação é necessário rodar o comando abaixo e acessar as rotas disponíveis em um app como <a href='https://www.postman.com/downloads/'>Postman</a> ou no seu navegador com o `localhost:3000`:

    ```
    npm start
    ```

## Endpoints disponíveis:
* /products - POST
    > Endpoint disponível para cadastrar produtos:
    - O endpoint deve receber a seguinte estrutura:
    ```json
        {
        "name": "Espada longa",
        "amount": "30 peças de ouro"
        }
    ```

* /products - GET
    > Endpoint disponível para listar os produtos:
      ```json
    [
      {
        "id": 1,
        "name": "Poção de cura",
        "amount": "20 gold",
        "orderId": null
      },
      {
        "id": 2,
        "name": "Escudo do Herói",
        "amount": "100 diamond",
        "orderId": 1
      }
    ]
    ```

* /users - POST
    > Endpoint disponível para cadastrar pessoas usuárias:
    - O endpoint deve receber a seguinte estrutura:
    ```json
        { 
            "username": "MAX",
            "classe": "swordsman",
            "level": 10,
            "password": "SavingPeople"
        }
    ```

* /orders - GET
    > Endpoint disponível para listar os pedidos:
    ```json
      [
        {
          "id": 1,
          "userId": 2,
          "productsIds": [1, 2]
        },
        {
          "id": 2,
          "userId": 2,
          "productsIds": [3, 4]
        }
      ]
    ```

* /orders - POST
    > Endpoint disponível para cadastrar pedidos:
    - O endpoint deve receber a seguinte estrutura:
    ```json
    {
        "productsIds": [1, 2]
    }
    ```

* /login - POST
    > Endpoint disponível para login de pessoas usuárias:
    - O endpoint deve receber a seguinte estrutura:
    ```json
        {
            "username": "string",
            "password": "string"
        }
    ```


Este projeto foi desenvolvido por [João Antônio](https://www.linkedin.com/in/joaoantoniosilvaa/) durante o curso de Desenvolvimento de Software na [Trybe](https://www.betrybe.com/) 