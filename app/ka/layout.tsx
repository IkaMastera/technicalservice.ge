import type { Metadata } from "next";
 
export const metadata: Metadata = {
  alternates: {
    canonical: "https://technicalservice.ge/ka",
    languages: {
      "en": "https://technicalservice.ge/en",
      "ka": "https://technicalservice.ge/ka",
    },
  },
};
 
export default function KaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "'Mersad', sans-serif" }}>
      {children}
    </div>
  );
}
 