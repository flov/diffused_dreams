export type Prompt = {
  label: string;
  prompt: string;
  image: string;
};

export const prompts = (gender: string): Prompt[] => [
  {
    label: "berghain nocturne",
    prompt: `An electrifying portrayal of a ${gender} Techno raver, engulfed in the pulsating lights and shadows of Berghain's dance floor, dressed in sleek black attire, their movements synchronized with the hypnotic beat, a sense of euphoria and intensity reflected in their eyes, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, full-length frame, High detail RAW color art, dynamic lighting with vibrant neon hues, shallow depth of field, intense focus, cinematic lighting capturing the essence of underground techno culture`,
    image: "/images/berghaini.png",
  },
  {
    label: "desert prophet",
    prompt: `A captivating portrayal of a ${gender} desert mystic standing amidst the vast, sandy expanse of the planet Arrakis, shrouded in flowing robes adorned with intricate desert motifs, their eyes gazing into the distance with a mix of wisdom and foresight, a faint shimmer of spice in the air, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, full length frame, High detail RAW color art, natural desert lighting with warm tones, shallow depth of field, intense focus, cinematic lighting`,
    image: "/images/dune.png",
  },
  {
    label: "host of the wild west",
    prompt: `A striking portrayal of a ${gender} character from Westworld, standing in the middle of a dusty Western town, surrounded by saloons and desert landscape, their expression poised with a hint of mystery, wearing attire reminiscent of the old West but with a futuristic twist, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, full-length frame, High detail RAW color art, natural desert lighting with dramatic shadows, medium depth of field, intense focus, cinematic lighting evoking the atmosphere of the Wild West meets futuristic technology`,
    image: "/images/westworld.png",
  },
  {
    label: "wizarding prodigy",
    prompt: `A captivating portrayal of a ${gender} wizarding prodigy, standing amidst the halls of Hogwarts School of Witchcraft and Wizardry, wand raised in a spellcasting stance, surrounded by swirling magical energy, their eyes sparkling with intellect and determination, adorned in wizarding robes with house colors subtly woven in, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, full-length frame, High detail RAW color art, soft ambient lighting with hints of magical glow, shallow depth of field, focused gaze, cinematic lighting evoking the enchantment of the wizarding world`,
    image: "/images/harry-potter.jpg",
  },
  {
    label: "serenity in the stars",
    prompt: `An iconic portrayal of a ${gender} Jedi Knight, standing tall amidst the ruins of a ancient temple, lightsaber ignited, casting a warm glow that contrasts with the cool tones of the surroundings, robes billowing in the wind, a sense of serene determination in their expression, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, full length frame, High detail RAW color art, ambient natural lighting with subtle lens flares, medium depth of field, focused gaze, cinematic lighting`,
    image: "/images/star_wars.png",
  },

  {
    label: "samurai of the shadows",
    prompt: `A dynamic portrayal of a ${gender} manga samurai, poised in mid-action with their katana drawn, surrounded by swirling cherry blossoms and falling leaves, their eyes gleaming with determination, clothing billowing with movement, photography, detailed skin, detailed texture, manga-style illustration, vibrant colors, full-length frame, High detail art, dynamic lighting with emphasis on contrast, intense focus on character, manga-inspired composition`,
    image: "/images/manga.png",
  },

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
