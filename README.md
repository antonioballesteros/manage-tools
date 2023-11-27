This is a [Next.js](https://nextjs.org/) v14.x project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

#### experimental turbo

```bash
npm run turbo
yarn turbo
pnpm turbo
bun turbo
```

Has not been fully tested

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How works

Open the page and select one of the options available

## Important

### Sql instead fetch

Proyect was designed to have api requests to a backend server.
But with next 14 seems sql requests from server can be done using SSR.
It's a nice feature.

In any case, the information is not requested and we use mocketed data.

### Template definition

Checking the design, seems the template has a name "Jeans". We should have another query to receive this.
And maybe refactor a bit the logic to read templates + grid.

### Drag and Drop

The solution works, but it's not perfect. The drop only add items before or after, but no between items.
Maybe a second iteration could fix this :)

### Scale

I've created a range input slider to manage the scale from 100% -> 20%
It will hide the options when the scale display the items small.
75% remove some items
40% hide whole options
The scale is reseted when the user reload or change the page
