# Legacy Project Action Plan

## Prep
1. ~~Install dependencies~~
2. ~~Refactor to connect to database once~~
3. ~~Set up postman to deal with database~~
4. ~~Install all typescript dependencies (check bottom of file)~~
---

## Refactor into Typescript
1. Refactor server side

| Theodore | Luana |
| ----------- | ----------- |
| ~~utils.js, db.js and index.js~~ | ~~add db.js + only one db connection~~ |
| ~~user model and controller~~ | ~~chore model and controller~~ |

2. Refactor client side
- .html and .css stays the same!
- .js to .ts and .jsx to .tsx
- add interface and type for props

Easy: UserItem, Leaderboard, LandingPage, AddNewChore, App, main

More logic: ChoreItem.jsx, ChoreList.jsx, APIClient.js

| Theodore | Luana |
| ----------- | ----------- |
| ChoreList.jsx | ~~ChoreItem.jsx~~ |
| LandingPage.jsx + Leaderboard.jsx |  ~~AddNewChore.jsx + UserItem.jsx + App.jsx + main.jsx~~ |
| APIClient.js |  |

## Add unit tests
1. Server tests

| Theodore | Luana |
| ----------- | ----------- |
|  |  |

2. Client tests

| Theodore | Luana |
| ----------- | ----------- |
|  |  |

## Extras
1. Refactor endpoints
- assign and unassign into one
- mark complete and mark not complete into on

---
## Typescript dependencies

in root 

`npm i --save-dev typescript ts-node @types/node`

`npx tsc --init`

in server

`npm i --save-dev typescript ts-node @types/node @types/express @types/mongoose`

`npx tsc --init`


in client

`npm i --save-dev typescript ts-node @types/node @types/react @types/react-router @types/react-dom`

`npx tsc --init`

uncomment and/or add the necessary lines in tsconfig.js

- root
```
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```

- server
```
{
  "compilerOptions": {
    "target": "ES2016",
    "module": "commonjs",
    "allowJs": true,
    "checkJs": false,
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["**/*"]
}
```
- client
```
{
  "compilerOptions": {
    "target": "ES6",
    "module": "ESNext",
    "jsx": "react-jsx",
    "allowJs": true,
    "checkJs": false,
    "noEmit": true,
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```