interface PersonCardProps {
  name: string;
  role: string;
  imageSrc?: string;
}

export function PersonCard({ name, role, imageSrc }: PersonCardProps) {
  return (
    <div className="text-center group">
      <div className="aspect-[3/4] w-full max-w-[280px] mx-auto overflow-hidden rounded-[4px] bg-neutral-200 mb-5">
        {imageSrc ? (
          <img src={imageSrc} alt={name} className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
            <span className="text-5xl font-bold text-neutral-400/50">{name.charAt(0)}</span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold uppercase tracking-wide">{name}</h3>
      <p className="text-[14px] text-neutral-500 mt-1">{role}</p>
    </div>
  );
}
