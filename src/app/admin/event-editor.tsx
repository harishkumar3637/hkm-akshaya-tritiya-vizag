"use client";

import Image from "next/image";
import { useMemo, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, LogOut, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { EventCmsContent } from "@/data/events/cms";
import { eventCmsContentSchema } from "@/data/events/schema";
import { coreThemeColorKeys, themes, type CoreThemeColorKey } from "@/lib/themes";

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
  | "gallery"
  | "donation-form";

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
  { id: "hero-posters", label: "Hero Posters" },
  { id: "donation-highlights", label: "Donation Highlights" },
  { id: "overview", label: "Overview" },
  { id: "importance", label: "Importance" },
  { id: "impact", label: "Impact" },
  { id: "donor-privileges", label: "Donor Privileges" },
  { id: "seva-grid", label: "Seva Grid" },
  { id: "gallery", label: "Gallery" },
  { id: "donation-form", label: "Donation Form" },
];

const themeColorLabels: Record<CoreThemeColorKey, string> = {
  primary: "Primary",
  secondary: "Secondary",
  background: "Background",
  surface: "Surface",
  text: "Text",
  accent: "Accent",
};

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const acceptedImageTypes = new Set(["image/jpeg", "image/png"]);
const acceptedImageExtensions = ".jpg,.jpeg,.png";
const acceptedVideoTypes = new Set(["video/mp4", "video/webm", "video/ogg"]);
const acceptedVideoExtensions = ".mp4,.webm,.ogg";
const emptyTextSentinel = "\u200B";
const emptyImageSentinel = "__EDITOR_EMPTY_IMAGE__";

function sanitizeEditorTextValue(value: string) {
  return value.replaceAll(emptyTextSentinel, "");
}

function isUploadedDataUrl(value: string) {
  return value.startsWith("data:");
}

function isEmptyImageValue(value: string) {
  return value.trim().length === 0 || value === emptyImageSentinel;
}

function getAssetInputDisplayValue(value: string, uploadedLabel: string) {
  if (value === emptyImageSentinel) {
    return "";
  }

  if (isUploadedDataUrl(value)) {
    return uploadedLabel;
  }

  return sanitizeEditorTextValue(value);
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Unable to read the selected image."));
    };

    reader.onerror = () => reject(new Error("Unable to read the selected image."));
    reader.readAsDataURL(file);
  });
}

function FileSourceInput({
  label,
  value,
  onChange,
  accept,
  acceptedTypes,
  helperText,
  buttonLabel,
  emptyLabel,
  errorLabel,
}: {
  label: string;
  value: string;
  onChange: (nextValue: string) => void;
  accept: string;
  acceptedTypes: Set<string>;
  helperText: string;
  buttonLabel: string;
  emptyLabel: string;
  errorLabel: string;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const hasValue = value.trim().length > 0 && value !== emptyImageSentinel;
  const displayedValue = getAssetInputDisplayValue(value, `Uploaded ${buttonLabel.toLowerCase()} file`);
  const isUploadedFile = isUploadedDataUrl(value);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setErrorMessage(`No file selected. Please choose a supported ${errorLabel}.`);
      event.target.value = "";
      return;
    }

    if (!acceptedTypes.has(file.type)) {
      setErrorMessage(`Only supported ${errorLabel} files are allowed.`);
      event.target.value = "";
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      onChange(dataUrl);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to process the selected file.");
    } finally {
      event.target.value = "";
    }
  }

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-[#4b5563]">{label}</span>
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#9ca3af]">{buttonLabel}</span>
      </div>

      <div className="grid gap-3 rounded-[14px] border border-[#dbe3ee] bg-[#fcfcfd] p-3">
        <input
          type="text"
          className="h-11 w-full rounded-[12px] border border-[#cbd5e1] bg-white px-3 py-2 text-[#111827] shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] outline-none transition focus:border-[#b4763c] focus:ring-2 focus:ring-[#f3d5b5]"
          value={displayedValue}
          readOnly={isUploadedFile}
          onChange={(event) => {
            onChange(event.target.value);
            if (errorMessage) {
              setErrorMessage("");
            }
          }}
          placeholder={emptyLabel}
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs leading-5 text-[#6b7280]">{helperText}</p>
          <button
            type="button"
            onClick={() => {
              setErrorMessage("");
              fileInputRef.current?.click();
            }}
            className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#d8c3aa] bg-[#fff7ed] px-3 text-sm font-medium text-[#8b5c33] transition hover:bg-[#ffedd5]"
          >
            <ImagePlus className="h-4 w-4" />
            {hasValue ? `Change ${buttonLabel.toLowerCase()}` : `Upload ${buttonLabel.toLowerCase()}`}
          </button>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept={accept} className="hidden" onChange={handleFileChange} />

      {errorMessage ? <p className="text-sm font-medium text-[#b91c1c]">{errorMessage}</p> : null}
    </div>
  );
}

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
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-[#4b5563]">{label}</span>
      <input
        type={type}
        className="h-11 rounded-[12px] border border-[#cbd5e1] bg-white px-3 py-2 text-[#111827] shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] outline-none transition focus:border-[#b4763c] focus:ring-2 focus:ring-[#f3d5b5]"
        value={sanitizeEditorTextValue(value)}
        onChange={(event) =>
          onChange({
            ...event,
            target: { ...event.target, value: sanitizeEditorTextValue(event.target.value) },
            currentTarget: { ...event.currentTarget, value: sanitizeEditorTextValue(event.currentTarget.value) },
          } as ChangeEvent<HTMLInputElement>)
        }
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
      <span className="font-medium text-[#4b5563]">{label}</span>
      <textarea
        className="rounded-[12px] border border-[#cbd5e1] bg-white px-3 py-2 text-[#111827] shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] outline-none transition focus:border-[#b4763c] focus:ring-2 focus:ring-[#f3d5b5]"
        rows={rows}
        value={sanitizeEditorTextValue(value)}
        onChange={(event) =>
          onChange({
            ...event,
            target: { ...event.target, value: sanitizeEditorTextValue(event.target.value) },
            currentTarget: { ...event.currentTarget, value: sanitizeEditorTextValue(event.currentTarget.value) },
          } as ChangeEvent<HTMLTextAreaElement>)
        }
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-[#4b5563]">{label}</span>
      <select
        className="h-11 rounded-[12px] border border-[#cbd5e1] bg-white px-3 py-2 text-[#111827] shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] outline-none transition focus:border-[#b4763c] focus:ring-2 focus:ring-[#f3d5b5]"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ColorInput({
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
      <span className="font-medium text-[#4b5563]">{label}</span>
      <div className="flex h-11 items-center gap-3 rounded-[12px] border border-[#cbd5e1] bg-white px-3 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] transition focus-within:border-[#b4763c] focus-within:ring-2 focus-within:ring-[#f3d5b5]">
        <input type="color" className="h-7 w-10 cursor-pointer rounded border-0 bg-transparent p-0" value={value} onChange={onChange} />
        <input className="min-w-0 flex-1 border-0 bg-transparent px-0 py-0 text-[#111827] outline-none" value={value} onChange={onChange} />
      </div>
    </label>
  );
}

function ImageInput({
  label,
  value,
  onChange,
  trailingAction,
}: {
  label: string;
  value: string;
  onChange: (nextValue: string) => void;
  trailingAction?: ReactNode;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const hasImage = !isEmptyImageValue(value);
  const displayedValue = getAssetInputDisplayValue(value, "Uploaded image");
  const isUploadedImage = isUploadedDataUrl(value);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setErrorMessage("No file selected. Please choose a JPG or PNG image.");
      event.target.value = "";
      return;
    }

    if (!acceptedImageTypes.has(file.type)) {
      setErrorMessage("Only JPG, JPEG, and PNG image files are allowed.");
      event.target.value = "";
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      onChange(dataUrl);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to process the selected image.");
    } finally {
      event.target.value = "";
    }
  }

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-[#4b5563]">{label}</span>
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#9ca3af]">JPG, JPEG, PNG</span>
      </div>

      <div className="grid gap-3 rounded-[14px] border border-[#dbe3ee] bg-[#fcfcfd] p-3">
        <div className="flex items-start gap-3">
          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-[#dbe3ee] bg-white">
            {hasImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt={label} className="h-full w-full object-cover" />
            ) : (
              <div className="px-3 text-center text-xs font-medium leading-5 text-[#94a3b8]">No image yet</div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <input
              type="text"
              className="h-11 w-full rounded-[12px] border border-[#cbd5e1] bg-white px-3 py-2 text-[#111827] shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] outline-none transition focus:border-[#b4763c] focus:ring-2 focus:ring-[#f3d5b5]"
              value={displayedValue}
              readOnly={isUploadedImage}
              onChange={(event) => {
                onChange(event.target.value);
                if (errorMessage) {
                  setErrorMessage("");
                }
              }}
              placeholder="Paste an image URL or upload an image"
            />
            <p className="mt-2 text-xs leading-5 text-[#6b7280]">
              Uploaded images are stored directly in the campaign content so they remain available in the editor.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-[#eef2f7] pt-3">
          <button
            type="button"
            onClick={() => {
              setErrorMessage("");
              fileInputRef.current?.click();
            }}
            className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#d8c3aa] bg-[#fff7ed] px-3 text-sm font-medium text-[#8b5c33] transition hover:bg-[#ffedd5]"
          >
            <ImagePlus className="h-4 w-4" />
            {hasImage ? "Change image" : "Upload image"}
          </button>
          {trailingAction}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedImageExtensions}
        className="hidden"
        onChange={handleFileChange}
      />

      {errorMessage ? <p className="text-sm font-medium text-[#b91c1c]">{errorMessage}</p> : null}
    </div>
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
      </svg>
    </div>
  );
}

function FormSection({
  children,
  title,
  footer,
}: {
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
}) {
  return (
    <div className="rounded-[16px] border border-[#dbe3ee] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      {title ? <div className="mb-4 text-sm font-medium">{title}</div> : null}
      <div className="grid gap-4">{children}</div>
      {footer ? <div className="mt-4 flex justify-end gap-2 border-t border-[#eef2f7] pt-4">{footer}</div> : null}
    </div>
  );
}

function ItemActionButton({
  icon,
  label,
  onClick,
  variant = "default",
  disabled = false,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-10 items-center gap-2 rounded-[10px] border px-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
        variant === "danger"
          ? "border-[#fecaca] bg-[#fff1f2] text-[#b91c1c] hover:bg-[#ffe4e6]"
          : "border-[#d8c3aa] bg-[#fff7ed] text-[#8b5c33] hover:bg-[#ffedd5]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

export function EventCmsEditor({ initialEvent, initialSource: _initialSource }: EventCmsEditorProps) {
  const router = useRouter();
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
      const message =
        error instanceof Error && /network error|failed to fetch|load failed/i.test(error.message)
          ? "Unable to reach the admin save API. Check that the Next.js server and database connection are available."
          : error instanceof Error
            ? error.message
            : "Unable to save";

      setSaveState({
        tone: "error",
        message,
      });
    } finally {
      setIsSaving(false);
    }
  }

  function handleReset() {
    setEvent(initialEvent);
    setSaveState({ tone: "idle", message: "" });
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    router.push("/admin/login");
    router.refresh();
  }

  function renderDashboard() {
    return (
      <div className="grid gap-1.5">
        <div className="rounded-[14px] border border-[#e5e7eb] bg-white p-4">
          <div className="mb-3 text-base font-semibold text-[#1f2937]">Donor list</div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setDonationMode("recent")}
              className={`rounded-[10px] border px-3 py-1.5 text-[15px] font-semibold ${donationMode === "recent" ? "border-[#8b5c33] bg-[#f7efe6] text-[#6f4727]" : "border-[#c9b8a5] bg-white text-[#374151]"}`}
            >
              Recent donations
            </button>
            <button
              type="button"
              onClick={() => setDonationMode("generous")}
              className={`rounded-[10px] border px-3 py-1.5 text-[15px] font-semibold ${donationMode === "generous" ? "border-[#8b5c33] bg-[#f7efe6] text-[#6f4727]" : "border-[#c9b8a5] bg-white text-[#374151]"}`}
            >
              Top donations
            </button>
          </div>
          <div className="mt-4 grid grid-cols-[70px_minmax(180px,1fr)_minmax(160px,200px)_140px] gap-4 px-4 text-[16px] font-semibold text-[#1f2937]">
            <div>SNo</div>
            <div>Name</div>
            <div>Seva</div>
            <div>Amount</div>
          </div>

          <div className="mt-3 max-h-[448px] overflow-y-auto px-2">
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
    const baseTheme = themes[event.themeName ?? "akshaya-tritiya"] ?? themes["akshaya-tritiya"];
    const palette = event.themeColors ?? baseTheme.colors;

    return (
      <FormSection title="Theme Palette">
        <SelectInput
          label="Base theme"
          value={event.themeName ?? "akshaya-tritiya"}
          options={Object.values(themes).map((option) => option.name)}
          onChange={(changeEvent) =>
            updateEvent((current) => {
              const selectedTheme = themes[changeEvent.target.value as keyof typeof themes] ?? themes["akshaya-tritiya"];

              return {
                ...current,
                themeName: selectedTheme.name,
                themeColors: selectedTheme.colors,
              };
            })
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          {coreThemeColorKeys.map((colorKey) => (
            <ColorInput
              key={colorKey}
              label={themeColorLabels[colorKey]}
              value={palette[colorKey]}
              onChange={(changeEvent) =>
                updateEvent((current) => {
                  const currentTheme = themes[current.themeName ?? "akshaya-tritiya"] ?? themes["akshaya-tritiya"];

                  return {
                    ...current,
                    themeColors: {
                      ...(current.themeColors ?? currentTheme.colors),
                      [colorKey]: changeEvent.target.value,
                    },
                  };
                })
              }
            />
          ))}
        </div>
      </FormSection>
    );
  }

  function renderHeroForm() {
    return (
      <div className="grid gap-4 p-4">
        {event.hero.posters.map((poster, index) => (
          <FormSection
            key={`hero-poster-${index}`}
            title={`Poster ${index + 1}`}
          >
            <ImageInput
              label={`Desktop ${index + 1}`}
              value={poster.desktopSrc}
              onChange={(nextValue) =>
                updateEvent((current) => {
                  const posters = [...current.hero.posters];
                  posters[index] = { ...posters[index], desktopSrc: nextValue };
                  return { ...current, hero: { ...current.hero, posters } };
                })
              }
              trailingAction={
                <ItemActionButton
                  icon={<Trash2 className="h-4 w-4" />}
                  label="Delete"
                  variant="danger"
                  disabled={event.hero.posters.length <= 1}
                  onClick={() =>
                    updateEvent((current) => ({
                      ...current,
                      hero: { ...current.hero, posters: current.hero.posters.filter((_, posterIndex) => posterIndex !== index) },
                    }))
                  }
                />
              }
            />
            <ImageInput
              label={`Mobile ${index + 1}`}
              value={poster.mobileSrc}
              onChange={(nextValue) =>
                updateEvent((current) => {
                  const posters = [...current.hero.posters];
                  posters[index] = { ...posters[index], mobileSrc: nextValue };
                  return { ...current, hero: { ...current.hero, posters } };
                })
              }
              trailingAction={
                <ItemActionButton
                  icon={<Trash2 className="h-4 w-4" />}
                  label="Delete"
                  variant="danger"
                  disabled={event.hero.posters.length <= 1}
                  onClick={() =>
                    updateEvent((current) => ({
                      ...current,
                      hero: { ...current.hero, posters: current.hero.posters.filter((_, posterIndex) => posterIndex !== index) },
                    }))
                  }
                />
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
        <div className="flex justify-end px-1">
          <ItemActionButton
            icon={<Plus className="h-4 w-4" />}
            label="Add poster"
            onClick={() =>
              updateEvent((current) => ({
                ...current,
                hero: {
                  ...current.hero,
                  posters: [
                    ...current.hero.posters,
                    { desktopSrc: emptyImageSentinel, mobileSrc: emptyImageSentinel, alt: emptyTextSentinel },
                  ],
                },
              }))
            }
          />
        </div>
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
          <FormSection
            key={`donation-highlight-${index}`}
            title={`Highlight ${index + 1}`}
            footer={
              <ItemActionButton
                icon={<Trash2 className="h-4 w-4" />}
                label="Delete"
                variant="danger"
                disabled={event.donationHighlights.items.length <= 1}
                onClick={() =>
                  updateEvent((current) => ({
                    ...current,
                    donationHighlights: {
                      ...current.donationHighlights,
                      items: current.donationHighlights.items.filter((_, itemIndex) => itemIndex !== index),
                    },
                  }))
                }
              />
            }
          >
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
            <ImageInput
              label={`Item ${index + 1} image`}
              value={item.image}
              onChange={(nextValue) =>
                updateEvent((current) => {
                  const items = [...current.donationHighlights.items];
                  items[index] = { ...items[index], image: nextValue };
                  return { ...current, donationHighlights: { ...current.donationHighlights, items } };
                })
              }
            />
          </FormSection>
        ))}
        <div className="flex justify-end px-1">
          <ItemActionButton
            icon={<Plus className="h-4 w-4" />}
            label="Add card"
            onClick={() =>
              updateEvent((current) => ({
                ...current,
                donationHighlights: {
                  ...current.donationHighlights,
                  items: [...current.donationHighlights.items, { title: emptyTextSentinel, image: emptyImageSentinel }],
                },
              }))
            }
          />
        </div>
      </div>
    );
  }

  function renderOverviewForm() {
    return (
      <FormSection>
        <TextInput label="Eyebrow" value={event.overview.eyebrow} onChange={(changeEvent) => updateEvent((current) => ({ ...current, overview: { ...current.overview, eyebrow: changeEvent.target.value } }))} />
        <TextInput label="Title" value={event.overview.title} onChange={(changeEvent) => updateEvent((current) => ({ ...current, overview: { ...current.overview, title: changeEvent.target.value } }))} />
        <TextAreaInput label="Quote" value={event.overview.quote} onChange={(changeEvent) => updateEvent((current) => ({ ...current, overview: { ...current.overview, quote: changeEvent.target.value } }))} rows={3} />
        <TextAreaInput label="Emphasis" value={event.overview.emphasis} onChange={(changeEvent) => updateEvent((current) => ({ ...current, overview: { ...current.overview, emphasis: changeEvent.target.value } }))} rows={3} />
        <TextAreaInput label="Supporting text" value={event.overview.supportingText} onChange={(changeEvent) => updateEvent((current) => ({ ...current, overview: { ...current.overview, supportingText: changeEvent.target.value } }))} rows={4} />
        <TextInput label="Sacred day label" value={event.overview.sacredDayLabel} onChange={(changeEvent) => updateEvent((current) => ({ ...current, overview: { ...current.overview, sacredDayLabel: changeEvent.target.value } }))} />
        <FileSourceInput
          label="Video src"
          value={event.overview.video.src}
          onChange={(nextValue) =>
            updateEvent((current) => ({
              ...current,
              overview: { ...current.overview, video: { ...current.overview.video, src: nextValue } },
            }))
          }
          accept={acceptedVideoExtensions}
          acceptedTypes={acceptedVideoTypes}
          helperText="Paste an embeddable video URL or upload an MP4, WebM, or OGG file."
          buttonLabel="Video"
          emptyLabel="Paste a video URL or upload a file"
          errorLabel="video"
        />
        <TextInput label="Video title" value={event.overview.video.title} onChange={(changeEvent) => updateEvent((current) => ({ ...current, overview: { ...current.overview, video: { ...current.overview.video, title: changeEvent.target.value } } }))} />
        <TextInput label="Impact eyebrow" value={event.overview.impactEyebrow} onChange={(changeEvent) => updateEvent((current) => ({ ...current, overview: { ...current.overview, impactEyebrow: changeEvent.target.value } }))} />
        <TextInput label="Heading" value={event.overview.heading} onChange={(changeEvent) => updateEvent((current) => ({ ...current, overview: { ...current.overview, heading: changeEvent.target.value } }))} />
        <TextInput label="Highlighted heading" value={event.overview.highlightedHeading} onChange={(changeEvent) => updateEvent((current) => ({ ...current, overview: { ...current.overview, highlightedHeading: changeEvent.target.value } }))} />
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
        <TextInput label="Donate label" value={event.overview.donateLabel} onChange={(changeEvent) => updateEvent((current) => ({ ...current, overview: { ...current.overview, donateLabel: changeEvent.target.value } }))} />
      </FormSection>
    );
  }

  function renderImportanceForm() {
    return (
      <div className="grid gap-4 p-4">
        <FormSection>
          <TextInput label="Eyebrow" value={event.importance.eyebrow} onChange={(changeEvent) => updateEvent((current) => ({ ...current, importance: { ...current.importance, eyebrow: changeEvent.target.value } }))} />
          <TextInput label="Title" value={event.importance.title} onChange={(changeEvent) => updateEvent((current) => ({ ...current, importance: { ...current.importance, title: changeEvent.target.value } }))} />
          <TextAreaInput label="Description" value={event.importance.description} onChange={(changeEvent) => updateEvent((current) => ({ ...current, importance: { ...current.importance, description: changeEvent.target.value } }))} rows={4} />
        </FormSection>
        {event.importance.items.map((item, index) => (
          <FormSection
            key={`importance-item-${index}`}
            title={`Item ${index + 1}`}
          >
            <ImageInput
              label={`Item ${index + 1} image`}
              value={item.image}
              onChange={(nextValue) =>
                updateEvent((current) => {
                  const items = [...current.importance.items];
                  items[index] = { ...items[index], image: nextValue };
                  return { ...current, importance: { ...current.importance, items } };
                })
              }
              trailingAction={
                <ItemActionButton
                  icon={<Trash2 className="h-4 w-4" />}
                  label="Delete"
                  variant="danger"
                  disabled={event.importance.items.length <= 1}
                  onClick={() =>
                    updateEvent((current) => ({
                      ...current,
                      importance: { ...current.importance, items: current.importance.items.filter((_, itemIndex) => itemIndex !== index) },
                    }))
                  }
                />
              }
            />
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
        <div className="flex justify-end px-1">
          <ItemActionButton
            icon={<Plus className="h-4 w-4" />}
            label="Add card"
            onClick={() =>
              updateEvent((current) => ({
                ...current,
                importance: {
                  ...current.importance,
                  items: [
                    ...current.importance.items,
                    { image: emptyImageSentinel, title: emptyTextSentinel, description: emptyTextSentinel },
                  ],
                },
              }))
            }
          />
        </div>
      </div>
    );
  }

  function renderImpactForm() {
    return (
      <div className="grid gap-4 p-4">
        <FormSection>
          <TextInput label="Eyebrow" value={event.impact.eyebrow} onChange={(changeEvent) => updateEvent((current) => ({ ...current, impact: { ...current.impact, eyebrow: changeEvent.target.value } }))} />
          <TextInput label="Title" value={event.impact.title} onChange={(changeEvent) => updateEvent((current) => ({ ...current, impact: { ...current.impact, title: changeEvent.target.value } }))} />
          <TextAreaInput label="Description" value={event.impact.description} onChange={(changeEvent) => updateEvent((current) => ({ ...current, impact: { ...current.impact, description: changeEvent.target.value } }))} rows={4} />
        </FormSection>
        {event.impact.cards.map((card, index) => (
          <FormSection
            key={`impact-card-${index}`}
            title={`Card ${index + 1}`}
            footer={
              <ItemActionButton
                icon={<Trash2 className="h-4 w-4" />}
                label="Delete"
                variant="danger"
                disabled={event.impact.cards.length <= 1}
                onClick={() =>
                  updateEvent((current) => ({
                    ...current,
                    impact: { ...current.impact, cards: current.impact.cards.filter((_, cardIndex) => cardIndex !== index) },
                  }))
                }
              />
            }
          >
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
        <div className="flex justify-end px-1">
          <ItemActionButton
            icon={<Plus className="h-4 w-4" />}
            label="Add card"
            onClick={() =>
              updateEvent((current) => ({
                ...current,
                impact: {
                  ...current.impact,
                  cards: [...current.impact.cards, { title: emptyTextSentinel, text: emptyTextSentinel }],
                },
              }))
            }
          />
        </div>
      </div>
    );
  }

  function renderPrivilegesForm() {
    return (
      <div className="grid gap-4 p-4">
        <FormSection>
          <TextInput label="Title" value={event.privileges.title} onChange={(changeEvent) => updateEvent((current) => ({ ...current, privileges: { ...current.privileges, title: changeEvent.target.value } }))} />
          <TextInput label="Donate label" value={event.privileges.donateLabel} onChange={(changeEvent) => updateEvent((current) => ({ ...current, privileges: { ...current.privileges, donateLabel: changeEvent.target.value } }))} />
        </FormSection>
        {event.privileges.privileges.map((privilege, index) => (
          <FormSection
            key={`privilege-item-${index}`}
            title={`Privilege ${index + 1}`}
            footer={
              <ItemActionButton
                icon={<Trash2 className="h-4 w-4" />}
                label="Delete"
                variant="danger"
                disabled={event.privileges.privileges.length <= 1}
                onClick={() =>
                  updateEvent((current) => ({
                    ...current,
                    privileges: {
                      ...current.privileges,
                      privileges: current.privileges.privileges.filter((_, privilegeIndex) => privilegeIndex !== index),
                    },
                  }))
                }
              />
            }
          >
            <TextAreaInput
              label={`Privilege ${index + 1}`}
              value={privilege}
              onChange={(changeEvent) =>
                updateEvent((current) => {
                  const privileges = [...current.privileges.privileges];
                  privileges[index] = changeEvent.target.value;
                  return { ...current, privileges: { ...current.privileges, privileges } };
                })
              }
              rows={3}
            />
          </FormSection>
        ))}
        <div className="flex justify-end px-1">
          <ItemActionButton
            icon={<Plus className="h-4 w-4" />}
            label="Add privilege"
            onClick={() =>
              updateEvent((current) => ({
                ...current,
                privileges: {
                  ...current.privileges,
                  privileges: [...current.privileges.privileges, "Add a new donor privilege here."],
                },
              }))
            }
          />
        </div>
        {event.privileges.carouselItems.map((item, index) => (
          <FormSection
            key={`privilege-carousel-${index}`}
            title={`Carousel Item ${index + 1}`}
            footer={
              <ItemActionButton
                icon={<Trash2 className="h-4 w-4" />}
                label="Delete"
                variant="danger"
                disabled={event.privileges.carouselItems.length <= 1}
                onClick={() =>
                  updateEvent((current) => ({
                    ...current,
                    privileges: {
                      ...current.privileges,
                      carouselItems: current.privileges.carouselItems.filter((_, itemIndex) => itemIndex !== index),
                    },
                  }))
                }
              />
            }
          >
            <ImageInput
              label={`Image ${index + 1}`}
              value={item.src}
              onChange={(nextValue) =>
                updateEvent((current) => {
                  const carouselItems = [...current.privileges.carouselItems];
                  carouselItems[index] = { ...carouselItems[index], src: nextValue };
                  return { ...current, privileges: { ...current.privileges, carouselItems } };
                })
              }
            />
            <TextInput
              label={`Label ${index + 1}`}
              value={item.label}
              onChange={(changeEvent) =>
                updateEvent((current) => {
                  const carouselItems = [...current.privileges.carouselItems];
                  carouselItems[index] = { ...carouselItems[index], label: changeEvent.target.value };
                  return { ...current, privileges: { ...current.privileges, carouselItems } };
                })
              }
            />
          </FormSection>
        ))}
        <div className="flex justify-end px-1">
          <ItemActionButton
            icon={<Plus className="h-4 w-4" />}
            label="Add card"
            onClick={() =>
              updateEvent((current) => ({
                ...current,
                privileges: {
                  ...current.privileges,
                  carouselItems: [...current.privileges.carouselItems, { src: emptyImageSentinel, label: emptyTextSentinel }],
                },
              }))
            }
          />
        </div>
      </div>
    );
  }

  function renderSevaForm() {
    return (
      <div className="grid gap-4 p-4">
        <FormSection>
          <TextInput label="Eyebrow" value={event.seva.eyebrow} onChange={(changeEvent) => updateEvent((current) => ({ ...current, seva: { ...current.seva, eyebrow: changeEvent.target.value } }))} />
          <TextInput label="Title" value={event.seva.title} onChange={(changeEvent) => updateEvent((current) => ({ ...current, seva: { ...current.seva, title: changeEvent.target.value } }))} />
        </FormSection>
        {event.seva.items.map((item, index) => (
          <FormSection
            key={`seva-item-${index}`}
            title={`Item ${index + 1}`}
          >
            <ImageInput
              label={`Item ${index + 1} image`}
              value={item.image}
              onChange={(nextValue) =>
                updateEvent((current) => {
                  const items = [...current.seva.items];
                  items[index] = { ...items[index], image: nextValue };
                  return { ...current, seva: { ...current.seva, items } };
                })
              }
              trailingAction={
                <ItemActionButton
                  icon={<Trash2 className="h-4 w-4" />}
                  label="Delete"
                  variant="danger"
                  disabled={event.seva.items.length <= 1}
                  onClick={() =>
                    updateEvent((current) => ({
                      ...current,
                      seva: { ...current.seva, items: current.seva.items.filter((_, itemIndex) => itemIndex !== index) },
                    }))
                  }
                />
              }
            />
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
        <div className="flex justify-end px-1">
          <ItemActionButton
            icon={<Plus className="h-4 w-4" />}
            label="Add card"
            onClick={() =>
              updateEvent((current) => ({
                ...current,
                seva: {
                  ...current.seva,
                  items: [...current.seva.items, { image: emptyImageSentinel, title: emptyTextSentinel, description: emptyTextSentinel }],
                },
              }))
            }
          />
        </div>
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
          <FormSection
            key={`gallery-item-${index}`}
            title={`Gallery ${index + 1}`}
          >
            <ImageInput
              label={`Image ${index + 1}`}
              value={item.src}
              onChange={(nextValue) =>
                updateEvent((current) => {
                  const items = [...current.gallery.items];
                  items[index] = { ...items[index], src: nextValue };
                  return { ...current, gallery: { ...current.gallery, items } };
                })
              }
              trailingAction={
                <ItemActionButton
                  icon={<Trash2 className="h-4 w-4" />}
                  label="Delete"
                  variant="danger"
                  disabled={event.gallery.items.length <= 1}
                  onClick={() =>
                    updateEvent((current) => ({
                      ...current,
                      gallery: { ...current.gallery, items: current.gallery.items.filter((_, itemIndex) => itemIndex !== index) },
                    }))
                  }
                />
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
        <div className="flex justify-end px-1">
          <ItemActionButton
            icon={<Plus className="h-4 w-4" />}
            label="Add image"
            onClick={() =>
              updateEvent((current) => ({
                ...current,
                gallery: {
                  ...current.gallery,
                  items: [...current.gallery.items, { src: emptyImageSentinel, label: emptyTextSentinel }],
                },
              }))
            }
          />
        </div>
      </div>
    );
  }

  function renderContributorsForm() {
    return (
      <div className="grid gap-4 p-4">
        <FormSection title="Section Copy">
          <TextInput
            label="Heading"
            value={event.contributors.heading}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                contributors: { ...current.contributors, heading: changeEvent.target.value },
              }))
            }
          />
          <TextInput
            label="Recent tab label"
            value={event.contributors.tabs.recent}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                contributors: {
                  ...current.contributors,
                  tabs: { ...current.contributors.tabs, recent: changeEvent.target.value },
                },
              }))
            }
          />
          <TextInput
            label="Generous tab label"
            value={event.contributors.tabs.generous}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                contributors: {
                  ...current.contributors,
                  tabs: { ...current.contributors.tabs, generous: changeEvent.target.value },
                },
              }))
            }
          />
          <TextInput
            label="Modal title"
            value={event.contributors.modal.title}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                contributors: {
                  ...current.contributors,
                  modal: { ...current.contributors.modal, title: changeEvent.target.value },
                },
              }))
            }
          />
          <TextInput
            label="Recent subtitle"
            value={event.contributors.modal.recentSubtitle}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                contributors: {
                  ...current.contributors,
                  modal: { ...current.contributors.modal, recentSubtitle: changeEvent.target.value },
                },
              }))
            }
          />
          <TextInput
            label="Generous subtitle"
            value={event.contributors.modal.generousSubtitle}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                contributors: {
                  ...current.contributors,
                  modal: { ...current.contributors.modal, generousSubtitle: changeEvent.target.value },
                },
              }))
            }
          />
          <TextInput
            label="Search placeholder"
            value={event.contributors.modal.searchPlaceholder}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                contributors: {
                  ...current.contributors,
                  modal: { ...current.contributors.modal, searchPlaceholder: changeEvent.target.value },
                },
              }))
            }
          />
          <TextInput
            label="Empty state prefix"
            value={event.contributors.modal.emptyStatePrefix}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                contributors: {
                  ...current.contributors,
                  modal: { ...current.contributors.modal, emptyStatePrefix: changeEvent.target.value },
                },
              }))
            }
          />
        </FormSection>

        {(["recent", "generous"] as const).map((groupKey) => (
          <div key={groupKey} className="grid gap-4">
            {event.contributors[groupKey].map((item, index) => (
              <FormSection key={`${groupKey}-donor-${index}`} title={`${groupKey === "recent" ? "Recent" : "Generous"} Donor ${index + 1}`}>
                <TextInput
                  label="Name"
                  value={item.name}
                  onChange={(changeEvent) =>
                    updateEvent((current) => {
                      const contributors = [...current.contributors[groupKey]];
                      contributors[index] = { ...contributors[index], name: changeEvent.target.value };
                      return {
                        ...current,
                        contributors: { ...current.contributors, [groupKey]: contributors },
                      };
                    })
                  }
                />
                <TextInput
                  label="Amount"
                  value={String(item.amount)}
                  onChange={(changeEvent) =>
                    updateEvent((current) => {
                      const contributors = [...current.contributors[groupKey]];
                      const nextAmount = Number(changeEvent.target.value);
                      contributors[index] = {
                        ...contributors[index],
                        amount: Number.isFinite(nextAmount) ? nextAmount : 0,
                      };
                      return {
                        ...current,
                        contributors: { ...current.contributors, [groupKey]: contributors },
                      };
                    })
                  }
                />
                <TextInput
                  label="Time"
                  value={item.time}
                  onChange={(changeEvent) =>
                    updateEvent((current) => {
                      const contributors = [...current.contributors[groupKey]];
                      contributors[index] = { ...contributors[index], time: changeEvent.target.value };
                      return {
                        ...current,
                        contributors: { ...current.contributors, [groupKey]: contributors },
                      };
                    })
                  }
                />
                <TextInput
                  label="Avatar"
                  value={item.avatar}
                  onChange={(changeEvent) =>
                    updateEvent((current) => {
                      const contributors = [...current.contributors[groupKey]];
                      contributors[index] = { ...contributors[index], avatar: changeEvent.target.value };
                      return {
                        ...current,
                        contributors: { ...current.contributors, [groupKey]: contributors },
                      };
                    })
                  }
                />
              </FormSection>
            ))}
          </div>
        ))}
      </div>
    );
  }

  function renderDonationForm() {
    return (
      <div className="grid gap-4 p-4">
        <FormSection title="Support Details">
          <TextInput
            label="Support phone"
            value={event.donationForm.support.phone}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                donationForm: {
                  ...current.donationForm,
                  support: { ...current.donationForm.support, phone: changeEvent.target.value },
                },
              }))
            }
          />
          <TextInput
            label="Support email"
            value={event.donationForm.support.email}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                donationForm: {
                  ...current.donationForm,
                  support: { ...current.donationForm.support, email: changeEvent.target.value },
                },
              }))
            }
          />
        </FormSection>

        <FormSection title="Bank Details">
          <TextInput
            label="Beneficiary name"
            value={event.donationForm.bank.fields.beneficiaryName}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                donationForm: {
                  ...current.donationForm,
                  bank: {
                    ...current.donationForm.bank,
                    fields: { ...current.donationForm.bank.fields, beneficiaryName: changeEvent.target.value },
                  },
                },
              }))
            }
          />
          <TextInput
            label="Bank name"
            value={event.donationForm.bank.fields.bankName}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                donationForm: {
                  ...current.donationForm,
                  bank: {
                    ...current.donationForm.bank,
                    fields: { ...current.donationForm.bank.fields, bankName: changeEvent.target.value },
                  },
                },
              }))
            }
          />
          <TextInput
            label="Account number"
            value={event.donationForm.bank.fields.accountNumber}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                donationForm: {
                  ...current.donationForm,
                  bank: {
                    ...current.donationForm.bank,
                    fields: { ...current.donationForm.bank.fields, accountNumber: changeEvent.target.value },
                  },
                },
              }))
            }
          />
          <TextInput
            label="IFSC code"
            value={event.donationForm.bank.fields.ifscCode}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                donationForm: {
                  ...current.donationForm,
                  bank: {
                    ...current.donationForm.bank,
                    fields: { ...current.donationForm.bank.fields, ifscCode: changeEvent.target.value },
                  },
                },
              }))
            }
          />
        </FormSection>

        <FormSection title="UPI Details">
          <TextInput
            label="UPI ID"
            value={event.donationForm.upi.upiId}
            onChange={(changeEvent) =>
              updateEvent((current) => ({
                ...current,
                donationForm: {
                  ...current.donationForm,
                  upi: { ...current.donationForm.upi, upiId: changeEvent.target.value },
                },
              }))
            }
          />
          <ImageInput
            label="UPI & QR scanner"
            value={event.donationForm.upi.qrImage}
            onChange={(nextValue) =>
              updateEvent((current) => ({
                ...current,
                donationForm: {
                  ...current.donationForm,
                  upi: { ...current.donationForm.upi, qrImage: nextValue },
                },
              }))
            }
          />
        </FormSection>
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
      case "donation-form":
        return renderDonationForm();
      default:
        return null;
    }
  }

  return (
    <main className="h-screen w-full overflow-hidden bg-[#f8f8f8] p-0 text-[#111827]">
      <form
        className="grid h-screen w-full gap-4 border border-[#e5e7eb] bg-[#fafafa] p-3 lg:grid-cols-[220px_minmax(0,1fr)]"
        onSubmit={handleSubmit}
      >
        <aside className="flex h-[calc(100vh-1.5rem)] flex-col gap-3 rounded-[18px] border border-[#e5e7eb] bg-[#fbfbfb] p-3 lg:sticky lg:top-3 lg:self-start">
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
              <div className="mb-2 border-b border-[#e5e7eb] pb-2 text-[16px]">Edit Campaign</div>
              <div className="grid gap-1 text-[15px]">
                {menuItems
                  .filter((item) => item.id !== "dashboard")
                  .map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActivePanel(item.id)}
                      className={`rounded-[10px] border px-3 py-1.5 text-left leading-5 transition ${
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
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d1d5db] bg-[#f9fafb]">A</div>
              <div className="min-w-0 text-sm leading-5">
                <div className="font-medium text-[#111827]">Admin</div>
                <div className="break-all text-[#4b5563]">admin@gmail.com</div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm font-medium text-[#374151] transition hover:bg-[#f3f4f6]"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        <section className="grid h-[calc(100vh-1.5rem)] min-h-0 gap-4 overflow-y-auto lg:pr-2">
          {isDashboard ? (
            <div className="grid gap-4 rounded-[18px] border border-[#e5e7eb] bg-white px-8 py-5 shadow-[0_2px_8px_rgba(15,23,42,0.06)] sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="justify-self-center text-center">
                <div className="text-[15px] font-medium text-[#374151]">Raised amount</div>
                <div className="mt-1 text-[18px] font-medium text-[#1f2937]">{totalRaised.toLocaleString("en-IN")}</div>
              </div>
              <div className="justify-self-end text-center">
                <div className="mb-2 text-[15px] font-medium lowercase text-[#374151]">active campaign</div>
                <div className="min-w-[186px] rounded-[10px] border border-[#7c8798] bg-white px-4 py-1.5 text-[16px] font-medium text-[#374151] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                  akshaya Tritiya
                </div>
              </div>
            </div>
          ) : null}

          <div className="rounded-[18px] border border-[#e5e7eb] bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
            {!isDashboard ? (
              <div className="sticky top-0 z-20 mb-4 flex items-center justify-end gap-4 rounded-[14px] border border-[#e5e7eb] bg-[#f9fafb]/95 p-4 backdrop-blur">
                <Button type="button" variant="outline" onClick={handleReset} disabled={isSaving}>
                  Reset
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              </div>
            ) : null}
            <div className={`${!isDashboard ? "lg:mt-4" : "min-h-[360px]"}`}>{renderPanel()}</div>
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
          {saveState.message ? (
            <div className={`text-sm ${saveState.tone === "error" ? "text-red-700" : "text-[#6d4a2a]"}`}>{saveState.message}</div>
          ) : null}
        </section>
      </form>
    </main>
  );
}
