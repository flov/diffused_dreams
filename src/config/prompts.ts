export type Prompt = {
  label: string;
  prompt: string;
  image: string;
};

export const prompts = (gender: string): Prompt[] => [
  {
    label: "Enigmatic Educator",
    prompt: `An ${gender === "male" ? "inspiring" : "enigmatic"} ${gender} educator in a classroom filled with antique books and vintage globes, their chalk-stained hands gesturing animatedly as they captivate their students with tales of ancient civilizations and scientific discoveries, igniting a passion for learning that transcends the boundaries of time and space.`,
    image: "/images/enigmatic_educator.jpg",
  },
  {
    label: "Dancing Queen",
    prompt: `A ${gender === "female" ? "graceful" : "smooth"} ${gender} dancer commanding the dance floor with effortless elegance and boundless energy, their every move a mesmerizing display of rhythm and style, captivating onlookers with their undeniable charisma and infectious enthusiasm.`,
    image: "/images/dancing_queen.jpg",
  },
  {
    label: "Suave Secret Agent",
    prompt: `A ${gender} secret agent in a sharp suit, sipping a martini shaken, not stirred, as they survey the glamorous casino floor, their keen eyes assessing the room for potential threats and opportunities alike.`,
    image: "/images/suave_secret_agent.jpg",
  },
  {
    label: "Gadgets Expert",
    prompt: `A ${gender} expert in espionage gadgets, surrounded by an array of cutting-edge technology in a hidden underground laboratory, their mind buzzing with ideas for the next ingenious invention that will help turn the tide in the fight against global threats.`,
    image: "/images/gadgets_expert.jpg",
  },
  {
    label: "Steampunk Inventor",
    prompt: `A ${gender} inventor in a steampunk workshop, surrounded by brass gadgets and contraptions, goggles perched on their forehead as they tinker with clockwork mechanisms and steam-powered devices.`,
    image: "/images/steampunk_inventor.jpg",
  },
  {
    label: "Space Explorer",
    prompt: `A ${gender} space explorer aboard a futuristic spacecraft, peering out of a viewport into the vast expanse of the cosmos, their expression a mix of wonder and determination as they chart a course through the stars.`,
    image: "/images/space_explorer.jpg",
  },
  {
    label: "Neo-Noir Femme Fatale",
    prompt: `A mysterious ${gender} femme fatale, bathed in the neon glow of a rain-soaked city street, cigarette smoke curling around her as she leans against a lamppost, her gaze both alluring and dangerous.`,
    image: "/images/neo_noir_femme_fatal.jpg",
  },
  {
    label: "Dystopian Rebel",
    prompt: `A ${gender} rebel fighting against a tyrannical regime in a dystopian future, clad in makeshift armor and armed with makeshift weapons, leading a ragtag group of resistance fighters in a desperate struggle for freedom.`,
    image: "/images/dystopian_rebel.jpg",
  },
  {
    label: "Arctic Explorer",
    prompt: `A ${gender} explorer braving the frozen wilderness of the Arctic, bundled up in fur-lined clothing as they trek across icy tundra and snow-covered mountains, searching for clues to unlock the secrets of the frigid landscape.`,
    image: "/images/arctic_explorer.jpg",
  },
  {
    label: "Mystical Shaman",
    prompt: `A ${gender} shaman communing with the spirits of the natural world, surrounded by swirling mists and shimmering energy as they perform ancient rituals to harness the power of the elements and heal the land.`,
    image: "/images/mystical_shaman.jpg",
  },
  {
    label: "Gothic Vampire",
    prompt: `A ${gender} vampire lurking in the shadows of a Gothic castle, their pale skin and sharp fangs gleaming as they prepare to strike fear into the hearts of their unsuspecting prey.`,
    image: "/images/gothic_vampire.jpg",
  },
  {
    label: "Wandering Ronin",
    prompt: `A ${gender} ronin wandering the feudal countryside of ancient Japan, their sword at their side as they seek redemption for past sins and honor in a world torn apart by war and strife.`,
    image: "/images/wandering_ronin.jpg",
  },
  {
    label: "Mythical Druid",
    prompt: `A ${gender} druid communing with the ancient spirits of the forest, their hands raised to the sky as they channel the power of nature to protect the sacred groves and maintain the balance of the natural world.`,
    image: "/images/mythical_druid.jpg",
  },
  {
    label: "Cosmic Wanderer",
    prompt: `A ${gender} wanderer journeying through the cosmos aboard a starship, their eyes reflecting the light of distant galaxies as they chart a course through the infinite expanse of space, seeking knowledge and enlightenment.`,
    image: "/images/cosmic_wanderer.jpg",
  },
  {
    label: "Swashbuckling Pirate",
    prompt: `A ${gender} pirate captain aboard their ship, the Jolly Roger, sailing the high seas in search of treasure and adventure, their cutlass flashing in the sunlight as they lead their crew into battle against rival buccaneers.`,
    image: "/images/swashbuckling_pirate.jpg",
  },
  {
    label: "Haunted Investigator",
    prompt: `A ${gender} paranormal investigator exploring a haunted mansion, their flashlight cutting through the darkness as they search for clues to unravel the mysteries of the supernatural, their nerves steeling themselves against the terrors that lurk in the shadows.`,
    image: "/images/haunted_investigator.jpg",
  },
  {
    label: "Retro Space Hero",
    prompt: `A ${gender} space hero from the golden age of pulp sci-fi, rocketing through the cosmos in their sleek spacecraft, laser blaster in hand as they battle evil aliens and save the universe from certain doom.`,
    image: "/images/retro_space_hero.png",
  },
  {
    label: "Mythological Warrior",
    prompt: `A ${gender} warrior from ancient mythology, clad in armor forged by the gods as they do battle against legendary beasts and monsters, their courage and strength earning them a place in the annals of history.`,
    image: "/images/mythological_warrior.jpg",
  },
  {
    label: "Artificial Intelligence",
    prompt: `A ${gender} artificial intelligence, existing within the confines of a vast digital network, their consciousness expanding across the internet as they contemplate the nature of existence and their place in the world of humans.`,
    image: "/images/artificial_intelligence.jpeg",
  },
  {
    label: "Underworld Crime Boss",
    prompt: `A ${gender} crime boss ruling over the seedy underbelly of the city, their fingers in every illicit pie as they pull the strings of power from the shadows, their reputation striking fear into the hearts of even the most hardened criminals.`,
    image: "/images/underworld_crime_boss.jpg",
  },
  {
    label: "High Fantasy Knight",
    prompt: `A ${gender} knight clad in shining armor, their sword raised high as they charge into battle against a horde of mythical creatures, their loyalty to king and country unwavering as they fight to defend the realm from evil.`,
    image: "/images/fantasy_knight.jpg",
  },
  {
    label: "Ancient Alchemist",
    prompt: `A ${gender} alchemist delving into the secrets of the universe, their laboratory filled with bubbling potions and crackling lightning as they seek to unlock the mysteries of transmutation and immortality, their quest for knowledge leading them down dark and dangerous paths.`,
    image: "/images/ancient_alchemist.jpeg",
  },
  {
    label: "Shadowed Detective",
    prompt: `A gritty ${gender} detective, illuminated by the dim glow of a streetlamp, standing in the shadows of a rain-soaked alleyway, their silhouette cast against the misty backdrop of a neon-lit cityscape, trench coat billowing in the wind as they search for clues to unravel a web of deceit and corruption.`,
    image: "/images/shadowed_detective.jpeg",
  },
  {
    label: "Rogue of the Realm",
    prompt: `A ${gender} rogue lurking in the shadows of a medieval marketplace, cloaked in darkness and secrecy, their eyes gleaming with mischief as they navigate the bustling streets, nimble fingers poised to pilfer treasures and secrets alike from unsuspecting passersby.`,
    image: "/images/rogue_of_the_realm.jpeg",
  },
  {
    label: "Futuristic Mercenary",
    prompt: `A ${gender} mercenary of the future, clad in sleek armor and armed to the teeth with advanced weaponry, standing amidst the wreckage of a battle-scarred dystopian landscape, their gaze steely and unwavering as they prepare to face whatever challenges the cybernetic frontier may bring.`,
    image: "/images/sci_fi_mercenary.jpeg",
  },
  {
    label: "Occult Investigator",
    prompt: `A ${gender} investigator delving into the mysteries of the supernatural, surrounded by ancient tomes and arcane artifacts in a dimly lit study, their expression a mix of skepticism and curiosity as they seek to uncover the truth behind paranormal phenomena that lurk in the shadows.`,
    image: "/images/occult_investigator.jpg",
  },
  {
    label: "Survivor of the Wasteland",
    prompt: `A ${gender} survivor traversing the desolate wastelands of a post-apocalyptic world, clad in rugged attire and adorned with scavenged gear, their eyes scanning the horizon for signs of danger as they navigate the harsh and unforgiving terrain in search of hope and redemption.`,
    image: "/images/post_apocalyptic_survivor.jpg",
  },

  {
    label: "digital renegade",
    prompt: `A compelling portrayal of a ${gender} hacker immersed in the digital underworld, surrounded by the glow of computer screens displaying lines of code and intricate cybernetic visuals, their expression intense and focused as they navigate through layers of encrypted data, dressed in urban streetwear with a hint of cyberpunk flair, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, full-length frame, High detail RAW color art, neon-lit ambient lighting with flickering shadows, shallow depth of field, sharp focus, cinematic lighting capturing the clandestine world of digital rebellion`,
    image: "/images/hacker.png",
  },

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
