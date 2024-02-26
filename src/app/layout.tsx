import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SSingh.Net Music - Admin",
    description: "Admin site for SSingh.Net Music",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <a href="/">Home</a><br />
                <a href="/album">Album</a><br/>
                <a href="/artist">Artist</a><br/>
                <a href="/tag">Tag</a><br/>
                {children}
            </body>
        </html>
    );
}
