import Link from "next/link";

const footerLinks = {
  product: [{ label: "Login", href: "/login" }],
  company: [
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Política de Privacidade", href: "/politica-de-privacidade" },
    { label: "Politica de Reembolso", href: "/politica-de-reembolso" },
  ],
  support: [{ label: "Contato", href: "/contato" }],
};

export function Footer() {
  return (
    <footer className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <Link href="/" className="text-xl font-bold">
            WhatsApp
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Dashboard</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
