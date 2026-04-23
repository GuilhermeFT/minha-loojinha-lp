import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

function isInternalHref(href?: string): boolean {
  if (!href) return false
  return href.startsWith('/') || href.startsWith('#')
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: ComponentPropsWithoutRef<'h1'>) => (
      <h1
        className="mt-10 mb-6 text-3xl md:text-4xl font-bold text-[var(--palette-darkest)]"
        {...props}
      />
    ),
    h2: (props: ComponentPropsWithoutRef<'h2'>) => (
      <h2
        className="mt-10 mb-4 text-2xl md:text-3xl font-bold text-[var(--palette-darkest)]"
        {...props}
      />
    ),
    h3: (props: ComponentPropsWithoutRef<'h3'>) => (
      <h3
        className="mt-8 mb-3 text-xl md:text-2xl font-semibold text-[var(--palette-dark)]"
        {...props}
      />
    ),
    p: (props: ComponentPropsWithoutRef<'p'>) => (
      <p
        className="my-5 text-base leading-relaxed text-[var(--text-secondary)]"
        {...props}
      />
    ),
    ul: (props: ComponentPropsWithoutRef<'ul'>) => (
      <ul
        className="my-5 list-disc pl-6 space-y-2 text-[var(--text-secondary)]"
        {...props}
      />
    ),
    ol: (props: ComponentPropsWithoutRef<'ol'>) => (
      <ol
        className="my-5 list-decimal pl-6 space-y-2 text-[var(--text-secondary)]"
        {...props}
      />
    ),
    li: (props: ComponentPropsWithoutRef<'li'>) => (
      <li className="leading-relaxed" {...props} />
    ),
    blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
      <blockquote
        className="my-6 border-l-4 border-[var(--palette-mid)] bg-[var(--gradient-soft)] px-5 py-3 text-[var(--text-secondary)] italic rounded-r-lg"
        {...props}
      />
    ),
    a: ({ href, children, ...rest }: ComponentPropsWithoutRef<'a'>) => {
      const className =
        'text-[var(--palette-dark)] underline underline-offset-2 hover:text-[var(--palette-mid)] transition-colors'
      if (isInternalHref(href)) {
        return (
          <Link href={href ?? '#'} className={className}>
            {children}
          </Link>
        )
      }
      return (
        <a
          href={href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </a>
      )
    },
    strong: (props: ComponentPropsWithoutRef<'strong'>) => (
      <strong
        className="font-semibold text-[var(--palette-darkest)]"
        {...props}
      />
    ),
    hr: (props: ComponentPropsWithoutRef<'hr'>) => (
      <hr
        className="my-10 border-0 border-t border-[hsl(var(--border))]"
        {...props}
      />
    ),
    code: (props: ComponentPropsWithoutRef<'code'>) => (
      <code
        className="rounded-md bg-[var(--bg-warm-2)] px-1.5 py-0.5 text-[0.92em] font-mono text-[var(--palette-darkest)] [pre_&]:bg-transparent [pre_&]:p-0 [pre_&]:text-[0.95em] [pre_&]:text-[var(--foreground)]"
        {...props}
      />
    ),
    pre: (props: ComponentPropsWithoutRef<'pre'>) => (
      <pre
        className="my-6 overflow-x-auto rounded-lg border border-[hsl(var(--border))] bg-[var(--bg-warm-2)] px-5 py-4 text-sm leading-relaxed font-mono text-[var(--foreground)] shadow-[var(--shadow-soft)]"
        {...props}
      />
    ),
    ...components,
  }
}
