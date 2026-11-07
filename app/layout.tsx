import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Pocket Math | A Colorful Basic Calculator",
  description: "Simple sums, with a little extra color.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
