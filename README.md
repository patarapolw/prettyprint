# prettyprint

This project shows how we can prettyprint beyond `JSON.stringify(obj, null, 2)` in Node.js

- With colors
- Multiline strings

As for the core code, you are free to copy the code from [/src/index.ts](/src/index.ts).

## Local installation

```sh
npm i @patarapol/prettyprint --dev
```

```ts
import { pp } from '@patarapolw/prettyprint'
pp(OBJECT)
```

## CLI installation

[Run it directly with npx](https://www.npmjs.com/package/npx#examples)

```sh
npx github:patarapolw/prettyprint OBJECT_AS_JSON
```

Or, install as global

```sh
npm i -g @patarapolw/prettyprint
pp OBJECT_AS_JSON
```
