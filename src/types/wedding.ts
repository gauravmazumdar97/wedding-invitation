export type Language = "en" | "bn";

export type NameOrder = "groom-first" | "bride-first";

export type EventId =
  | "aiburo-bhaat"
  | "ashirbaad"
  | "mehendi"
  | "haldi"
  | "sangeet"
  | "bor-jatri"
  | "wedding"
  | "mala-badal"
  | "saat-paak"
  | "subho-drishti"
  | "sindoor-daan"
  | "bou-bhaat"
  | "reception";

export type Atmosphere =
  | "ivory"
  | "marigold"
  | "festive"
  | "ceremonial"
  | "sindoor"
  | "candlelight";

export type DietaryPreference = "vegetarian" | "non-vegetarian" | "other";

export type RsvpStatus = "accepted" | "maybe" | "declined" | "pending";

export interface Person {
  firstName: string;
  lastName: string;
  fullName: string;
  bengaliName: string;
  initial: string;
  bengaliInitial: string;
  parents: string;
  shortBio: string;
  shortBioBn: string;
}

export interface StoryChapter {
  id: string;
  year: string;
  title: string;
  titleBn: string;
  text: string;
  textBn: string;
  photo: string;
  photoAlt: string;
}

export interface WeddingTradition {
  id: string;
  title: string;
  titleBn: string;
  line: string;
  lineBn: string;
}

export interface WeddingEvent {
  id: EventId | string;
  enabled: boolean;
  name: string;
  nameBn: string;
  date: string;
  dateIso: string;
  time: string;
  venueId: string;
  dressCode: string;
  dressCodeBn: string;
  description: string;
  descriptionBn: string;
  photograph: string;
  atmosphere: Atmosphere;
  mapLink: string;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  eventIds: string[];
  landmark: string;
  parking: string;
  travelNotes: string;
  mapLink: string;
  illustration: string;
}

export interface FamilyMember {
  name: string;
  nameBn?: string;
  relation: string;
  relationBn: string;
  note?: string;
  noteBn?: string;
  circle: "parents" | "siblings" | "elders";
}

export interface PhotoSet {
  hero: string;
  story1: string;
  story2: string;
  childhood: string;
  couplePortrait: string;
  finale: string;
  preWedding: string[];
  gallery: Array<{
    src: string;
    caption: string;
    captionBn: string;
    date: string;
  }>;
}

export interface TravelInfo {
  enabled: boolean;
  airport: { name: string; detail: string };
  railway: { name: string; detail: string };
  hotel: { name: string; detail: string; bookingNote: string };
  transport: string;
  pickup: string;
  contactName: string;
  contactNumber: string;
}

export interface WeddingConfig {
  couple: {
    bride: Person;
    groom: Person;
    nameOrder: NameOrder;
    monogram: { left: string; right: string; joiner: string };
  };
  date: {
    iso: string;
    display: string;
    displayBn: string;
    time: string;
    timezone: string;
  };
  location: {
    city: string;
    cityBn: string;
    region: string;
  };
  hero: {
    kicker: string;
    kickerBn: string;
    line: string;
    lineBn: string;
  };
  saveTheDate: {
    line: string;
    lineBn: string;
  };
  storyIntro: {
    title: string;
    titleBn: string;
    text: string;
    textBn: string;
  };
  story: StoryChapter[];
  traditions: {
    kicker: string;
    kickerBn: string;
    title: string;
    titleBn: string;
    intro: string;
    introBn: string;
    rites: WeddingTradition[];
  };
  events: WeddingEvent[];
  venues: Venue[];
  travel: TravelInfo;
  families: {
    intro: string;
    introBn: string;
    brideHouse: string;
    brideHouseBn: string;
    groomHouse: string;
    groomHouseBn: string;
    bride: FamilyMember[];
    groom: FamilyMember[];
  };
  personalNote: {
    from: string;
    text: string;
    textBn: string;
    video?: string;
  };
  quote: {
    text: string;
    textBn: string;
  };
  countdown: {
    before: string;
    beforeBn: string;
    after: string;
    afterBn: string;
  };
  finale: {
    line: string;
    lineBn: string;
  };
  photos: PhotoSet;
  music: {
    src: string;
    title: string;
  };
  contacts: Array<{ name: string; role: string; phone: string }>;
  social: {
    title: string;
    description: string;
    descriptionBn: string;
    image: string;
    siteUrl: string;
  };
  rsvp: {
    acceptLabel: string;
    maybeLabel: string;
    declineLabel: string;
    thanks: string;
    thanksBn: string;
    maybeThanks: string;
    maybeThanksBn: string;
    declineThanks: string;
    declineThanksBn: string;
    byline: string;
    hashtag: string;
  };
  copy: {
    openInvitation: string;
    openInvitationBn: string;
    invitationFor: string;
    invitationForBn: string;
    dearGuest: string;
    shubhoBibaho: string;
    twoHearts: string;
    comeCelebrate: string;
    ourStory: string;
    ourStoryBn: string;
    traditions: string;
    traditionsBn: string;
    events: string;
    eventsBn: string;
    gallery: string;
    galleryBn: string;
    venue: string;
    venueBn: string;
    rsvp: string;
    untilSubhoDrishti: string;
    seeYouThere: string;
    addToCalendar: string;
    openMaps: string;
    preparing: string;
    preparingBn: string;
  };
}
