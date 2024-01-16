# Diffused Dreams

Next.js 14 website that generates stable diffusion images
by using a comfy ui workflow by leveraging the GPU of a
serverless Runpod API endpoint.

The Runpod serverless API uses [runpod-worker-comfy](https://github.com/flov/comfy-deploy-runpod-worker)
to run a comfyUi docker image with the chosen model.
In this case we are using [SDXL yamers realistic nsfw and sfw](https://civitai.com/models/127923/sdxl-yamers-realistic-nsfw-and-sfw).
