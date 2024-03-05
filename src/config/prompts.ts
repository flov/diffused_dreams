export type Prompt = {
  label: string;
  prompt: string;
  image: string;
};

export const prompts = (gender: string): Prompt[] => [
  {
    label: "ruler of the seven kingdoms",
    prompt: `A full body portrait of a ${gender} noble figure, dressed in luxurious Game of Thrones inspired attire, complete with embroidery and fur trim, seated on an iron throne, holding a scepter, with a direwolf at their side, in a grand hall filled with banners representing different houses, looking at the camera with a commanding presence, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, full length frame, High detail RAW color art, diffused soft lighting, shallow depth of field, sharp focus, cinematic lighting`,
    image: "/images/got.jpg",
  },
  {
    label: "guardian of galaxies",
    prompt: `A striking image of a ${gender} Marvel hero, posed heroically on top of a skyscraper, with a futuristic cityscape backdrop bathed in the glow of sunset, wearing a sleek, high-tech suit with glowing accents, eyes alight with power, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, three-quarter length frame, High detail RAW color art, dynamic rim lighting, focused depth of field, crisp focus, cinematic superhero lighting`,
    image: "/images/guardian.png",
  },
  {
    label: "whisperer of the forest",
    prompt: `An ethereal portrait of a ${gender} elf standing amidst an ancient, enchanted woodland, ears pointed and eyes aglow with the magic of the forest, clad in elegant, nature-inspired armor, a bow slung gracefully over their shoulder, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, full length frame, High detail RAW color art, natural diffused forest lighting, shallow depth of field, crystal clear focus, magical cinematic lighting`,
    image: "/images/elve.jpg",
  },
  {
    label: "slayer of cuteness",
    prompt: `A high fidelity photography of ${gender} space marine flying trough space Photography, detailed skin, detailed texture, photo-realistic, 8k, highly detailed, full length frame, High detail RAW color art, diffused soft lighting, shallow depth of field, sharp focus, cinematic lighting. In the style of Harry Potter.`,
    image: "/images/campaign_1.webp",
  },
  {
    label: "for the horde",
    prompt: `A ${gender} firefighter in gear, holding cat in front of a burning building, looking at viewer, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, full length frame, High detail RAW color art, diffused soft lighting, shallow depth of field, sharp focus, hyperrealism, cinematic lighting`,
    image: "/images/campaign_2.webp",
  },
  {
    label: "your grace",
    prompt: `A full body portrait of a ${gender} in majestic royal robes, in traditional attire wearing a crown, standing on the palace balcony overlooking an ancient kingdom with a vast river, looking at the camera, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, full length frame, wide shot, High detail RAW color art, diffused soft lighting, shallow depth of field, sharp focus, cinematic lighting`,
    image: "/images/campaign_3.webp",
  },
];
