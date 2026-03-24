# Store Manager

Aplicativo mobile desenvolvido com Expo + React Native para gerenciamento de lojas e produtos, com foco em arquitetura por features, experiência de usuário e código escalável.

## Stack

- Expo SDK 55
- React Native 0.83
- TypeScript
- Expo Router
- Gluestack UI
- Zustand
- MirageJS
- Expo Image Picker
- Expo Linear Gradient

## Funcionalidades

### Lojas

- Listagem de lojas
- Busca por nome e endereço
- Filtro de lojas: todas / com produtos / sem produtos
- Cadastro de loja
- Edição de loja
- Exclusão de loja

### Produtos

- Listagem de produtos por loja
- Busca de produtos
- Filtro por categoria
- Cadastro de produto
- Edição de produto
- Exclusão de produto
- Seleção de imagem pela galeria

## Arquitetura

O projeto foi estruturado em feature-based architecture, separando rotas, componentes compartilhados, hooks, serviços, tipos e regras por domínio.

## Estrutura

app/
src/
components/
features/
services/
store/
lib/
theme/

## Como rodar

pnpm install
pnpm expo start
ou pnpm android/ios

## Mock backend

O mock é iniciado automaticamente via MirageJS.
