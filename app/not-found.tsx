import { Button } from "@/components/ui/Button";

export default function RootNotFound() {
  return (
    <html lang="de">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", textAlign: "center", padding: "2rem" }}>
        <div>
          <p style={{ fontSize: "80px", fontWeight: "bold", color: "#e5e5e5", margin: 0 }}>404</p>
          <h1 style={{ fontSize: "1.25rem", margin: "1rem 0 0.5rem" }}>Seite nicht gefunden</h1>
          <p style={{ color: "#737373", marginBottom: "2rem" }}>Die gesuchte Seite existiert nicht.</p>
          <a href="/" style={{ background: "#000", color: "#fff", padding: "12px 28px", borderRadius: "12px", textDecoration: "none", fontSize: "13px", fontWeight: "bold", letterSpacing: "0.12em", textTransform: "uppercase" }}>ZUR STARTSEITE</a>
        </div>
      </body>
    </html>
  );
}
