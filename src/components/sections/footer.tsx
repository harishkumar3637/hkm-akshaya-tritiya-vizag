import { templeInfo } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-[var(--borderSubtle)] bg-[var(--cardRaisedBackground)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.7fr] lg:px-8">
        <div>
          <h3 className="font-serif text-3xl text-[var(--buttonPrimary)]">{templeInfo.title}</h3>
          <p className="mt-3 max-w-lg text-sm leading-7 text-[var(--buttonPrimary)]">
            Gupt Vrindavan Dham attracts devotees from around the world and offers a serene devotional experience rooted
            in seva, kirtan, and sacred remembrance.
          </p>
        </div>
        <div className="space-y-2 text-sm text-[var(--buttonPrimary)]">
          <p className="font-semibold uppercase tracking-[0.22em] text-[var(--buttonPrimary)]">Contact</p>
          <p>{templeInfo.phone}</p>
          <p>{templeInfo.email}</p>
          <p>{templeInfo.address}</p>
        </div>
        <div className="space-y-2 text-sm text-[var(--buttonPrimary)]">
          <p className="font-semibold uppercase tracking-[0.22em] text-[var(--buttonPrimary)]">Links</p>
          <a href="#donation-form" className="block transition-colors hover:text-[var(--buttonSecondary)]">
            Donate Now
          </a>
          <a href="#benefits" className="block transition-colors hover:text-[var(--buttonSecondary)]">
            Benefits
          </a>
          <a href="#" className="block transition-colors hover:text-[var(--buttonSecondary)]">
            Temple Info
          </a>
        </div>
      </div>
    </footer>
  );
}
