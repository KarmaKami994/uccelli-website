export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Uccelli Society",
    alternateName: "Verein Uccelli",
    url: "https://uccelli-society.ch",
    email: "uccelli.society@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Riedhofstrasse 364",
      addressLocality: "Zürich",
      postalCode: "8049",
      addressCountry: "CH",
    },
    sameAs: [
      "https://www.linkedin.com/company/uccelli-society",
      "https://www.instagram.com/uccelli_society/",
      "https://www.facebook.com/uccellisociety",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
