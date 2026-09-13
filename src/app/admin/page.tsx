import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { isAdmin } from "@/lib/auth";
import { listGuests } from "@/lib/guest-store";
import { listRsvps } from "@/lib/rsvp-store";

export default async function AdminPage() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }

  const [guests, rsvps] = await Promise.all([listGuests(), listRsvps()]);
  const rsvpByGuest = Object.fromEntries(rsvps.map((rsvp) => [rsvp.guestId, rsvp]));

  return (
    <AdminDashboard
      guests={guests.map((guest) => ({
        ...guest,
        rsvp: rsvpByGuest[guest.guestId] ?? null,
      }))}
    />
  );
}
