export interface ParticipantItem {
  id: string;
  name: string;
  category: 'Our Partners' | 'Supporting Associations' | 'Participants' | 'Our Associates';
  logo: string;
}

import autoParticipantsData from './auto-participants.json';

export const participantsData: ParticipantItem[] = autoParticipantsData as ParticipantItem[];

// Pagination configuration (Set to 8 items per page)
export const PARTICIPANTS_PER_PAGE = 8;