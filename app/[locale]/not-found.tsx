import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-[80px] lg:text-[120px] font-bold leading-none text-neutral-200 select-none">404</p>
        <h1 className="text-xl font-bold mt-4 mb-3">Seite nicht gefunden</h1>
        <p className="text-neutral-500 mb-8 leading-relaxed">Die gesuchte Seite existiert nicht oder wurde verschoben. Vielleicht findest du hier, was du suchst:</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" href="/">ZUR STARTSEITE</Button>
          <Button variant="secondary" href="/kontakt">KONTAKT</Button>
        </div>
      </div>
    </section>
  );
}
