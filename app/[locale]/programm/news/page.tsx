import { Hero } from "@/components/sections/Hero";
import { Card } from "@/components/ui/Card";

const posts = [
  { title: "Neue Partnerschaft mit Royal Studio", body: "Wir dürfen eine aufregende neue Partnerschaft bekannt geben, die die Art und Weise, wie wir Erlebnisse schaffen und festhalten, auf ein neues Level heben wird.", date: "2025-04-15" },
  { title: "Danke an unsere Gründungsmitglieder", body: "In der Hektik neuer Projekte vergisst man manchmal, innezuhalten und denen zu danken, die von Anfang an da waren. Die, die das Fundament legen.", date: "2025-03-20" },
  { title: "Partnerschaft mit Anker Swiss AG", body: "Wir bei Uccelli Society arbeiten jeden Tag daran, unser Netzwerk zu erweitern, um euch die bestmögliche Unterstützung auf eurem Weg zu bieten.", date: "2025-02-28" },
];

export default function NewsPage() {
  return (
    <>
      <Hero title="NEWS" variant="split" subtitle="Neuigkeiten aus der Uccelli Society" />
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.title} title={post.title} body={post.body} buttonText="WEITERLESEN" />
          ))}
        </div>
      </section>
    </>
  );
}
