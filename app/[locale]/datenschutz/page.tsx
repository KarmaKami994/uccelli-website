import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – Uccelli Society",
  description: "Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten auf uccelli-society.ch.",
};

export default function DatenschutzPage() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-[700px] mx-auto">
        <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold mb-3">Datenschutzerklärung</h1>
        <div className="w-20 h-[3px] bg-black mb-10" />

        <div className="space-y-8 text-[15px] text-neutral-700 leading-[1.8]">
          <div>
            <h2 className="text-lg font-bold text-black mb-3">1. Verantwortliche Stelle</h2>
            <p>Verein Uccelli<br />Riedhofstrasse 364<br />8049 Zürich, Schweiz<br />E-Mail: uccelli.society@gmail.com</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-black mb-3">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
            <p>Beim Besuch unserer Website werden automatisch bestimmte Daten erhoben, die Ihr Browser an unseren Server übermittelt (sog. Server-Logfiles). Dies umfasst: Browsertyp und -version, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.</p>
            <p className="mt-3">Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-black mb-3">3. Kontaktformular</h2>
            <p>Wenn Sie uns über das Kontaktformular kontaktieren, werden die von Ihnen angegebenen Daten (Name, E-Mail-Adresse, Betreff, Nachricht) zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet und gespeichert. Diese Daten werden nicht an Dritte weitergegeben.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-black mb-3">4. Cookies</h2>
            <p>Unsere Website verwendet ausschliesslich technisch notwendige Cookies (z.B. für die Spracheinstellung). Tracking-Cookies oder Cookies zu Werbezwecken werden nicht eingesetzt. Sollte sich dies ändern, werden wir Sie über einen Cookie-Banner um Ihre Einwilligung bitten.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-black mb-3">5. Eingebettete Inhalte</h2>
            <p>Für die Kartenanzeige verwenden wir OpenStreetMap (Leaflet). OpenStreetMap setzt keine Tracking-Cookies und erfordert keine Einwilligung. Schriftarten (Lato) werden lokal von unserem Server geladen, nicht von Google Fonts.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-black mb-3">6. Ihre Rechte</h2>
            <p>Gemäss dem Schweizer Datenschutzgesetz (DSG/nDSG) haben Sie das Recht auf Auskunft über Ihre gespeicherten Daten, das Recht auf Berichtigung, Löschung oder Einschränkung der Verarbeitung sowie das Recht auf Datenübertragbarkeit. Zur Ausübung dieser Rechte wenden Sie sich bitte an die oben genannte Kontaktadresse.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-black mb-3">7. Änderungen</h2>
            <p>Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an geänderte rechtliche Rahmenbedingungen oder an Änderungen unserer Dienstleistungen anzupassen.</p>
            <p className="mt-3 text-neutral-400 text-[13px]">Stand: Juni 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}
