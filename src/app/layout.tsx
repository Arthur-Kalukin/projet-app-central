import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Projet App Central",
  description: "Arborescence Services > Clients > Points",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
