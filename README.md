# Gestão de Escolas

Aplicativo mobile multiplataforma (Android/iOS) desenvolvido com Expo + React Native para centralização do cadastro de escolas públicas e suas turmas. Sistema desenvolvido para prefeitura municipal.

## Versões Utilizadas

- Node.js: 22.x
- Expo SDK: 55
- React: 19.2.0
- React Native: 0.83.2
- TypeScript: 5.9.x

## Stack Tecnológica

- **Framework**: Expo SDK 55 (Expo Router para navegação)
- **UI**: Gluestack UI + NativeWind (TailwindCSS)
- **Estado**: Zustand
- **Formulários**: React Hook Form + Zod
- **Mock Backend**: MirageJS
- **Testes**: Jest + Testing Library React Native
- **Lint/Format**: ESLint + Prettier
- **Persistência**: AsyncStorage (offline-first)

## Funcionalidades

### Módulo de Escolas

- Listar escolas (nome, endereço, número de turmas)
- Busca por nome ou endereço
- Filtro: Todas / Com turmas / Sem turmas
- Adicionar nova escola (nome, endereço obrigatório)
- Editar escola
- Excluir escola

### Módulo de Turmas

- Listar turmas associadas à escola selecionada
- Busca por turma, turno ou ano letivo
- Filtro por turno (Matutino, Vespertino, Noturno, Integral)
- Cadastrar nova turma (nome, turno, ano letivo)
- Editar turma
- Excluir turma

## Arquitetura

Projeto estruturado em **feature-based architecture** com padrão similar ao React Navigation:

```
src/
├── app/                    # Rotas (Expo Router) - apenas re-exports
│   ├── index.tsx           # export { SchoolListScreen }
│   ├── schools/
│   │   ├── new.tsx         # export { NewSchoolScreen }
│   │   └── [schoolId]/
│   │       ├── index.tsx   # export { ClassListScreen }
│   │       ├── edit.tsx    # export { EditSchoolScreen }
│   │       └── classes/
│   │           ├── new.tsx # export { NewClassScreen }
│   │           └── [classId]/
│   │               └── edit.tsx # export { EditClassScreen }
│   └── _layout.tsx         # Providers (Gluestack, AlertNotification)
├── components/
│   ├── forms/              # TextField (usando Gluestack Input)
│   ├── screens/            # EntityFormScreen (compartilhado)
│   ├── ui/                 # Gluestack components
│   │   ├── button/         # Button, ButtonText
│   │   ├── input/          # Input, InputField, InputIcon
│   │   ├── text/           # Text
│   │   └── ...
│   └── feedback/           # Alertas
├── features/
│   ├── schools/
│   │   ├── screens/        # SchoolListScreen, NewSchoolScreen, EditSchoolScreen
│   │   ├── components/     # SchoolCard, SchoolListFilter, SchoolForm
│   │   ├── hooks/          # useSchools, useSchoolActions, useSchoolList
│   │   ├── services/       # schoolsRepository
│   │   ├── store/          # schoolsUiStore
│   │   ├── types/          # School, SchoolFormValues
│   │   └── utils/          # school.mappers
│   └── classes/            # Mesma estrutura
│       ├── screens/        # ClassListScreen, NewClassScreen, EditClassScreen
│       ├── components/     # ClassCard, ShiftSelector, ClassForm
│       ├── hooks/
│       ├── services/
│       ├── store/
│       ├── types/
│       └── utils/
├── hooks/                  # useEntityForm, useFilteredList, useFilteredEntities
├── lib/                    # Validações Zod
├── services/
│   ├── api/                # Cliente HTTP e Mock Server
│   └── storage/            # AsyncStorage (offline)
├── theme/                  # Tema centralizado
└── types/                  # Tipos globais
```

## Design System

Tema centralizado em `src/theme/index.ts` com:
- **Cores**: Sistema completo de cores (primária, secundária, danger, etc)
- **Tipografia**: Tamanhos e pesos de fonte padronizados
- **Espaçamento**: Escala consistente de spacing
- **Bordas**: Radii padronizados
- **Sombras**: Efeitos de elevação consistentes

## Instalação e Execução

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npx expo start

# Executar no Android
npx expo start --android

# Executar no iOS
npx expo start --ios
```

## Mock de Back-end

O mock é iniciado automaticamente via MirageJS em `src/services/api/mock-server.ts`.

Endpoints simulados:
- `GET /schools` - Listar escolas
- `POST /schools` - Criar escola
- `PUT /schools/:id` - Atualizar escola
- `DELETE /schools/:id` - Excluir escola
- `GET /classes?schoolId=:id` - Listar turmas por escola
- `POST /classes` - Criar turma
- `PUT /classes/:id` - Atualizar turma
- `DELETE /classes/:id` - Excluir turma

## Testes

```bash
# Executar testes
npm test

# Executar em modo watch
npm run test:watch
```

## Lint e Formatação

```bash
# Verificar lint
npm run lint

# Corrigir problemas de lint
npm run lint:fix

# Formatar código
npm run format

# Verificar formatação
npm run format:check
```

## Decisões Técnicas

1. **Feature-based Architecture com Screens**: Cada feature contém suas próprias telas (similar ao React Navigation), app/ apenas exporta
2. **Gluestack UI**: Componentes de UI 100% do Gluestack (Button, Input, Text, VStack, etc)
3. **Componentização**:
   - `EntityFormScreen`: Componente compartilhado para formulários New/Edit
   - `TextField`: Input do Gluestack com label e error
   - `SearchInput`: Input do Gluestack com ícone de busca
4. **Hooks Personalizados**:
   - `useSchoolList` / `useClassList`: Gerenciamento completo de listagem
   - `useEntityForm`: Abstração de submit, loading, error, redirect
   - `useFilteredEntities`: Filtragem genérica com search + filterFn
5. **Tema Centralizado**: Cores, fontes, espaçamentos via `theme`
6. **TypeScript Estrito**: Tipagem completa com generics
7. **Testes**: 100% de cobertura em hooks, repositórios, componentes
8. **Clean Code**: Telas em app/ têm apenas 2-4 linhas (re-exports)

## Checklist de Requisitos

✅ Expo SDK 54+ (SDK 55)
✅ React 19 / React Native 0.81+ (RN 0.83)
✅ TypeScript obrigatório (Strict mode)
✅ Navegação com Expo Router (file-based)
✅ UI com Gluestack UI (100% Gluestack components)
✅ Estado com Zustand (stores por feature)
✅ Mock com MirageJS (8 endpoints)
✅ Endpoints /schools e /classes
✅ CRUD completo de escolas
✅ CRUD completo de turmas
✅ Busca e filtros
✅ Layout responsivo
✅ Screens dentro das features (padrão React Navigation)
✅ Componentização (EntityFormScreen compartilhado)
✅ Hooks personalizados (useSchoolList, useClassList, useEntityForm)
✅ Testes unitários 100% (13 arquivos de teste)
✅ Arquitetura modular por features
✅ Lint/Formatter (ESLint + Prettier configurados)
✅ Persistência offline (AsyncStorage)
✅ Clean Code (telas com 2-4 linhas, DRY, SRP)
