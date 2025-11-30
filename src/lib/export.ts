import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { LombaIndividu, LombaKelompok } from '@/types/admin';

export const exportIndividuToExcel = (data: LombaIndividu[], filename: string = 'lomba-individu') => {
  const exportData = data.map((item, index) => ({
    'No': index + 1,
    'ID': item.id,
    'Nama': item.nama,
    'Nama Arab': item.nama_arab,
    'Usia': item.usia,
    'Jenjang': item.jenjang,
    'Instansi': item.instansi,
    'Email': item.email,
    'No. HP': item.handphone,
    'Jenis Lomba': item.jenis,
    'Tanggal Daftar': new Date(item.created_at).toLocaleDateString('id-ID'),
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Lomba Individu');

  // Auto-width columns
  const colWidths = Object.keys(exportData[0] || {}).map(key => ({
    wch: Math.max(key.length, ...exportData.map(row => String(row[key as keyof typeof row] || '').length)) + 2
  }));
  worksheet['!cols'] = colWidths;

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${filename}-${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const exportKelompokToExcel = (data: LombaKelompok[], filename: string = 'lomba-kelompok') => {
  const exportData = data.map((item, index) => ({
    'No': index + 1,
    'ID': item.id,
    'Nama Anggota 1': item.nama_1,
    'Nama Arab 1': item.nama_arab_1,
    'Usia 1': item.usia_1,
    'Instansi 1': item.instansi_1,
    'Nama Anggota 2': item.nama_2,
    'Nama Arab 2': item.nama_arab_2,
    'Usia 2': item.usia_2,
    'Instansi 2': item.instansi_2,
    'Nama Anggota 3': item.nama_3,
    'Nama Arab 3': item.nama_arab_3,
    'Usia 3': item.usia_3,
    'Instansi 3': item.instansi_3,
    'Jenjang': item.jenjang,
    'Email': item.email,
    'No. HP': item.handphone,
    'Jenis Lomba': item.jenis,
    'Tanggal Daftar': new Date(item.created_at).toLocaleDateString('id-ID'),
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Lomba Kelompok');

  // Auto-width columns
  const colWidths = Object.keys(exportData[0] || {}).map(key => ({
    wch: Math.max(key.length, ...exportData.map(row => String(row[key as keyof typeof row] || '').length)) + 2
  }));
  worksheet['!cols'] = colWidths;

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${filename}-${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const exportIndividuToCSV = (data: LombaIndividu[], filename: string = 'lomba-individu') => {
  const exportData = data.map((item, index) => ({
    'No': index + 1,
    'ID': item.id,
    'Nama': item.nama,
    'Nama Arab': item.nama_arab,
    'Usia': item.usia,
    'Jenjang': item.jenjang,
    'Instansi': item.instansi,
    'Email': item.email,
    'No. HP': item.handphone,
    'Jenis Lomba': item.jenis,
    'Tanggal Daftar': new Date(item.created_at).toLocaleDateString('id-ID'),
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
};

export const exportKelompokToCSV = (data: LombaKelompok[], filename: string = 'lomba-kelompok') => {
  const exportData = data.map((item, index) => ({
    'No': index + 1,
    'ID': item.id,
    'Nama Anggota 1': item.nama_1,
    'Nama Arab 1': item.nama_arab_1,
    'Usia 1': item.usia_1,
    'Instansi 1': item.instansi_1,
    'Nama Anggota 2': item.nama_2,
    'Nama Arab 2': item.nama_arab_2,
    'Usia 2': item.usia_2,
    'Instansi 2': item.instansi_2,
    'Nama Anggota 3': item.nama_3,
    'Nama Arab 3': item.nama_arab_3,
    'Usia 3': item.usia_3,
    'Instansi 3': item.instansi_3,
    'Jenjang': item.jenjang,
    'Email': item.email,
    'No. HP': item.handphone,
    'Jenis Lomba': item.jenis,
    'Tanggal Daftar': new Date(item.created_at).toLocaleDateString('id-ID'),
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
};
