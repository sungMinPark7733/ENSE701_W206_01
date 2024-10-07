
import "./globals.css";
import Navbar from "@/components/Navbar";
import SubmitArticlePage from "@/app/pages/submit/page";
import BrowsePage from "@/app/pages/browse/page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar></Navbar>
        <SubmitArticlePage></SubmitArticlePage>
      </body>
    </html>
  );
}
