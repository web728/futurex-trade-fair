
import type { Metadata } from "next";
import { getPastParticipants } from "@/lib/past-participants";
import { ParticipantsDirectory } from "@/components/Participants/ParticipantsDirectory";

export const metadata: Metadata = {
  title: "Participants, Partners & Exhibitors | Futurex Group",
  description:
    "Explore Futurex Group's exhibition participants, past exhibitors, corporate partners, industry associations and media partners.",
  alternates: {
    canonical: "https://www.futurextrade.com/participants",
  },
};

export default function ParticipantsPage() {
  const pastParticipants = getPastParticipants();

  return (
    <ParticipantsDirectory
      pastParticipants={pastParticipants}
    />
  );
}
