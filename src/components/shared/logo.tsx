import Image from "next/image";
import logoYala from "@public/images/logos/logo-yala.png";

export const Logo = () => {
    return (
        <Image
            src={logoYala}
            alt="Yala Events Logo"
            width={120}
            height={50}
            className="object-contain"
        />
    );
};