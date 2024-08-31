# Lista de Compras

Este projeto é uma aplicação de lista de compras desenvolvida com React e TypeScript, usando Material-UI para a interface. A aplicação permite que você adicione, edite e remova itens da lista, aplique filtros, busque por nome, e mais.

## Funcionalidades

1. **Adicionar Itens:**
   - Você pode adicionar novos itens e suas categorias à lista de compras.

2. **Editar Itens:**
   - Permite editar o nome e a categoria dos itens existentes.

3. **Remover Itens:**
   - Remove itens da lista com uma confirmação antes da exclusão.

4. **Filtros:**
   - Filtre os itens por categoria usando checkboxes.

5. **Busca por Nome:**
   - Encontre itens na lista com base em uma pesquisa por nome.

6. **Contagem de Itens:**
   - Mostra a quantidade de itens que pertencem a cada categoria ao lado do nome da categoria.

7. **Temas:**
   - Alterna entre temas claro e escuro com uma transição suave de 3 segundos.
   - Permite a seleção de um tema personalizado.

8. **Importar para PDF:**
   - Exporte a lista de compras para um arquivo PDF.

9. **Responsividade:**
   - A interface é ajustada para funcionar bem em dispositivos móveis.

10. **Salvar Preferências:**
    - O estado do layout e preferências de exibição são salvos no `localStorage`.

11. **Dark Mode:**
    - Suporte para modo escuro.

12. **Temas Personalizados:**
    - Escolha entre diferentes esquemas de cores.

13. **Animações:**
    - Adiciona transições suaves ao alternar entre modos e ao exibir/esconder elementos.

14. **Confirmação de Exclusão:**
    - Exibe uma caixa de confirmação ao tentar remover um item.

15. **Internacionalização:**
    - Suporte para múltiplos idiomas (Português e Inglês).

## Instalação

Para rodar a aplicação localmente, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/JuliaVitoriaSantosAlves/lista_de_compras.git
   ```

2. Navegue para o diretório do projeto:
   ```bash
   cd lista-de-compras
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

5. Abra seu navegador e acesse:
   ```
   http://localhost:3000
   ```

## Uso

1. **Adicionar Itens:**
   - Use o formulário no topo da página para adicionar um novo item e sua categoria.

2. **Editar Itens:**
   - Clique no botão "Editar" ao lado de um item para modificar seu nome e categoria.

3. **Remover Itens:**
   - Clique no botão "Remover" para excluir um item. Uma confirmação será exibida antes da remoção.

4. **Filtros e Busca:**
   - Selecione categorias para filtrar a lista e use a barra de pesquisa para encontrar itens por nome.

5. **Temas e Modo Escuro:**
   - Use o botão para alternar entre temas claro e escuro. O tema pode ser personalizado.

6. **Exportar para PDF:**
   - Clique no botão de exportação para gerar um arquivo PDF com a lista de compras.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface.
- **TypeScript**: Linguagem para maior robustez e segurança no código.
- **Material-UI**: Biblioteca de componentes para estilização e UI.
- **uuid**: Gerador de IDs únicos para os itens.
- **jspdf**: Biblioteca para exportar a lista em PDF.

## Contribuições

Sinta-se à vontade para contribuir com melhorias ou correções. Por favor, faça um fork do repositório e envie um pull request.

## Contato

Se você tiver alguma dúvida, entre em contato com [vitti2vita@gmail.com]