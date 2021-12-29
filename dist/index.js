"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import NPM pakages and code system key
require("colors");
const prompt = require("prompt");
const enums_1 = require("./customTypings/enums");
// Encode a card's info
const encode = () => __awaiter(void 0, void 0, void 0, function* () {
    // Get the card info from the user via cmd prompt
    prompt.start();
    const { set, color, artist } = yield prompt.get([
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
        setCode: enums_1.CardSets[set],
        colorCode: enums_1.Colors[color],
        artistCode: enums_1.Artists[artist],
    };
    // Log result to the user and return it for programatic use
    console.log(`${cardCodes.setCode}-${cardCodes.colorCode}${cardCodes.artistCode}`.yellow);
    return `${cardCodes.setCode}-${cardCodes.colorCode}${cardCodes.artistCode}`;
});
// Decode a provided card code
const decode = () => __awaiter(void 0, void 0, void 0, function* () {
    // Get the code from the user via cmd prompt
    prompt.start();
    const { code } = yield prompt.get([
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
        set: enums_1.CardSets[code.toString().split("-")[0]],
        color: enums_1.Colors[numericCodes.substring(0, 3)],
        artist: enums_1.Artists[numericCodes.substring(3, 6)],
    };
    // Log result to the user and return it for programatic use
    console.log("Set is: ".green + `${card.set}`.yellow);
    console.log("Color is: ".green + `${card.color}`.yellow);
    console.log("Artist is: ".green + `${card.artist}`.yellow);
    return { set: card.set, color: card.color, artist: card.artist };
});
// Run our functions (one by one)
encode().then(() => {
    decode();
});
//# sourceMappingURL=index.js.map