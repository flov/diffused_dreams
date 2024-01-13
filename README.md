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

# Mapping routes:

| Page Name     | Path                      | Data show                  |
| ------------- | ------------------------- | -------------------------- |
| Home page     | /                         | Many posts, many topics    |
| Topic show    | /topics/[slug]            | Single topic, many posts   |
| Create a post | /topics/[slug]/posts/new  |                            |
| Create a post | /topics/[slug]/posts/[id] | Single post, many comments |
