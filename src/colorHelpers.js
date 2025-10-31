import chroma from "chroma-js";
let levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

let generatePalette = (starterPalette) => {
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {},
  };
  for (let level of levels) {
    newPalette.colors[level] = [];
  }
  for (let color of starterPalette.colors) {
    let scale = getScale(color.color, 10).reverse();
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css("rgb").replace(/ /g, ","),
        rgba: chroma(scale[i])
          .css("rgba")
          .replace(/ /g, ",")
          .replace("/,1)", "1)")
          .replace("rgb", "rgba"),
      });
    }
  }
  return newPalette;
};

let getRange = (hexColor) => {
  const end = "#fff";
  return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
};

let getScale = (hexColor, numberOfColors) => {
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
};

let getTextColor = (color) => {
  if (chroma.contrast(color, "white") < 4.5) return "black";
  else return "white";
};

export { generatePalette, getTextColor };
