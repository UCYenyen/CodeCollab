import Link from "next/link";
import { Sparkles, X, Globe, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type FooterColumn = {
  heading: string;
  links: { label: string; href: string }[];
};

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Games Library", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Research Methodology", href: "#" },
      { label: "Download App", href: "#" },
    ],
  },
  {
    heading: "For Parents",
    links: [
      { label: "Parent Portal", href: "#" },
      { label: "Understanding Reports", href: "#" },
      { label: "Safety & Privacy", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: X, label: "X", href: "#" },
  { icon: Globe, label: "Website", href: "#" },
  { icon: Mail, label: "Email", href: "#" },
] as const;

function FooterColumn({ column }: { column: FooterColumn }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-sm font-bold text-primary">{column.heading}</h4>
      <ul className="flex flex-col gap-2.5">
        {column.links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-muted-foreground transition-colors hover:text-card"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-dark px-6 pb-6 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-5 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-xl text-card">BrainSpark</span>
            </Link>
            <p className="max-w-45 text-sm leading-relaxed text-muted-foreground">
              The brain game kids actually love. Making cognitive development
              fun, safe, and measurable.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-card/10 text-muted-foreground transition-colors hover:bg-card/20 hover:text-card"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <FooterColumn key={column.heading} column={column} />
          ))}
        </div>

        <Separator className="my-8 bg-card/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <p>© 2024 BrainSpark Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              COPPA Compliant
            </span>
            <Link href="#" className="transition-colors hover:text-card">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-card">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
