import { Inter, Lora, Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";

const furoreFont = localFont({
  src: "../public/FuroreFont.otf",
  variable: "--font-furore",
});

// define your variable fonts
// const inter = Inter();
// const lora = Lora();
// define 2 weights of a non-variable font
// const sourceCodePro400 = Source_Sans_3({ weight: "400" });
// const sourceCodePro700 = Source_Sans_3({ weight: "700" });

export { furoreFont };
