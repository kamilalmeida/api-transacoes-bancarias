## API transações bancárias

Desenvolvi essa API, a qual simula transações bancárias, como saques, depósitos e extrato.

### `POST /`

Adiciona uma conta. Exemplo de corpo da requisição:

```json
{
  "name": "Daniel",

}
```

Exemplo de resposta (status code **201**):

```json
{
  {
	"id": 1,
	"name": "marcos",
	"currentBalance": 0,
	"arrayDeposit": []
  }
}
```

### `GET /`

Lista todas as contas. Não é necessário enviar nenhum corpo na requisição.
Exemplo de resposta (status code **200**):

```json
[
  {
		"id": 1,
		"name": "marcos",
		"currentBalance": 0,
		"arrayDeposit": []
	},
	{
		"id": 2,
		"name": "daniel",
		"currentBalance": 0,
		"arrayDeposit": []
	}
]
```

### `GET /<ACCOUNTS_ID>`

Lista as informações de uma conta específica. Não é necessário enviar nenhum
corpo na requisição. Exemplo de resposta (status code **200**):

```json
       {
		"id": 1,
		"name": "marcos",
		"currentBalance": 0,
		"arrayDeposit": []
	}
```

### `PATCH /<ACCOUNTS_ID>`

Atualiza as informações de uma conta. Exemplo de corpo da requisição:

```json
{
"name":"maicon"
}
```

Exemplo de resposta (status code **200**):

```json
{
	"id": 1,
	"name": "maicon",
	"currentBalance": 0,
	"arrayDeposit": []
}
```

### `DELETE /<ACCOUNTS_ID>`

Exclui uma conta específica.


## ✔️ Técnicas e tecnologias utilizadas

- ``Node``
- ``Express``

## Para rodar o projeto
- Instalar as dependências 
npm install

- executar o projeto node api.js

