import Image from "next/image";

type GalleryItem = { src: string; alt: string };
type RecordingItem = { title: string; url: string };
type ReportItem = { title: string; url: string; date: string };

/**
 * One of the three Conference Proceedings sub-sections (Gallery, Recordings,
 * Reports). Each renders its items if any exist, or an honest empty state
 * if not — no placeholder photos/links are ever invented.
 */
export function GallerySubsection({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) {
    return (
      <EmptyState message="Photos from the Conclave will be added here after the event." />
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {items.map((item) => (
        <div key={item.src} className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image src={item.src} alt={item.alt} fill sizes="25vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

export function RecordingsSubsection({ items }: { items: RecordingItem[] }) {
  if (items.length === 0) {
    return (
      <EmptyState message="Session recordings will be linked here if and when they're made available." />
    );
  }
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.url}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-gray-200 bg-white p-4 font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-green-dark"
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ReportsSubsection({ items }: { items: ReportItem[] }) {
  if (items.length === 0) {
    return <EmptyState message="Conference reports will be published here after the event." />;
  }
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.url}
          className="flex flex-col justify-between gap-1 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:items-center"
        >
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-green-dark"
          >
            {item.title}
          </a>
          <span className="text-sm text-gray-500">{item.date}</span>
        </li>
      ))}
    </ul>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <p className="rounded-xl border border-dashed border-brand-gold/40 bg-brand-sand/20 px-6 py-10 text-center text-sm text-gray-600">
      {message}
    </p>
  );
}
