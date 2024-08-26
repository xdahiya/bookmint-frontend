import localFont from "next/font/local";
import React from "react";

const furoreFont = localFont({
  src: "../public/FuroreFont.otf",
  variable: "--font-furore",
});

function LogoComponent() {
  return (
    <>
      {" "}
      {/* <Image alt="logo " src="/logo.png" width={200} height={50} /> */}
      <h1 className={`${"text-2xl"} ${furoreFont.className}`}>
        <span className="text-primary">Book</span>
        <span className="text-[#18977F]">mint</span>
      </h1>
    </>
  );
}

export default LogoComponent;
