import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';

export default function PrintPregnancy({ clinic, patient, pregnancy }) {
    useEffect(() => {
        // Otomatis memunculkan dialog print saat halaman dimuat
        window.print();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const dateOnly = dateString.split('T')[0];
        const [year, month, day] = dateOnly.split('-');
        const dateObj = new Date(year, month - 1, day);
        return dateObj.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-white p-8 text-black font-sans">
            <Head title={`Cetak Rekam Medis - ${patient.name}`} />

            {/* KOP Surat Klinik */}
            <div className="text-center border-b-2 border-black pb-4 mb-6">
                <h1 className="text-xl font-bold uppercase">{clinic.name}</h1>
                <p className="text-sm">Tempat Praktik Mandiri Bidan (TPMB)</p>
                <p className="text-xs text-gray-600 mt-1">Laporan Ringkasan Rekam Medis Buku KIA Digital (ANC)</p>
            </div>

            {/* Informasi Pasien */}
            <div className="mb-6 text-sm grid grid-cols-2 gap-4">
                <div>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className="font-semibold py-1 w-32">Nama Ibu</td>
                                <td>: {patient.name}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-1">NIK</td>
                                <td>: {patient.nik}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-1">No. Telepon</td>
                                <td>: {patient.phone}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className="font-semibold py-1 w-32">Tanggal Lahir</td>
                                <td>: {formatDate(patient.birth_date)}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-1">HPHT</td>
                                <td>: {formatDate(pregnancy?.hpht)}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold py-1">HPL (Perkiraan)</td>
                                <td>: {formatDate(pregnancy?.hpl)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tabel Riwayat Kunjungan ANC */}
            <div className="mb-8">
                <h3 className="font-bold text-base mb-2">Riwayat Pemeriksaan Kehamilan (ANC)</h3>
                <table className="w-full border-collapse border border-black text-xs">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-black p-2">No</th>
                            <th className="border border-black p-2">Tanggal Periksa</th>
                            <th className="border border-black p-2">Usia Kehamilan</th>
                            <th className="border border-black p-2">Berat Badan (BB)</th>
                            <th className="border border-black p-2">Tekanan Darah (TD)</th>
                            <th className="border border-black p-2">Catatan / Terapi / Keluhan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!pregnancy || !pregnancy.anc_visits || pregnancy.anc_visits.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="border border-black p-4 text-center">Belum ada riwayat pemeriksaan.</td>
                            </tr>
                        ) : (
                            pregnancy.anc_visits.map((visit, index) => (
                                <tr key={visit.id}>
                                    <td className="border border-black p-2 text-center">{index + 1}</td>
                                    <td className="border border-black p-2 text-center">{formatDate(visit.created_at)}</td>
                                    <td className="border border-black p-2 text-center">{visit.gestational_age_weeks} Minggu</td>
                                    <td className="border border-black p-2 text-center">{visit.weight} kg</td>
                                    <td className="border border-black p-2 text-center">{visit.blood_pressure} mmHg</td>
                                    <td className="border border-black p-2">{visit.notes || '-'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Tanda Tangan Bidan */}
            <div className="flex justify-end mt-12 text-sm">
                <div className="text-center">
                    <p>Bidan Pemeriksa,</p>
                    <div className="h-16"></div>
                    <p className="font-bold underline">({clinic.name})</p>
                </div>
            </div>
        </div>
    );
}