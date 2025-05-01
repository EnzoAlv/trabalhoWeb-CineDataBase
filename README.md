# CineInfo - Catálogo de Cinema Interativo

![image](https://github.com/user-attachments/assets/0709fa5f-73df-4dad-b599-7a317140706a)
 Um aplicativo web responsivo construído com React para explorar filmes e séries de TV. Pesquise títulos, veja detalhes como sinopse, elenco, notas, assista a trailers e salve seus favoritos localmente!

**Acesse a aplicação online:** [Link para a Aplicação Hospedada] ---

## ✨ Funcionalidades Principais

* **Busca Abrangente:** Encontre filmes e séries de TV pelo nome.
* **Filmes Populares:** Descubra os filmes mais populares do momento na página inicial.
* **Página de Detalhes:** Clique em um filme ou série para ver informações completas, incluindo:
    * Título, ano de lançamento, gêneros.
    * Sinopse traduzida (pt-BR).
    * Nota média dos usuários.
    * Elenco principal.
    * Número de temporadas e episódios (para séries).
    * Poster e imagem de fundo (backdrop).
* **Trailer no YouTube:** Assista ao trailer oficial diretamente na página de detalhes (quando disponível).
* **Sistema de Favoritos:** Marque filmes e séries como favoritos ❤️.
* **Página de Favoritos:** Veja todos os seus itens favoritados em uma página dedicada.
* **Interface Responsiva:** Adapta-se a diferentes tamanhos de tela (desktop, tablet, mobile).
* **Dados da API:** Utiliza a API do [The Movie Database (TMDB)](https://www.themoviedb.org/) para obter informações atualizadas.
* **Paginação Infinita:** Carregue mais resultados de busca ou filmes populares conforme rola a página.
  

---

## 🚀 Tecnologias Utilizadas

* **[React](https://reactjs.org/):** Biblioteca JavaScript para construção de interfaces de usuário.
* **[React Router](https://reactrouter.com/):** Para gerenciamento de rotas e navegação entre páginas.
* **[Axios](https://axios-http.com/):** Cliente HTTP para fazer requisições à API do TMDB.
* **[React Context API](https://reactjs.org/docs/context.html):** Para gerenciamento do estado global de favoritos.
* **[LocalStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage):** Para persistir a lista de favoritos no navegador do usuário.
* **[CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS):** Para estilização e design responsivo (sem frameworks CSS externos).
* **[The Movie Database (TMDB) API](https://developer.themoviedb.org/docs):** Fonte dos dados sobre filmes e séries.

---

## 🔧 Como Executar Localmente

Siga estas instruções para configurar e rodar o projeto em sua máquina.

### Pré-requisitos

* **Node.js:** Certifique-se de ter o Node.js instalado (versão 16 ou superior recomendada). Você pode baixá-lo [aqui](https://nodejs.org/).
* **npm** ou **yarn:** Gerenciador de pacotes Node.js (geralmente vem com o Node.js).

### Instalação

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/nome-do-repositorio.git](https://github.com/seu-usuario/nome-do-repositorio.git)
    cd nome-do-repositorio
    ```
    *(Substitua `seu-usuario/nome-do-repositorio` pelo URL real do seu repositório GitHub)*

2.  **Instale as Dependências:**
    Usando npm:
    ```bash
    npm install
    ```
    Ou usando yarn:
    ```bash
    yarn install
    ```

3.  **Configure a Chave da API:**
    * Você precisará de uma chave da API do [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api). É gratuito se cadastrar.
    * Abra o arquivo `src/services/api.js`.
    * Encontre a linha:
        ```javascript
        const API_KEY = 'SUA_CHAVE_API_AQUI'; // Substitua pela sua chave real
        ```
    * Substitua `'SUA_CHAVE_API_AQUI'` pela sua chave da API do TMDB. **Importante:** Não comite sua chave API diretamente no repositório público por questões de segurança. Considere usar variáveis de ambiente (`.env`) para projetos mais sérios.

4.  **Inicie o Servidor de Desenvolvimento:**
    Usando npm:
    ```bash
    npm start
    ```
    Ou usando yarn:
    ```bash
    yarn start
    ```

5.  **Abra no Navegador:**
    A aplicação deve abrir automaticamente em `http://localhost:3000` (ou outra porta, se a 3000 estiver ocupada).

---
