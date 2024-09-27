## Подготовка проекта.

Чтобы подготовить проект к работе, необходимо через терминал:

1. Зайти в папку server и оттуда выполнить команду "npm install"
2. Зайти в папку client и оттуда выполнить команду "npm install"
3. Перейти обратно в папку server и запустить сервер командой "npm run dev"
   Этот сервер обрабатывает запросы, отправленные на несколько адресов, а именно:
   /register (для регистрации пользователя)
   /login (для авторизации)
   /logout (для выхода пользователя)
   /users/me и /users/{id} (для получения списка пользователей или конкретного пользователя по его id)
   /posts (для получения списка постов)
   Для взаимодействия с сервером, можно прямо из браузера отправить ему запрос, например
   http://localhost:4000/posts
   http://localhost:4000/users/df7182dd-b3c6-46cf-9133-f922f988c75d
4. Зайти в папку client и установить библиотеку zod для удобной валидации с помощью команды "npm i zod@3"
   Zod предоставлет инструменты для описания т.н. схем.
5. Зайти в папку client и установить библиотеку reactQuery командой "npm i @tanstack/react-query@5". Эта библиотека предоставляет хук useQuery
6. Зайти в папку client и установить библиотеку reactHookForm командой "npm i react-hook-form@7". Эта библиотека необходима для валидации формы.
7. Зайти в папку client и установить библиотеку reactHookResolvers командой "npm i @hookform/resolvers@3". Эта библиотека необходима для того, чтобы библиотека reactHookForm понимала схемы и работала с ранее установленной библиотекой zod.

## Команды сервера:

/api/register
/api/login
/api/logout
/api/users/me
/api/users/{id}
/api/posts

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

-   Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
-   Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
