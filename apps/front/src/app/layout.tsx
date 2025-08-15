import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
    title: "Prompt Optimizer",
    description: "Gemini-powered prompt upgrading",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
        <body className="bg-background text-foreground min-h-screen">
        <header className="sticky top-0 z-10 w-full border-b border-foreground/20 bg-header backdrop-blur">
            <div className="px-5 py-5 flex items-center justify-center">
                <h1 className="text-xl font-bold">Prompt Optimizer (Gemini)</h1>
            </div>
        </header>
        <main className="bg-main px-5 py-6 pb-10">
            {children}
        </main>
        </body>
        </html>
    );
}
