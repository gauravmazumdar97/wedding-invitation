import { eventsForGuest, wedding } from "@/config/wedding";
import { coupleDisplay } from "@/lib/invite";
import type { Guest } from "@/types/guest";

export function InvitationSummary({ guest }: { guest: Guest }) {
  const { first, second } = coupleDisplay();
  const events = eventsForGuest(guest.events);

  return (
    <section className="sr-only">
      <h1>
        {guest.guestName}. {first.fullName} and {second.fullName}. {wedding.copy.shubhoBibaho}.
      </h1>
      <p>
        {wedding.date.display} {wedding.date.time}. {wedding.location.city}.
      </p>
      <p>{guest.inviteText}</p>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name} {event.nameBn}. {event.date}. {event.time}.
          </li>
        ))}
      </ul>
    </section>
  );
}
