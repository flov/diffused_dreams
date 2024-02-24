export const spaceMarine = (gender: string) =>
  `A high fidelity photography of ${gender} space marine flying trough space Photography, detailed skin, detailed texture, photo-realistic, 8k, highly detailed, full length frame, High detail RAW color art, diffused soft lighting, shallow depth of field, sharp focus, cinematic lighting. In the style of Harry Potter.`;

export const fireFighter = (
  gender: string,
) => `A ${gender} firefighter in gear, holding cat in front of a burning building, looking at viewer, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, full length frame, High detail RAW color art, diffused soft lighting, shallow depth of field, sharp focus, hyperrealism, cinematic lighting
`;

export const wizard = (gender: string) =>
  `A full body portrait of a ${gender}  in majestic royal robes, in traditional attire wearing a crown, standing on the palace balcony overlooking an ancient kingdom with a vast river, looking at the camera, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, full length frame, wide shot, High detail RAW color art, diffused soft lighting, shallow depth of field, sharp focus, cinematic lighting`;

export const characters = (gender: string) => [
  { label: "slayer of cuteness", prompt: fireFighter(gender) },
  { label: "for the horde", prompt: spaceMarine(gender) },
  { label: "wizard", prompt: wizard(gender) },
];
