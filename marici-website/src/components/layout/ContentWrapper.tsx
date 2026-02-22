"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

export default function ContentWrapper({
    children,
    settings,
}: {
    children: React.ReactNode;
    settings: any;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar settings={settings} />
            <main className="flex-grow pt-[88px]">{children}</main>
            <Footer settings={settings} />
            <WhatsAppButton phone={settings?.whatsappNumber} />
        </>
    );
}
