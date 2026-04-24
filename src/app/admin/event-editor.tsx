"use client";

import Image from "next/image";
import { useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import type { EventCmsContent } from "@/data/events/cms";
import { eventCmsContentSchema } from "@/data/events/schema";
import { themeOptions } from "@/lib/themes";

type EventCmsEditorProps = {
  initialEvent: EventCmsContent;
  initialSource: "database" | "static";
};

type SaveState = {
  tone: "idle" | "success" | "error";
  message: string;
};

type DonationMode = "recent" | "generous";

type PanelKey =
  | "dashboard"
  | "theme"
  | "hero-posters"
  | "donation-highlights"
  | "overview"
  | "importance"
  | "impact"
  | "donor-privileges"
  | "seva-grid"
  | "gallery";

type DonationRow = {
  id: string;
  name: string;
  amount: number;
  time: string;
  avatar: string;
  seva: string;
};

type ChartPoint = {
  label: string;
  value: number;
};

const menuItems: { id: PanelKey; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "theme", label: "Theme" },
  { id: "hero-posters", label: "hero-posters" },
  { id: "donation-highlights", label: "Donation Highlights" },
  { id: "overview", label: "overview" },
  { id: "importance", label: "Importance" },
  { id: "impact", label: "Impact" },
  { id: "donor-privileges", label: "Donar Privileges" },
  { id: "seva-grid", label: "Seva Grid" },
  { id: "gallery", label: "Gallery" },
];

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function buildDonorRows(event: EventCmsContent, mode: DonationMode): DonationRow[] {
  const list = mode === "recent" ? event.contributors.recent : event.contributors.generous;

  return list.map((donor, index) => ({
    id: `${mode}-${donor.name}-${index}`,
    name: donor.name,
    amount: donor.amount,
    time: donor.time,
    avatar: donor.avatar,
    seva: event.donationHighlights.items[index % event.donationHighlights.items.length]?.title ?? "Seva",
  }));
}

function buildTimeSeries(event: EventCmsContent): ChartPoint[] {
  const labels = ["18 Apr", "19 Apr", "20 Apr", "21 Apr", "22 Apr", "23 Apr", "24 Apr"];
  const allAmounts = [...event.contributors.recent, ...event.contributors.generous].map((item) => item.amount);

  return labels.map((label, index) => ({
    label,
    value:
      allAmounts.reduce((sum, amount, amountIndex) => sum + (((amountIndex + index) % labels.length) + 1) * amount * 0.02, 0) +
      12000 +
      index * 2600,
  }));
}

function linePath(points: ChartPoint[], width: number, height: number, padding: number) {
  if (!points.length) {
    return "";
  }

  const values = points.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);
  const step = points.length > 1 ? (width - padding * 2) / (points.length - 1) : 0;

  return points
    .map((point, index) => {
      const x = padding + step * index;
      const y = height - padding - ((point.value - min) / range) * (height - padding * 2);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function areaPath(path: string, width: number, height: number, padding: number) {
  if (!path) {
    return "";
  }

  return `${path} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;
}

function TextInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span>{label}</span>
      <input
        className="rounded-[12px] border border-[#d4c2af] bg-white px-3 py-2 outline-none focus:border-[#b4763c]"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

function TextAreaInput({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span>{label}</span>
      <textarea
        className="rounded-[12px] border border-[#d4c2af] bg-white px-3 py-2 outline-none focus:border-[#b4763c]"
        rows={rows}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

function TimeSeriesChart({ points }: { points: ChartPoint[] }) {
  const width = 900;
  const height = 320;
  const padding = 52;
  const values = points.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);
  const step = points.length > 1 ? (width - padding * 2) / (points.length - 1) : 0;
  const path = linePath(points, width, height, padding);
  const fill = areaPath(path, width, height, padding);
  const yAxisTicks = Array.from({ length: 5 }, (_, index) => {
    const value = max - (range / 4) * index;
    const y = padding + ((height - padding * 2) / 4) * index;

    return {
      label: currencyFormatter.format(Math.round(value)),
      y,
    };
  });

  return (
    <div className="h-full w-full overflow-x-auto">
      <svg className="h-full min-w-[640px] w-full" viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="series-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#facc15" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {yAxisTicks.map((tick) => (
          <g key={tick.label}>
            <line x1={padding} x2={width - padding} y1={tick.y} y2={tick.y} stroke="#e5e7eb" strokeDasharray="5 6" />
            <text x={padding - 10} y={tick.y + 4} fontSize="12" textAnchor="end" fill="#6b7280">
              {tick.label}
            </text>
          </g>
        ))}
        <line x1={padding} x2={padding} y1={padding} y2={height - padding} stroke="#d1d5db" strokeWidth="1.5" />
        <line x1={padding} x2={width - padding} y1={height - padding} y2={height - padding} stroke="#d1d5db" strokeWidth="1.5" />
        <path d={fill} fill="url(#series-fill)" />
        <path d={path} fill="none" stroke="#f4b400" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
        {points.map((point, index) => {
          const x = padding + step * index;
          const y = height - padding - ((point.value - min) / range) * (height - padding * 2);
          return (
            <g key={point.label}>
              <circle cx={x} cy={y} r="5" fill="#ffffff" stroke="#f4b400" strokeWidth="2" />
              <text x={x} y={height - padding + 22} fontSize="12" textAnchor="middle" fill="#6b7280">
                {point.label}
              </text>
            </g>
          );
        })}
        <text x={width / 2} y={height - 10} fontSize="12" textAnchor="middle" fill="#6b7280">
          X-axis
        </text>
        <text x={18} y={height / 2} fontSize="12" textAnchor="middle" fill="#6b7280" transform={`rotate(-90 18 ${height / 2})`}>
          Y-axis
        </text>
      </svg>
    </div>
  );
}

function FormSection({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="rounded-[14px] border border-[#e5e7eb] bg-white p-4">
      {title ? <div className="mb-4 text-sm font-medium">{title}</div> : null}
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

export function EventCmsEditor({ initialEvent, initialSource: _initialSource }: EventCmsEditorProps) {
  const [event, setEvent] = useState<EventCmsContent>(initialEvent);
  const [saveState, setSaveState] = useState<SaveState>({ tone: "idle", message: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelKey>("dashboard");
  const [donationMode, setDonationMode] = useState<DonationMode>("recent");

  const validation = useMemo(() => {
    try {
      eventCmsContentSchema.parse(event);
      return { valid: true, error: "" };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : "Invalid content",
      };
    }
  }, [event]);

  const donationRows = buildDonorRows(event, donationMode);
  const chartPoints = buildTimeSeries(event);
  const totalRaised = event.contributors.generous.reduce((sum, item) => sum + item.amount, 0);
  const isDashboard = activePanel === "dashboard";

  function updateEvent(updater: (current: EventCmsContent) => EventCmsContent) {
    setEvent((current) => updater(current));
    if (saveState.tone !== "idle" || saveState.message) {
      setSaveState({ tone: "idle", message: "" });
    }
  }

  async function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();

    if (!validation.valid) {
      setSaveState({ tone: "error", message: validation.error });
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`/api/events/${event.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event }),
      });

      const payload = (await response.json().catch(() => null)) as
        | {
            event?: EventCmsContent;
            source?: "database" | "static";
            message?: string;
          }
        | null;

      if (!response.ok || !payload?.event) {
        throw new Error(payload?.message ?? "Unable to save");
      }

      setEvent(payload.event);
      setSaveState({ tone: "success", message: "Saved" });
    } catch (error) {
      setSaveState({
        tone: "error",
        message: error instanceof Error ? error.message : "Unable to save",
      });
    } finally {
      setIsSaving(false);
    }
  }

  function handleReset() {
    setEvent(initialEvent);
    setSaveState({ tone: "idle", message: "" });
  }

  function renderDashboard() {
    return (
      <div className="grid gap-1.5">
        <div className="rounded-[14px] border border-[#e5e7eb] bg-white px-4 py-3">
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setDonationMode("recent")}
              className={`rounded-[10px] border px-3 py-1.5 text-sm ${donationMode === "recent" ? "border-[#8b5c33] bg-[#f7efe6]" : "border-[#c9b8a5] bg-white"}`}
            >
              Recent donations
            </button>
            <button
              type="button"
              onClick={() => setDonationMode("generous")}
              className={`rounded-[10px] border px-3 py-1.5 text-sm ${donationMode === "generous" ? "border-[#8b5c33] bg-[#f7efe6]" : "border-[#c9b8a5] bg-white"}`}
            >
              Top donations
            </button>
          </div>
        </div>

        <div className="rounded-[14px] border border-[#e5e7eb] bg-white p-4">
          <div className="mb-2 text-sm font-medium">Donor list</div>
          <div className="grid grid-cols-[70px_minmax(180px,1fr)_minmax(160px,200px)_140px] gap-4 px-4 text-[15px]">
            <div>SNo</div>
            <div>Name</div>
            <div>Seva</div>
            <div>Amount</div>
          </div>

          <div className="max-h-[320px] overflow-y-auto px-2">
            <div className="grid gap-2">
              {donationRows.map((row, index) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[70px_minmax(180px,1fr)_minmax(160px,200px)_140px] items-center gap-4 rounded-[14px] border border-[#eadfd3] bg-[#fffdf9] px-4 py-3 text-sm"
                >
                  <div>{index + 1}</div>
                  <div className="truncate">{row.name}</div>
                  <div className="truncate">{row.seva}</div>
                  <div>{currencyFormatter.format(row.amount)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderThemeForm() {
    return (
      <FormSection>
        <label className="grid gap-2 text-sm">
          <span>Theme</span>
          <select
            className="rounded-[12px] border border-[#d4c2af] bg-white px-3 py-2 outline-none focus:border-[#b4763c]"
            value={event.themeName ?? ""}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                themeName: changeEvent.target.value as EventCmsContent["themeName"],
              }))
            }
          >
            {themeOptions.map((option) => (
              <option key={option.name} value={option.name}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </FormSection>
    );
  }

  function renderHeroForm() {
    return (
      <div className="grid gap-4 p-4">
        {event.hero.posters.map((poster, index) => (
          <FormSection key={`${poster.alt}-${index}`} title={`Poster ${index + 1}`}>
            <TextInput
              label={`Desktop ${index + 1}`}
              value={poster.desktopSrc}
              onChange={(changeEvent) =>
                updateEvent((current) => {
                  const posters = [...current.hero.posters];
                  posters[index] = { ...posters[index], desktopSrc: changeEvent.target.value };
                  return { ...current, hero: { ...current.hero, posters } };
                })
              }
            />
            <TextInput
              label={`Mobile ${index + 1}`}
              value={poster.mobileSrc}
              onChange={(changeEvent) =>
                updateEvent((current) => {
                  const posters = [...current.hero.posters];
                  posters[index] = { ...posters[index], mobileSrc: changeEvent.target.value };
                  return { ...current, hero: { ...current.hero, posters } };
                })
              }
            />
            <TextInput
              label={`Alt ${index + 1}`}
              value={poster.alt}
              onChange={(changeEvent) =>
                updateEvent((current) => {
                  const posters = [...current.hero.posters];
                  posters[index] = { ...posters[index], alt: changeEvent.target.value };
                  return { ...current, hero: { ...current.hero, posters } };
                })
              }
            />
          </FormSection>
        ))}
      </div>
    );
  }

  function renderDonationHighlightsForm() {
    return (
      <div className="grid gap-4 p-4">
        <FormSection>
          <TextInput
            label="Title"
            value={event.donationHighlights.title}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                donationHighlights: { ...current.donationHighlights, title: changeEvent.target.value },
              }))
            }
          />
          <TextInput
            label="Section id"
            value={event.donationHighlights.sectionId}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                donationHighlights: { ...current.donationHighlights, sectionId: changeEvent.target.value },
              }))
            }
          />
        </FormSection>
        {event.donationHighlights.items.map((item, index) => (
          <FormSection key={`${item.title}-${index}`} title={`Highlight ${index + 1}`}>
            <TextInput
              label={`Item ${index + 1} title`}
              value={item.title}
              onChange={(changeEvent) =>
                updateEvent((current) => {
                  const items = [...current.donationHighlights.items];
                  items[index] = { ...items[index], title: changeEvent.target.value };
                  return { ...current, donationHighlights: { ...current.donationHighlights, items } };
                })
              }
            />
            <TextInput
              label={`Item ${index + 1} image`}
              value={item.image}
              onChange={(changeEvent) =>
                updateEvent((current) => {
                  const items = [...current.donationHighlights.items];
                  items[index] = { ...items[index], image: changeEvent.target.value };
                  return { ...current, donationHighlights: { ...current.donationHighlights, items } };
                })
              }
            />
          </FormSection>
        ))}
      </div>
    );
  }

  function renderOverviewForm() {
    return (
      <FormSection>
        <TextInput label="Eyebrow" value={event.overview.eyebrow} onChange={(changeEvent) => updateEvent((current) => ({ ...current, overview: { ...current.overview, eyebrow: changeEvent.target.value } }))} />
        <TextInput label="Title" value={event.overview.title} onChange={(changeEvent) => updateEvent((current) => ({ ...current, overview: { ...current.overview, title: changeEvent.target.value } }))} />
        <TextAreaInput label="Quote" value={event.overview.quote} onChange={(changeEvent) => updateEvent((current) => ({ ...current, overview: { ...current.overview, quote: changeEvent.target.value } }))} rows={3} />
        <TextAreaInput label="Supporting text" value={event.overview.supportingText} onChange={(changeEvent) => updateEvent((current) => ({ ...current, overview: { ...current.overview, supportingText: changeEvent.target.value } }))} rows={4} />
        <TextAreaInput
          label="Points"
          value={event.overview.points.join("\n")}
          onChange={(changeEvent) =>
            updateEvent((current) => ({
              ...current,
              overview: {
                ...current.overview,
                points: changeEvent.target.value.split("\n").map((item) => item.trim()).filter(Boolean),
              },
            }))
          }
          rows={6}
        />
      </FormSection>
    );
  }

  function renderImportanceForm() {
    return (
      <div className="grid gap-4 p-4">
        <FormSection>
          <TextInput label="Title" value={event.importance.title} onChange={(changeEvent) => updateEvent((current) => ({ ...current, importance: { ...current.importance, title: changeEvent.target.value } }))} />
          <TextAreaInput label="Description" value={event.importance.description} onChange={(changeEvent) => updateEvent((current) => ({ ...current, importance: { ...current.importance, description: changeEvent.target.value } }))} rows={4} />
        </FormSection>
        {event.importance.items.map((item, index) => (
          <FormSection key={`${item.title}-${index}`} title={`Item ${index + 1}`}>
            <TextInput
              label={`Item ${index + 1} title`}
              value={item.title}
              onChange={(changeEvent) =>
                updateEvent((current) => {
                  const items = [...current.importance.items];
                  items[index] = { ...items[index], title: changeEvent.target.value };
                  return { ...current, importance: { ...current.importance, items } };
                })
              }
            />
            <TextAreaInput
              label={`Item ${index + 1} description`}
              value={item.description}
              onChange={(changeEvent) =>
                updateEvent((current) => {
                  const items = [...current.importance.items];
                  items[index] = { ...items[index], description: changeEvent.target.value };
                  return { ...current, importance: { ...current.importance, items } };
                })
              }
              rows={3}
            />
          </FormSection>
        ))}
      </div>
    );
  }

  function renderImpactForm() {
    return (
      <div className="grid gap-4 p-4">
        <FormSection>
          <TextInput label="Title" value={event.impact.title} onChange={(changeEvent) => updateEvent((current) => ({ ...current, impact: { ...current.impact, title: changeEvent.target.value } }))} />
          <TextAreaInput label="Description" value={event.impact.description} onChange={(changeEvent) => updateEvent((current) => ({ ...current, impact: { ...current.impact, description: changeEvent.target.value } }))} rows={4} />
        </FormSection>
        {event.impact.cards.map((card, index) => (
          <FormSection key={`${card.title}-${index}`} title={`Card ${index + 1}`}>
            <TextInput
              label={`Card ${index + 1} title`}
              value={card.title}
              onChange={(changeEvent) =>
                updateEvent((current) => {
                  const cards = [...current.impact.cards];
                  cards[index] = { ...cards[index], title: changeEvent.target.value };
                  return { ...current, impact: { ...current.impact, cards } };
                })
              }
            />
            <TextAreaInput
              label={`Card ${index + 1} text`}
              value={card.text}
              onChange={(changeEvent) =>
                updateEvent((current) => {
                  const cards = [...current.impact.cards];
                  cards[index] = { ...cards[index], text: changeEvent.target.value };
                  return { ...current, impact: { ...current.impact, cards } };
                })
              }
              rows={3}
            />
          </FormSection>
        ))}
      </div>
    );
  }

  function renderPrivilegesForm() {
    return (
      <FormSection>
        <TextInput label="Title" value={event.privileges.title} onChange={(changeEvent) => updateEvent((current) => ({ ...current, privileges: { ...current.privileges, title: changeEvent.target.value } }))} />
        <TextInput label="Donate label" value={event.privileges.donateLabel} onChange={(changeEvent) => updateEvent((current) => ({ ...current, privileges: { ...current.privileges, donateLabel: changeEvent.target.value } }))} />
        <TextAreaInput
          label="Privileges"
          value={event.privileges.privileges.join("\n")}
          onChange={(changeEvent) =>
            updateEvent((current) => ({
              ...current,
              privileges: {
                ...current.privileges,
                privileges: changeEvent.target.value.split("\n").map((item) => item.trim()).filter(Boolean),
              },
            }))
          }
          rows={6}
        />
      </FormSection>
    );
  }

  function renderSevaForm() {
    return (
      <div className="grid gap-4 p-4">
        <FormSection>
          <TextInput label="Eyebrow" value={event.seva.eyebrow} onChange={(changeEvent) => updateEvent((current) => ({ ...current, seva: { ...current.seva, eyebrow: changeEvent.target.value } }))} />
          <TextInput label="Title" value={event.seva.title} onChange={(changeEvent) => updateEvent((current) => ({ ...current, seva: { ...current.seva, title: changeEvent.target.value } }))} />
          <TextAreaInput label="Description" value={event.seva.description} onChange={(changeEvent) => updateEvent((current) => ({ ...current, seva: { ...current.seva, description: changeEvent.target.value } }))} rows={4} />
        </FormSection>
        {event.seva.items.map((item, index) => (
          <FormSection key={`${item.title}-${index}`} title={`Item ${index + 1}`}>
            <TextInput
              label={`Item ${index + 1} title`}
              value={item.title}
              onChange={(changeEvent) =>
                updateEvent((current) => {
                  const items = [...current.seva.items];
                  items[index] = { ...items[index], title: changeEvent.target.value };
                  return { ...current, seva: { ...current.seva, items } };
                })
              }
            />
            <TextAreaInput
              label={`Item ${index + 1} description`}
              value={item.description}
              onChange={(changeEvent) =>
                updateEvent((current) => {
                  const items = [...current.seva.items];
                  items[index] = { ...items[index], description: changeEvent.target.value };
                  return { ...current, seva: { ...current.seva, items } };
                })
              }
              rows={3}
            />
          </FormSection>
        ))}
      </div>
    );
  }

  function renderGalleryForm() {
    return (
      <div className="grid gap-4 p-4">
        <FormSection>
          <TextInput
            label="Title"
            value={event.gallery.title}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                gallery: { ...current.gallery, title: changeEvent.target.value },
              }))
            }
          />
        </FormSection>
        {event.gallery.items.map((item, index) => (
          <FormSection key={`${item.src}-${index}`} title={`Gallery ${index + 1}`}>
            <TextInput
              label={`Image ${index + 1}`}
              value={item.src}
              onChange={(changeEvent) =>
                updateEvent((current) => {
                  const items = [...current.gallery.items];
                  items[index] = { ...items[index], src: changeEvent.target.value };
                  return { ...current, gallery: { ...current.gallery, items } };
                })
              }
            />
            <TextInput
              label={`Label ${index + 1}`}
              value={item.label}
              onChange={(changeEvent) =>
                updateEvent((current) => {
                  const items = [...current.gallery.items];
                  items[index] = { ...items[index], label: changeEvent.target.value };
                  return { ...current, gallery: { ...current.gallery, items } };
                })
              }
            />
          </FormSection>
        ))}
      </div>
    );
  }

  function renderPanel() {
    switch (activePanel) {
      case "dashboard":
        return renderDashboard();
      case "theme":
        return renderThemeForm();
      case "hero-posters":
        return renderHeroForm();
      case "donation-highlights":
        return renderDonationHighlightsForm();
      case "overview":
        return renderOverviewForm();
      case "importance":
        return renderImportanceForm();
      case "impact":
        return renderImpactForm();
      case "donor-privileges":
        return renderPrivilegesForm();
      case "seva-grid":
        return renderSevaForm();
      case "gallery":
        return renderGalleryForm();
      default:
        return null;
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#f8f8f8] p-0 text-[#111827]">
      <form
        className="grid min-h-screen w-full gap-4 border border-[#e5e7eb] bg-[#fafafa] p-3 lg:h-screen lg:grid-cols-[220px_minmax(0,1fr)] lg:overflow-hidden"
        onSubmit={handleSubmit}
      >
        <aside className="flex min-h-full flex-col gap-3 rounded-[18px] border border-[#e5e7eb] bg-[#fbfbfb] p-3 lg:sticky lg:top-0 lg:h-full">
          <div className="rounded-[14px] border border-[#e5e7eb] bg-white px-3 py-3">
            <div className="relative mx-auto h-[84px] w-full max-w-[146px]">
              <Image
                src="/hkmlogo.jpg"
                alt="HKM logo"
                fill
                className="object-contain"
                sizes="150px"
                priority
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col rounded-[16px] border border-[#e5e7eb] bg-[#f9fafb] p-3">
            <button
              type="button"
              onClick={() => setActivePanel("dashboard")}
              className={`w-full rounded-[10px] border px-4 py-2.5 text-left text-[15px] ${
                activePanel === "dashboard" ? "border-[#facc15] bg-[#facc15] text-black" : "border-[#d1d5db] bg-white"
              }`}
            >
              Dashboard
            </button>

            <div className="mt-3 flex flex-1 flex-col rounded-[16px] border border-[#e5e7eb] bg-white p-3">
              <div className="mb-3 border-b border-[#e5e7eb] pb-2 text-[16px]">Edit Campaign</div>
              <div className="grid gap-1.5 text-[15px]">
                {menuItems
                  .filter((item) => item.id !== "dashboard")
                  .map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActivePanel(item.id)}
                      className={`rounded-[10px] border px-3 py-2 text-left leading-5 transition ${
                        activePanel === item.id
                          ? "border-[#facc15] bg-[#fef3c7]"
                          : "border-transparent bg-transparent hover:border-[#e5e7eb] hover:bg-[#f9fafb]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-auto rounded-[14px] border border-[#e5e7eb] bg-white px-3 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d1d5db] bg-[#f9fafb]">A</div>
              <div className="text-sm leading-5">
                <div>Admin</div>
                <div>mail@gmail.com</div>
              </div>
            </div>
          </div>
        </aside>

        <section className={`grid gap-4 ${isDashboard ? "lg:h-full lg:overflow-y-auto lg:pr-2" : "lg:h-full lg:grid-rows-[auto_minmax(0,1fr)] lg:overflow-hidden"}`}>
          {isDashboard ? (
            <div className="grid grid-cols-[1fr_auto] items-center rounded-[18px] border border-[#e5e7eb] bg-white px-8 py-6 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
              <div className="justify-self-center text-center text-[18px] font-medium text-[#1f2937]">
                Amount Raised : {totalRaised.toLocaleString("en-IN")}
              </div>
              <div className="justify-self-end text-center">
                <div className="mb-2 text-[16px] font-medium text-[#374151]">Active Campaign</div>
                <div className="min-w-[186px] rounded-[10px] border border-[#9ca3af] bg-white px-4 py-2 text-[16px] text-[#374151]">
                  akshaya Tritiya
                </div>
              </div>
            </div>
          ) : null}

          <div className={`rounded-[18px] border border-[#e5e7eb] bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.06)] ${!isDashboard ? "lg:flex lg:min-h-0 lg:flex-col lg:overflow-hidden" : ""}`}>
            {!isDashboard ? (
              <div className="mb-4 flex items-center justify-end gap-4 rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb] p-4 lg:sticky lg:top-0 lg:z-10 lg:mb-0">
                <Button type="button" variant="outline" onClick={handleReset} disabled={isSaving}>
                  Reset
                </Button>
                <Button type="submit" disabled={isSaving || !validation.valid}>
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              </div>
            ) : null}
            <div className={`min-h-[360px] ${!isDashboard ? "lg:mt-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2" : ""}`}>{renderPanel()}</div>
          </div>

          {isDashboard ? (
            <div className="rounded-[18px] border border-[#e5e7eb] bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
              <FormSection title="Donations Graph">
                <div className="h-[330px]">
                  <TimeSeriesChart points={chartPoints} />
                </div>
              </FormSection>
            </div>
          ) : null}

          {isDashboard ? (
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={handleReset} disabled={isSaving}>
                Reset
              </Button>
              <Button type="submit" disabled={isSaving || !validation.valid}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          ) : null}

          {saveState.message ? (
            <div className={`text-sm ${saveState.tone === "error" ? "text-red-700" : "text-[#6d4a2a]"}`}>{saveState.message}</div>
          ) : null}
        </section>
      </form>
    </main>
  );
}
