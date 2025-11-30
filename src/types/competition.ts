export interface Competition {
  id: number;
  name: string;
  slug: string;
  description: string;
  type: 'individual' | 'group';
  rulebook: string;
  isFull: boolean;
}

export interface IndividualFormData {
  nama: string;
  nama_arab: string;
  usia: number | '';
  jenjang: string;
  instansi: string;
  email: string;
  handphone: string;
  jenis: string;
  bukti_bayar: File | null;
  story_1: File | null;
  story_2: File | null;
}

export interface GroupFormData {
  nama_1: string;
  nama_arab_1: string;
  usia_1: number | '';
  instansi_1: string;
  nama_2: string;
  nama_arab_2: string;
  usia_2: number | '';
  instansi_2: string;
  nama_3: string;
  nama_arab_3: string;
  usia_3: number | '';
  instansi_3: string;
  jenjang: string;
  email: string;
  handphone: string;
  jenis: string;
  bukti_bayar: File | null;
  story_1: File | null;
  story_2: File | null;
}

export const competitions: Competition[] = [
  { id: 1, name: "Kaligrafi", slug: "kaligrafi", description: "Islamic Calligraphy", type: "individual", isFull: false, rulebook: "/rulebook/RULEBOOK-KALIGRAFI.pdf" },
  { id: 2, name: "Karya Ilmiah", slug: "karya-ilmiah", description: "Scientific Paper", type: "individual", isFull: false, rulebook: "/rulebook/RULEBOOK-KARYA-ILMIAH.pdf" },
  { id: 3, name: "MHQ", slug: "mhq", description: "Musabaqoh Hifdzil Quran", type: "individual", isFull: false, rulebook: "/rulebook/RULEBOOK-MHQ.pdf" },
  { id: 4, name: "Pidato", slug: "pidato", description: "Islamic Speech", type: "individual", isFull: false, rulebook: "/rulebook/RULEBOOK-PIDATO.pdf" },
  { id: 5, name: "Sparkling Idea", slug: "sparkling-idea", description: "Innovative Ideas", type: "individual", isFull: false, rulebook: "/rulebook/RULEBOOK-SPARKLING-IDEA.pdf" },
  { id: 6, name: "Syiir", slug: "syiir", description: "Islamic Poetry", type: "individual", isFull: false, rulebook: "/rulebook/RULEBOOK-SYIIR.pdf" },
];

export const jenjangOptions = ['SD', 'SMP', 'SMA', 'Umum'];
