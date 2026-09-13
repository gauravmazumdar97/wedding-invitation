export interface RitualLore {
  id: string;
  meaning: string;
  meaningBn: string;
}

export const ritualLore: Record<string, RitualLore> = {
  "aiburo-bhaat": {
    id: "aiburo-bhaat",
    meaning: "The bride's last meal in her father's house as an unmarried daughter, shared with the women of the family.",
    meaningBn: "পিতৃগৃহে কন্যার শেষ অবিবাহিত ভোজন, পরিবারের নারীদের সঙ্গে।",
  },
  ashirbaad: {
    id: "ashirbaad",
    meaning: "Elders bless the couple with husked rice, durva grass and gold, asking for a long and fortunate life.",
    meaningBn: "গুরুজনেরা ধান, দূর্বা ও স্বর্ণ দিয়ে আশীর্বাদ করেন।",
  },
  mehendi: {
    id: "mehendi",
    meaning: "Henna cools the hands and writes the family's joy into the skin before the colours of holud begin.",
    meaningBn: "মেহেন্দির সুবাসে হাত শীতল হয়, উৎসবের রং শুরু হয়।",
  },
  haldi: {
    id: "haldi",
    meaning: "Turmeric, wild turmeric paste and laughter. Gaye Holud blesses the skin and the house with yellow light.",
    meaningBn: "হলুদ মাখা, গান ও হাসি। গায়ে হলুদ ঘরকে হলুদ আলোয় ভরে দেয়।",
  },
  sangeet: {
    id: "sangeet",
    meaning: "Both houses sing. Dhaak, shehnai and family voices turn the courtyard into a night of music.",
    meaningBn: "দুই ঘরের গান। ঢাক, শেহনাই ও কণ্ঠে উঠে আসে সন্ধ্যা।",
  },
  wedding: {
    id: "wedding",
    meaning: "Bor jatri, mala badal, saat paak, subho drishti and sindoor daan. The Bengali wedding is a sequence of sacred glances and circles.",
    meaningBn: "বরযাত্রী, মালাবদল, সাতপাক, শুভদৃষ্টি ও সিঁদুরদান। বাংলা বিবাহ এক পবিত্র ধারা।",
  },
  reception: {
    id: "reception",
    meaning: "Bou Bhaat: the bride is welcomed into her new home and the two families sit to eat as one.",
    meaningBn: "বৌভাত: নতুন ঘরে কন্যার প্রথম ভোজন, দুই পরিবার একসঙ্গে।",
  },
};

export const ceremonyLore = {
  dhaak: {
    meaning: "The dhaak announces that the wedding has begun. Its leather and stick keep time for the whole house.",
    meaningBn: "ঢাকের আওয়াজে বিবাহ শুরু। চামড়া ও কাঠি সারা ঘরের তাল রাখে।",
  },
  approach: {
    meaning: "The groom arrives as bor, wearing the topor. The bor jatri walks him to the mandap with shehnai in the air.",
    meaningBn: "বর টুপোর পরে আসেন। বরযাত্রী তাঁকে মণ্ডপে নিয়ে যায়, শেহনাই বাজে।",
  },
  garland: {
    meaning: "Mala badal: bride and groom exchange garlands of tuberose and marigold, accepting one another in public.",
    meaningBn: "মালাবদল: রজনীগন্ধা ও গাঁদায় দুজনে একে অপরকে গ্রহণ করেন।",
  },
  circles: {
    meaning: "Saat paak: the bride, still veiled, is carried around the groom seven times. The knot of the journey is tied.",
    meaningBn: "সাতপাক: ঘোমটায় ঢাকা কন্যা বরকে সাতবার প্রদক্ষিণ করেন।",
  },
  reveal: {
    meaning: "Subho drishti: the veil lifts. The first look is taken as a blessing, not as performance.",
    meaningBn: "শুভদৃষ্টি: ঘোমটা সরলে প্রথম দৃষ্টি আশীর্বাদ হয়ে ওঠে।",
  },
  sindoor: {
    meaning: "Sindoor daan: vermilion is placed at the parting of the bride's hair. Shankha and pola complete the married signs.",
    meaningBn: "সিঁদুরদান: সিঁথিতে সিঁদুর। শাঁখা ও পলা বিবাহিত পরিচয় সম্পূর্ণ করে।",
  },
};

export function loreForEvent(eventId: string): RitualLore | undefined {
  return ritualLore[eventId];
}
