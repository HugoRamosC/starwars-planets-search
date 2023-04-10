# Boas-vindas ao repositório do projeto Star Wars Planets Search!

[MEUS COMMITS](https://github.com/HugoRamosC/starwars-planets-search/commits)

Nesse projeto utilizei:

  * Context API do React para gerenciar estado.
  * React Hook useState;
  * React Hook useContext;
  * React Hook useEffect;
  * React Hooks customizados.
  * Desenvolvi testes.


# Requisitos

## 1 - Faça uma requisição para o endpoint `/planets` da API de Star Wars e preencha uma tabela com os dados retornados, com exceção dos dados da coluna `residents`
  <summary><strong>O que será verificado</strong></summary><br />

- Realiza uma requisição para a API;
- Preenche a tabela com os dados retornados;
- Verifica se a tabela tem 13 colunas;
- Verifica se a tabela tem uma linha para cada planeta retornado.
</details>

---

## 2 - Crie um filtro de texto para a tabela
  <summary><strong>O que será verificado</strong></summary><br />

- Renderiza o campo de texto para o filtro de nomes;
- Filtra os planetas que possuem a letra "o" no nome;
- Filtra planetas que possuem a letra "oo" no nome;
- Realiza os dois filtros acima em sequência e após, testa a remoção do filtro por texto.
</details>

---

## 3 - Crie um filtro para valores numéricos
  <summary><strong>O que será verificado</strong></summary><br />

- Renderiza o select de coluna e suas opções;
- Renderiza o select de comparação e suas opções;
- Renderiza o input para o valor do filtro;
- Renderiza o botão para executar a filtragem;
- Verifica se os valores iniciais de cada campo são (`population` | `maior que` | `0`);
- Utiliza o botão de filtrar sem alterar os valores iniciais dos inputs de filtro;
- Filtra utilizando a comparação "menor que";
- Filtra utilizando a comparação "maior que";
- Filtra utilizando a comparação "igual a".
</details>

---

## 4 - Implemente múltiplos filtros numéricos
  <summary><strong>O que será verificado</strong></summary><br />

- Adiciona dois filtros e verifica se a tabela foi atualizada com as informações filtradas;
- Adiciona três filtros e verifica se a tabela foi atualizada com as informações filtradas.
</details>

---

## 5 - Desenvolva testes para atingir 30% de cobertura total da aplicação
  <summary><strong>O que será verificado</strong></summary><br />

  * Será validado se, ao executar `npm run test-coverage`, é obtido os seguintes resultados:
      * `% Stmts` da linha `All files` é maior ou igual a 30.
      * `% Branch` da linha `All files` é maior ou igual a 30.
      * `% Funcs` da linha `All files` é maior ou igual a 30.
      * `% Lines` da linha `All files` é maior ou igual a 30.
</details>

---

## 6 - Não utilize filtros repetidos
  <summary><strong>O que será verificado</strong></summary><br />

- Filtra por população e remove a opção `population` das opções do dropdown de filtro por coluna.
</details>

---

## 7 - Apague um filtro de valor numérico ao clicar no ícone `X` de um dos filtros e apague todas filtragens numéricas simultaneamente ao clicar em outro botão de `Remover todas filtragens`
  <summary><strong>O que será verificado</strong></summary><br />

- Adiciona um filtro e verifica se a tabela foi atualizada com as informações filtradas, depois remove o filtro e verifica se os valores da tabela voltaram ao original.
- Adiciona dois filtros e verifica se a tabela foi atualizada com as informações filtradas, depois remove os filtros e verifica se os valores da tabela voltaram ao original.
- Adiciona três filtros e verifica se a tabela foi atualizada com as informações filtradas, depois remove os filtros utilizando o botão `button-remove-filters` e verifica se os valores da tabela voltaram ao original.
</details>

---

## 8 - Desenvolva testes para atingir 60% de cobertura total da aplicação
  <summary><strong>O que será verificado</strong></summary><br />

  * Será validado se, ao executar `npm run test-coverage`, é obtido os seguintes resultados:
    * `% Stmts` da linha `All files` é maior ou igual a 60.
    * `% Branch` da linha `All files` é maior ou igual a 60.
    * `% Funcs` da linha `All files` é maior ou igual a 60.
    * `% Lines` da linha `All files` é maior ou igual a 60.
</details>

---

## 9 - Ordene as colunas de forma ascendente ou descendente
  <summary><strong>O que será verificado</strong></summary><br />

- Ordena os planetas do maior período orbital para o menor período orbital;
- Ordena os planetas do menor diâmetro para o maior diâmetro;
- Ordena os planetas do menos populoso para o mais populoso;
    - Verifica se os oito primeiros planetas estão ordenados corretamente;
    - Verifica se os dois últimos planetas possuem os valores unknown na coluna population.
- Ordena os planetas do mais populoso para o menos populoso;
    - Verifica se os oito primeiros planetas estão ordenados corretamente;
    - Verifica se os dois últimos planetas possuem os valores unknown na coluna population.

</details>

---

# Requisito Bônus

## 10 - Desenvolva testes para atingir 90% de cobertura total da aplicação
  <summary><strong>O que será verificado</strong></summary><br />

  * Será validado se, ao executar `npm run test-coverage`, é obtido os seguintes resultados:
    * `% Stmts` da linha `All files` é maior ou igual a 90.
    * `% Branch` da linha `All files` é maior ou igual a 90.
    * `% Funcs` da linha `All files` é maior ou igual a 90.
    * `% Lines` da linha `All files` é maior ou igual a 90.
</details>
