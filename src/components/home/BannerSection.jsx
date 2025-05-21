
export default function BannerSection() {
    return (
    <section className="relative h-[180px] sm:h-[250px] md:h-[400px] overflow-hidden">
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-zinc-900/70"></div>
      <img
        src="https://placehold.co/300x200"
        alt="Banner do Cassino"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
    </section>
  );
}