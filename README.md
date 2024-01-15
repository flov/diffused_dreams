## Getting Started

First, run the development server:

```bash
pnpm dev
```

# Mapping routes:

| Page Name     | Path                      | Data show                  |
| ------------- | ------------------------- | -------------------------- |
| Home page     | /                         | Many posts, many topics    |
| Topic show    | /topics/[slug]            | Single topic, many posts   |
| Create a post | /topics/[slug]/posts/new  |                            |
| Create a post | /topics/[slug]/posts/[id] | Single post, many comments |
