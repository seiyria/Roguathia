
export const Colors = [
  '#00f',   // blue
  '#0f0',   // green
  '#f00',   // red
  '#0ff',   // cyan
  '#f0f',   // magenta
  '#ff0',   // yellow
  
  '#aaf',   // lightblue
  '#afa',   // lightgreen
  '#faa',   // lightred
  '#aaf',   // lightcyan
  '#faf',   // lightmagenta
  '#ffa'    // lightyellow
];

export const GetColor = () => _.sample(Colors);