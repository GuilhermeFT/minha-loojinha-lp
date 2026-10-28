import Link from "next/link";
import { CITY_PAGES } from "@/lib/cities";

// Bloco "Outras cidades" no fim das páginas de cidade (links internos para SEO). Fica dentro da
// LP nova (.lp), então usa as cores dela (e o tema Black Friday).
export function OtherCities({ currentSlug }: { currentSlug: string }) {
  const others = CITY_PAGES.filter((c) => c.slug !== currentSlug);
  return (
    <nav
      aria-labelledby="outras-cidades"
      className="border-t border-[var(--hairline)] py-10 sm:py-12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="outras-cidades"
          className="lp-label text-[var(--text-2)]"
        >
          Catálogo digital para lojistas de outras cidades
        </h2>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {others.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/${city.slug}`}
                className="inline-flex min-h-11 items-center text-[1.02rem] text-[var(--text-2)] underline decoration-[var(--hairline)] underline-offset-4 transition-colors hover:text-[var(--action-text)] hover:decoration-current"
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
