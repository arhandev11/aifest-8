export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LombaIndividu {
  id: string;
  nama: string;
  nama_arab: string;
  usia: number;
  jenjang: string;
  instansi: string;
  email: string;
  handphone: string;
  jenis: string;
  bukti_bayar_url: string;
  story_1_url: string;
  story_2_url: string;
  story_instagram_full_url: string;
  story_whatsapp_full_url: string;
  created_at: string;
  updated_at: string;
}

export interface LombaKelompok {
  id: string;
  nama_1: string;
  nama_arab_1: string;
  usia_1: number;
  instansi_1: string;
  nama_2: string;
  nama_arab_2: string;
  usia_2: number;
  instansi_2: string;
  nama_3: string;
  nama_arab_3: string;
  usia_3: number;
  instansi_3: string;
  jenjang: string;
  email: string;
  handphone: string;
  jenis: string;
  bukti_bayar_url: string;
  story_1_url: string;
  story_2_url: string;
  story_instagram_full_url: string;
  story_whatsapp_full_url: string;
  created_at: string;
  updated_at: string;
}
