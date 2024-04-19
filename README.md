# EventStation.ai

Next.js 14 website that generates stable diffusion images
by using a comfy ui workflow by leveraging the GPU of a
serverless Runpod API endpoint.

The Runpod serverless API uses [runpod-worker-comfy](https://github.com/flov/comfy-deploy-runpod-worker)
to run a comfyUi docker image with the chosen model.
In this case we are using [SDXL yamers realistic nsfw and sfw](https://civitai.com/models/127923/sdxl-yamers-realistic-nsfw-and-sfw).

# Getting started

use pnpm as a package manager
pnpm install

edit .env.local for environment variables

# Prisma and local migrations

When first running the app, you need to create the database and migrate
the schema into your db. To do this you need to define a
POSTGRES_PRISMA_URL environment variable inside your .env
For your local database, you have to add this environment variable under .env
putting it into .env.local will NOT work, since the npx prisma migrate command will
not look in .env.local for the variable.

for example:
`POSTGRES_PRISMA_URL="postgresql://username@localhost:5432/evenstation_dev"`
with eventstation_dev as a postgres database.
Inside the `schema.prisma` file there is a reference for `POSTGRES_URL_NON_POOLING`
which is only needed for vercel deployments. In your local development you need to remove
this line for the migration to work.

After setting the variable and removing the line either run
`npx prisma migrate dev` or `npx prisma migrate reset`
