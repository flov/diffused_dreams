"use server";

export const createImage = async (prompt: string) => {
  const url = "https://api.runpod.ai/v2/k7y7uf2n1gqhlj/runsync";

  const headers = {
    Authorization: "Bearer 4X6GFJK1NLEI065GBTCD27T5WM602OVRU1I33EZ4",
    "Content-Type": "application/json",
  };

  const data = {
    input: {
      workflow: {
        3: {
          inputs: {
            seed: 1337,
            steps: 20,
            cfg: 8,
            sampler_name: "euler",
            scheduler: "normal",
            denoise: 1,
            model: ["4", 0],
            positive: ["6", 0],
            negative: ["7", 0],
            latent_image: ["5", 0],
          },
          class_type: "KSampler",
        },
        4: {
          inputs: {
            ckpt_name: "sd_xl_base_1.0.safetensors",
          },
          class_type: "CheckpointLoaderSimple",
        },
        5: {
          inputs: {
            width: 512,
            height: 512,
            batch_size: 1,
          },
          class_type: "EmptyLatentImage",
        },
        6: {
          inputs: {
            text: prompt,
            clip: ["4", 1],
          },
          class_type: "CLIPTextEncode",
        },
        7: {
          inputs: {
            text: "text, watermark",
            clip: ["4", 1],
          },
          class_type: "CLIPTextEncode",
        },
        8: {
          inputs: {
            samples: ["3", 0],
            vae: ["4", 2],
          },
          class_type: "VAEDecode",
        },
        9: {
          inputs: {
            filename_prefix: "ComfyUI",
            images: ["8", 0],
          },
          class_type: "SaveImage",
        },
      },
    },
  };

  return fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
    mode: "cors",
  });
};
