import Link from "next/link";
import { CITY_PAGES } from "@/lib/cities";

// Bloco "Outras cidades" no fim das páginas de cidade (links internos para SEO).
export function OtherCities({ currentSlug }: { currentSlug: string }) {
  const others = CITY_PAGES.filter((c) => c.slug !== currentSlug);
  return (
    <nav
      aria-labelledby="outras-cidades"
      className="border-t border-[var(--border-color)] bg-white py-10 sm:py-12"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="outras-cidades"
          className="text-center text-lg font-semibold text-[#111111]"
        >
          Catálogo digital para lojistas de outras cidades
        </h2>
        <ul className="mt-5 flex flex-wrap justify-center gap-2">
          {others.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/${city.slug}`}
                className="inline-block rounded-full border border-[var(--border-color)] bg-[var(--bg-warm-2)] px-4 py-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--palette-mid)] hover:text-[var(--palette-mid)]"
              >
                {city.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
