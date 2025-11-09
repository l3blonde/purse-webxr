import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "WebXR Purse VR",
    description:
        "Interactive 3D purse viewer with WebXR support - view and interact with a 3D purse model in virtual reality",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <body className={`font-sans antialiased`} suppressHydrationWarning>
        {children}
        </body>
        </html>
    )
}
