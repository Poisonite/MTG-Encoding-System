// Import NPM pakages and code system key
import "colors";
import prompt = require("prompt");
import { CardSets, Colors, Artists } from "./customTypings/enums";

// Encode a card's info
const encode = async () => {
  // Get the card info from the user via cmd prompt
  prompt.start();
  const { set, color, artist } = await prompt.get([
    {
      name: "set",
      description: "Card Set",
      type: "string",
      required: true,
    },
    {
      name: "color",
      description: "Card Colors (space seperated)",
      type: "string",
      required: true,
    },
    {
      name: "artist",
      description: "Card Artist",
      type: "string",
      required: true,
    },
  ]);

  // Get the code for each card section provided
  const cardCodes = {
    setCode: CardSets[set as keyof typeof CardSets],
    colorCode: Colors[color as keyof typeof Colors],
    artistCode: Artists[artist as keyof typeof Artists],
  };

  // Log result to the user and return it for programatic use
  console.log(
    `${cardCodes.setCode}-${cardCodes.colorCode}${cardCodes.artistCode}`.yellow
  );
  return `${cardCodes.setCode}-${cardCodes.colorCode}${cardCodes.artistCode}`;
};

// Decode a provided card code
const decode = async () => {
  // Get the code from the user via cmd prompt
  prompt.start();
  const { code } = await prompt.get([
    {
      name: "code",
      description: "Enter MTG Card Code",
      type: "string",
      required: true,
    },
  ]);

  // Define The non-set portions of the code
  const numericCodes = code.toString().split("-")[1];
  // Break the code into each section
  const card = {
    set: CardSets[code.toString().split("-")[0] as keyof typeof CardSets],
    color: Colors[numericCodes.substring(0, 3) as keyof typeof Colors],
    artist: Artists[numericCodes.substring(3, 6) as keyof typeof Artists],
  };

  // Log result to the user and return it for programatic use
  console.log("Set is: ".green + `${card.set}`.yellow);
  console.log("Color is: ".green + `${card.color}`.yellow);
  console.log("Artist is: ".green + `${card.artist}`.yellow);
  return { set: card.set, color: card.color, artist: card.artist };
};

// Run our functions (one by one)
encode().then(() => {
  decode();
});
