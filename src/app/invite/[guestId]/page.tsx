import type { Metadata } from "next";
import { InvitationExperience } from "@/components/experience/InvitationExperience";
import { InvitationSummary } from "@/components/experience/InvitationSummary";
import { wedding } from "@/config/wedding";
import { resolveInvitation } from "@/lib/page-guest";

interface InvitePageProps {
  params: Promise<{ guestId: string }>;
}

export async function generateMetadata({ params }: InvitePageProps): Promise<Metadata> {
  const { guestId } = await params;
  const { guest } = await resolveInvitation(guestId);
  return {
    title: {
      absolute: `${guest.guestName} · ${wedding.social.title} · ${wedding.date.display}`,
    },
    description: `${guest.inviteTextBn} ${guest.inviteText}`,
  };
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { guestId } = await params;
  const { guest, rsvp } = await resolveInvitation(guestId);
  return (
    <>
      <InvitationSummary guest={guest} />
      <InvitationExperience guest={guest} existingRsvp={rsvp} />
    </>
  );
}
