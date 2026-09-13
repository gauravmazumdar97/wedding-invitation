import { InvitationExperience } from "@/components/experience/InvitationExperience";
import { InvitationSummary } from "@/components/experience/InvitationSummary";
import { resolveInvitation } from "@/lib/page-guest";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ guest?: string }>;
}) {
  const params = await searchParams;
  const { guest, rsvp } = await resolveInvitation(params.guest);
  return (
    <>
      <InvitationSummary guest={guest} />
      <InvitationExperience guest={guest} existingRsvp={rsvp} />
    </>
  );
}
