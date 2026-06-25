import { Hero } from "@/components/sections/Hero";
import { PersonCard } from "@/components/ui/PersonCard";

const team = [
  { name: "Ato Akrofi", role: "Vereinspräsident" },
  { name: "Hatice Aksüt", role: "Head of Project Management" },
  { name: "Karim Moutiq", role: "Head of IT" },
];

export default function VorstandPage() {
  return (
    <>
      <Hero title="DER VORSTAND" variant="cutout" />
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {team.map((member) => (
            <PersonCard key={member.name} {...member} />
          ))}
        </div>
      </section>
    </>
  );
}
