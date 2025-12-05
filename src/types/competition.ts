export interface Competition {
  id: number;
  name: string;
  slug: string;
  description: string;
  type: 'individual' | 'group';
  rulebook?: string;
  isFull: boolean;
  hidden?: boolean;
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
  twibbon: File | null;
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
  twibbon: File | null;
}

export const competitions: Competition[] = [
  { id: 1, name: "Kaligrafi Kontemporer", slug: "kaligrafi-kontemporer", description: "Contemporary Islamic Calligraphy", type: "individual", isFull: false, rulebook: "https://drive.google.com/drive/folders/1oUPddpSKw2xlxCAbEEsvXULIgQO4VHGP?usp=sharing" },
  { id: 2, name: "Kaligrafi Dekorasi", slug: "kaligrafi-dekorasi", description: "Decorative Islamic Calligraphy", type: "individual", isFull: false, rulebook: "https://drive.google.com/drive/folders/1oUPddpSKw2xlxCAbEEsvXULIgQO4VHGP?usp=sharing" },
  { id: 3, name: "Karya Ilmiah", slug: "karya-ilmiah", description: "Scientific Paper", type: "individual", isFull: false, rulebook: "https://drive.google.com/drive/folders/10OvHNQGNOOHNX47XE0XvMtYVjYio6GCK?usp=sharing" },
  { id: 4, name: "MHQ 5 Juz", slug: "mhq-5-juz", description: "Musabaqoh Hifdzil Quran 5 Juz", type: "individual", isFull: false, rulebook: "https://drive.google.com/drive/folders/1QJKECeXgBbM6L4VlzSir7M3Q9wCP0LAX?usp=sharing" },
  { id: 5, name: "MHQ 10 Juz", slug: "mhq-10-juz", description: "Musabaqoh Hifdzil Quran 10 Juz", type: "individual", isFull: false, rulebook: "https://drive.google.com/drive/folders/1QJKECeXgBbM6L4VlzSir7M3Q9wCP0LAX?usp=sharing" },
  { id: 6, name: "MHQ 20 Juz", slug: "mhq-20-juz", description: "Musabaqoh Hifdzil Quran 20 Juz", type: "individual", isFull: false, rulebook: "https://drive.google.com/drive/folders/1QJKECeXgBbM6L4VlzSir7M3Q9wCP0LAX?usp=sharing" },
  { id: 7, name: "MHQ 30 Juz", slug: "mhq-30-juz", description: "Musabaqoh Hifdzil Quran 30 Juz", type: "individual", isFull: false, rulebook: "https://drive.google.com/drive/folders/1QJKECeXgBbM6L4VlzSir7M3Q9wCP0LAX?usp=sharing" },
  { id: 8, name: "Speech", slug: "speech", description: "Islamic Speech", type: "individual", isFull: false, rulebook: "https://drive.google.com/drive/folders/1IRd4Z5sjdzcgZJsuxL61vI5LJy5Pom0b?usp=sharing" },
  { id: 9, name: "Khitobah", slug: "khitobah", description: "Islamic Sermon", type: "individual", isFull: false, rulebook: "https://drive.google.com/drive/folders/1IRd4Z5sjdzcgZJsuxL61vI5LJy5Pom0b?usp=sharing" },
  { id: 10, name: "Sparkling Idea", slug: "sparkling-idea", description: "Innovative Ideas", type: "group", isFull: false, rulebook: "https://drive.google.com/drive/folders/1uxtK-POgq7av5_OeYsdbJrF_oduKd6QV?usp=sharing" },
  { id: 11, name: "Syiir", slug: "syiir", description: "Islamic Poetry", type: "individual", isFull: false, rulebook: "https://drive.google.com/drive/folders/18xid2CS35KaO74sG_GseNJBT5iKRpUei?usp=sharing" },
  { id: 12, name: "Video Kreatif Individu", slug: "video-kreatif-individu", description: "Creative Video Individual", type: "individual", isFull: false, rulebook: "https://drive.google.com/drive/folders/1X6QK_Nd-zh1FWZHQk109EvX4Y7WVEcYd?usp=sharing" },
  { id: 13, name: "Video Kreatif Group", slug: "video-kreatif-group", description: "Creative Video Group", type: "group", isFull: false, rulebook: "https://drive.google.com/drive/folders/1X6QK_Nd-zh1FWZHQk109EvX4Y7WVEcYd?usp=sharing" },
  { id: 14, name: "Jalan Sehat", slug: "jalan-sehat", description: "Fun Walk", type: "individual", isFull: false, hidden: true },
];

export const jenjangOptions = ['SMP / Sederajat', 'SMA / Sederajat', 'Sarjana S1 / Sederajat'];