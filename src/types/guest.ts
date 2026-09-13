import type { DietaryPreference, RsvpStatus } from "./wedding";

export type GuestRelationship = "family" | "friend" | "colleague" | "other";

export interface Guest {
  guestId: string;
  guestName: string;
  familyName: string;
  greetingBn: string;
  inviteText: string;
  inviteTextBn: string;
  allowedGuests: number;
  events: string[];
  relationship: GuestRelationship;
}

export interface GuestMap {
  [guestId: string]: Guest;
}

export interface RsvpRecord {
  guestId: string;
  status: RsvpStatus;
  attendingCount: number;
  attendingEvents: string[];
  dietary: DietaryPreference | "";
  dietaryNote: string;
  message: string;
  travelHelp: boolean;
  travelNote: string;
  updatedAt: string;
}
