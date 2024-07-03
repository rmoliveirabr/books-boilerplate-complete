# Introduction
This is the book-store project, a boilerplate with CRUD operations, authentication, and a very simple authorization check.

## Backlog
- fix grid sorting - it's client-side, not serverside
- make filtering more general (currently is only by description, make it also by field/value - example is to allow filter by creator)
- fix footer - it's on the content side, not below it
- use useForm in the book form, the way we're using for signin (register, errors)
- hooks have showToast to handle operation results - check if it's correct, since showToast is presentation
- when the user is logged, it shows the sign-in option first with empty data, and then the sign-out
- improve user 'hello' (above sign-out), try to get the user's name 
- improve authorization
- create the test layer
- create a Swagger API documentation for backend

## Some packages and components (for reference)

### Keys
openssl genrsa -out private.key 2048
openssl rsa -in private.key -pubout -out public.key
base64 private.key -w 0 > private.key.base64
base64 public.key -w 0 > public.key.base64

### React & Typescript
npm install --save-dev @types/react @types/node typescript

### Prisma
npx prisma migrate dev --name init_migration

### NestJS
npm install @nestjs/common @nestjs/core @nestjs/platform-express
npm install @nestjs/config

### Zod validation error (what about Zod?)
npm install zod-validation-error

### TS Node
npm install ts-node --save-dev
npm install ts-node-dev --save-dev

### Tailwind
npm install tailwindcss postcss autoprefixer tailwind-merge

### Miscelaneous
npm install @heroicons/react @radix-ui/react-slot next react-dom clsx

