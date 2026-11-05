import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function Pregnancies({ clinic, patient, pregnancy }) {
    const [isOpen, setIsOpen] = useState(false);

    // Sesuaikan nama state dengan kolom database
    const { data, setData, post, processing, errors, reset } = useForm({
        hpht: '',
        hpl: '',
        gestational_age_weeks: '',
        weight: '',
        blood_pressure: '',
        notes: '',
    });

    const handleHphtChange = (e) => {
        const hphtValue = e.target.value;
        if (!hphtValue) {
            setData({ ...data, hpht: '', hpl: '', gestational_age_weeks: '' });
            return;
        }

        const hphtDate = new Date(hphtValue);
        const hplDate = new Date(hphtDate);
        hplDate.setDate(hplDate.getDate() + 280);
        const formattedHpl = hplDate.toISOString().split('T')[0];

        const today = new Date();
        const diffTime = today - hphtDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const estimatedWeeks = diffDays > 0 ? Math.floor(diffDays / 7) : 1;

        setData({
            ...data,
            hpht: hphtValue,
            hpl: formattedHpl,
            gestational_age_weeks: estimatedWeeks,
        });
    };

    // Helper fungsi format tanggal di dalam komponen
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        // Ambil bagian YYYY-MM-DD
        const dateOnly = dateString.split('T')[0];
        const [year, month, day] = dateOnly.split('-');

        // Format ke Bahasa Indonesia (misal: 11 Nov 2026)
        const dateObj = new Date(year, month - 1, day);
        return dateObj.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/clinics/${clinic.id}/patients/${patient.id}/pregnancies`, {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 lg:p-10">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header & Navigasi */}
                <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div>
                        <Link href={`/clinics/${clinic.id}/patients`} className="text-xs text-pink-600 font-semibold hover:underline">
                            ← Kembali ke Daftar Pasien
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 mt-1">Rekam Medis ANC Ibu Hamil</h1>
                        <p className="text-sm text-gray-600">
                            Pasien: <span className="font-semibold text-gray-800">{patient.name}</span> (NIK: {patient.nik})
                        </p>
                    </div>
                    <div className='flex gap-4'>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm text-sm"
                        >
                            + Catat Pemeriksaan (ANC)
                        </button>
                        <a
                            href={`/clinics/${clinic.id}/patients/${patient.id}/pregnancies/print`}
                            target="_blank"
                            className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-4 py-2 rounded-lg shadow-sm text-sm inline-flex items-center gap-1"
                        >
                            🖨️ Cetak Buku KIA
                        </a>
                    </div>

                </div>

                {/* Form Modal ANC */}
                {isOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl space-y-4">
                            <h2 className="text-lg font-bold text-gray-800">Pemeriksaan Kehamilan Baru</h2>
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">HPHT</label>
                                        <input
                                            type="date"
                                            value={data.hpht}
                                            onChange={handleHphtChange}
                                            className="w-full border-gray-300 rounded-md text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">HPL (Otomatis)</label>
                                        <input
                                            type="date"
                                            value={data.hpl}
                                            onChange={(e) => setData('hpl', e.target.value)}
                                            className="w-full border-gray-300 bg-gray-50 rounded-md text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">UK (Minggu)</label>
                                        <input
                                            type="number"
                                            value={data.gestational_age_weeks}
                                            onChange={(e) => setData('gestational_age_weeks', e.target.value)}
                                            className="w-full border-gray-300 rounded-md text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">BB (kg)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={data.weight}
                                            onChange={(e) => setData('weight', e.target.value)}
                                            className="w-full border-gray-300 rounded-md text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">TD (mmHg)</label>
                                        <input
                                            type="text"
                                            placeholder="120/80"
                                            value={data.blood_pressure}
                                            onChange={(e) => setData('blood_pressure', e.target.value)}
                                            className="w-full border-gray-300 rounded-md text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Catatan / Keluhan</label>
                                    <textarea
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        className="w-full border-gray-300 rounded-md text-sm"
                                        rows={2}
                                    />
                                </div>

                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 text-sm bg-pink-600 text-white rounded-md hover:bg-pink-700 disabled:opacity-50"
                                    >
                                        Simpan Pemeriksaan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Tabel Riwayat */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h3 className="font-semibold text-gray-800">Riwayat Pemeriksaan ANC</h3>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600">Tgl Periksa</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600">HPHT / HPL</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600">Usia Kehamilan</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600">TTV (BB / TD)</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600">Catatan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {!pregnancy || !pregnancy.anc_visits || pregnancy.anc_visits.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-6 text-gray-500">Belum ada riwayat pemeriksaan ANC.</td>
                                </tr>
                            ) : (
                                pregnancy.anc_visits.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-gray-600">{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                                        <td className="px-6 py-4 text-gray-800">
                                            <div>HPHT: {formatDate(pregnancy?.hpht)}</div>
                                            <div className="text-xs text-pink-600 font-medium">
                                                HPL: {formatDate(pregnancy?.hpl)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-700">{item.gestational_age_weeks} Minggu</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <div>{item.weight} kg</div>
                                            <div className="text-xs text-gray-500">{item.blood_pressure} mmHg</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{item.notes || '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}