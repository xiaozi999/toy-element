export default function () {
  if (PROD) {
    const logo = `
_____________________________________________________________________________________________

████████  █████  ██    ██ ██       ██████  ██████      ███████ ██     ██ ██ ███████ ████████ 
   ██    ██   ██  ██  ██  ██      ██    ██ ██   ██     ██      ██     ██ ██ ██         ██    
   ██    ███████   ████   ██      ██    ██ ██████      ███████ ██  █  ██ ██ █████      ██    
   ██    ██   ██    ██    ██      ██    ██ ██   ██          ██ ██ ███ ██ ██ ██         ██    
   ██    ██   ██    ██    ███████  ██████  ██   ██     ███████  ███ ███  ██ ██         ██ 
_____________________________________________________________________________________________
                                the life of a showgirl
`;

    const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
`;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log("[EricUI]:dev mode...");
  }
}
