export const maxDuration = 50; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const url = "https://api.runpod.ai/v2/rc1sln2qncxcp6/runsync";
  const model = "sdxlYamersRealisticNSFW_v5SX.safetensors";

  const headers = {
    Authorization: `Bearer ${process.env.RUNPOD_APIKEY}`,
    "Content-Type": "application/json",
  };

  const prompt = await request.json();

  const body = {
    input: {
      workflow: {
        "3": {
          inputs: {
            seed: 133452345637,
            steps: 40,
            cfg: 8,
            sampler_name: "dpmpp_2m_sde",
            scheduler: "karras",
            denoise: 1,
            model: ["4", 0],
            positive: ["6", 0],
            negative: ["7", 0],
            latent_image: ["5", 0],
          },
          class_type: "KSampler",
        },
        "4": {
          inputs: {
            ckpt_name: model,
          },
          class_type: "CheckpointLoaderSimple",
        },
        "5": {
          inputs: {
            width: 1024,
            height: 1024,
            batch_size: 1,
          },
          class_type: "EmptyLatentImage",
        },
        "6": {
          inputs: {
            text: prompt,
            clip: ["4", 1],
          },
          class_type: "CLIPTextEncode",
        },
        "7": {
          inputs: {
            text: "text, watermark",
            clip: ["4", 1],
          },
          class_type: "CLIPTextEncode",
        },
        "8": {
          inputs: {
            samples: ["3", 0],
            vae: ["4", 2],
          },
          class_type: "VAEDecode",
        },
        "9": {
          inputs: {
            filename_prefix: "ComfyUI",
            images: ["8", 0],
          },
          class_type: "SaveImage",
        },
      },
    },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return Response.json(data);
}
