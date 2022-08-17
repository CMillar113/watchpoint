import React from "react";
import Image from "next/image";

import Logo from "../assets/watchpointLogo.jpg";

export default function FullScreenSpinner() {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center flex-col">
      <h2>Loading...</h2>
      <Image src={Logo} alt="Logo" height={64} width={64} />
    </div>
  );
}
