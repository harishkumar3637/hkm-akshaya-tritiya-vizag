import { EventCmsEditor } from "@/app/admin/event-editor";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCmsEventContent } from "@/lib/events-cms";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  const { content, source } = await getCmsEventContent("akshaya-tritiya");

  if (!content) {
    return (
      <main className="min-h-screen bg-[var(--sectionAltBackground)] px-4 py-16 text-[var(--textHeading)]">
        <div className="mx-auto max-w-3xl rounded-[8px] border border-[var(--borderSubtle)] bg-[var(--cardBackground)] p-8">
          <h1 className="font-serif text-3xl font-bold">Event content unavailable</h1>
          <p className="mt-3 text-[var(--textMuted)]">No static Akshaya Tritiya event was found to seed the editor.</p>
        </div>
      </main>
    );
  }

  return <EventCmsEditor initialEvent={content} initialSource={source} />;
}
