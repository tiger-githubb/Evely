"use client";

import Image from "next/image";
import logoLight from "@public/images/logos/logo-yala-light.png";

export const Logo = () => {
  return (
    <Image
      src={logoLight}
      alt="Yala Events Logo"
      width={120}
      height={50}
      className="object-contain logo-img"
      priority
    />
  );
};
