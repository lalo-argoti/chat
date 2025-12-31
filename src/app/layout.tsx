import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Funnelhot | AI Assistants Manager",
  description:
    "Web application to create, manage and train AI assistants for lead automation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header
            style={{
              backgroundColor: "var(--surface)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div className="mx-auto max-w-6xl px-6 py-4">
              <h1 className="text-lg font-semibold">
                Funnelhot · AI Assistants
              </h1>
              <p className="text-sm">
                Gestión y entrenamiento de asistentes IA
              </p>
            </div>
          </header>

          {/* Main */}
          <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer
            style={{
              backgroundColor: "var(--surface)",
              borderTop: "1px solid var(--border)",
            }}
          >
            <div className="mx-auto max-w-6xl px-6 py-4 text-sm">
              © {new Date().getFullYear()} Funnelhot · Technical Challenge
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
