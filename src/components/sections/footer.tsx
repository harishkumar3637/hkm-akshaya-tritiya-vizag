import { templeInfo } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-[#f0dec0] bg-[#fff7ea]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.7fr] lg:px-8">
        <div>
          <h3 className="font-serif text-3xl text-[#8b3a1f]">{templeInfo.title}</h3>
          <p className="mt-3 max-w-lg text-sm leading-7 text-[#8b3a1f]">
            Gupt Vrindavan Dham attracts devotees from around the world and offers a serene devotional experience rooted
            in seva, kirtan, and sacred remembrance.
          </p>
        </div>
        <div className="space-y-2 text-sm text-[#8b3a1f]">
          <p className="font-semibold uppercase tracking-[0.22em] text-[#8b3a1f]">Contact</p>
          <p>{templeInfo.phone}</p>
          <p>{templeInfo.email}</p>
          <p>{templeInfo.address}</p>
        </div>
        <div className="space-y-2 text-sm text-[#8b3a1f]">
          <p className="font-semibold uppercase tracking-[0.22em] text-[#8b3a1f]">Links</p>
          <a href="#donation-form" className="block transition-colors hover:text-[#9c4318]">
            Donate Now
          </a>
          <a href="#benefits" className="block transition-colors hover:text-[#8b3a1f]">
            Benefits
          </a>
          <a href="#" className="block transition-colors hover:text-[#8b3a1f]">
            Temple Info
          </a>
        </div>
      </div>
    </footer>
  );
}
