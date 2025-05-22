import type { Metadata } from "next";
// custom font
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GenomicsAI - AI-Powered Genetic Mutation Analysis Tool",
    template: "%s | GenomicsAI"
  },
  description: "Advanced biotech AI tool for genetic mutation analysis. Search genes, simulate DNA mutations, and get AI-powered pathogenicity predictions using Evo2 model. Perfect for researchers, doctors, and bio students studying genomics and precision medicine.",
  keywords: [
    "genetic mutation analysis",
    "biotech AI tool",
    "DNA sequence analysis",
    "pathogenicity prediction",
    "Evo2 model",
    "genomics research",
    "genetic variants",
    "BRCA1 analysis",
    "clinical genetics",
    "bioinformatics",
    "SNV analysis",
    "ClinVar database",
    "genetic testing",
    "precision medicine",
    "genomic AI",
    "gene sequencing",
    "mutation prediction",
    "healthcare AI"
  ],
  authors: [{ name: "Sehaj Makkar", url: "https://sehajmakkar.xyz" }],
  creator: "Sehaj Makkar",
  publisher: "KryptoKodes",
  category: "Biotechnology",
  
  // Open Graph metadata for social sharing
  openGraph: {
    title: "GenomicsAI - AI-Powered Genetic Mutation Analysis",
    description: "Revolutionary biotech AI tool for analyzing genetic mutations and predicting pathogenicity using advanced machine learning models. Built for researchers, doctors, and bio students.",
    url: "https://genomicsai.com", // Replace with your actual domain
    siteName: "GenomicsAI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/twitter-card.png", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "GenomicsAI - Genetic Mutation Analysis Tool Interface",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    site: "@sehajmakkarr",
    creator: "@sehajmakkarr", 
    title: "GenomicsAI - AI-Powered Genetic Mutation Analysis",
    description: "Advanced biotech AI tool for genetic mutation analysis using Evo2 model. Perfect for researchers and healthcare professionals.",
    images: ["/twitter-card.png"],
  },

  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Alternate languages and canonical
  alternates: {
    canonical: "https://genomicsai.com", // Replace with your actual domain
    languages: {
      "en-US": "https://genomicsai.com",
    },
  },

  // App-specific metadata
  applicationName: "GenomicsAI",
  referrer: "origin-when-cross-origin",
  
  // Enhanced icons configuration
  icons: {
    icon: [
      { url: '/favi.png', sizes: '32x32', type: 'image/png' },
      { url: '/favi.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: '/favi.png',
    apple: [
      { url: '/favi.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/favi.png',
      },
    ],
  },


  // Additional meta tags
  other: {
    "application-name": "GenomicsAI",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "GenomicsAI",
    "format-detection": "telephone=no",
    "theme-color": "#EAEEFE", 
    "color-scheme": "light",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional SEO meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Schema.org structured data for better Google understanding */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "GenomicsAI",
              "description": "Advanced biotech AI tool for genetic mutation analysis and pathogenicity prediction using Evo2 model",
              "url": "https://genomicsai.com", // Replace with your domain
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Person",
                "name": "Sehaj Makkar",
                "url": "https://sehajmakkar.xyz"
              },
              "publisher": {
                "@type": "Organization",
                "name": "KryptoKodes"
              },
              "featureList": [
                "Gene sequence search and analysis",
                "DNA mutation simulation",
                "AI-powered pathogenicity prediction",
                "ClinVar database integration",
                "Evo2 model analysis",
                "BRCA1 and other gene analysis",
                "Single Nucleotide Variant (SNV) processing"
              ],
              "audience": {
                "@type": "Audience",
                "audienceType": ["Medical Researchers", "Healthcare Professionals", "Biology Students", "Genetic Counselors", "Bioinformatics Specialists"]
              },
              "about": [
                {
                  "@type": "Thing",
                  "name": "Genetic Analysis"
                },
                {
                  "@type": "Thing", 
                  "name": "Biotechnology"
                },
                {
                  "@type": "Thing",
                  "name": "Artificial Intelligence"
                },
                {
                  "@type": "Thing",
                  "name": "Genomics"
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={
          twMerge(
            inter.className, 
            "antialiased bg-[#EAEEFE]"
          )  
        }
      >
        {children}
      </body>
    </html>
  );
}