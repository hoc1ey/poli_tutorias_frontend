import type { Metadata } from "next";
import "./globals.css";
import { Footer, ModalRoot } from "@/components";
import { dancingScript, ibmPlexSans, inter, lato, montserrat } from "../config/fonts";

export const metadata: Metadata = {
  title: {
    template: '%s - PoliTutorías',
    default: 'PoliTutorías'
  },
  description: "Oferta y búsqueda de tutorías para estudiantes de la Escuela Politécnica Nacional.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`
        ${montserrat.variable} ${lato.variable} ${ibmPlexSans.variable} ${inter.variable} ${dancingScript.variable}
        bg-(--white-background) 
        flex flex-col 
        min-h-screen
        `}
      >
        <main className="grow">
          {children}
        </main>

        <ModalRoot />

        <Footer />
      </body>
    </html>
  );
}