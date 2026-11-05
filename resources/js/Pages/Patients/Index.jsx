import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Index({ clinic, patients }) {
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        nik: '',
        name: '',
        phone: '',
        address: '',
        birth_date: '', // <-- Tambahkan default value
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/clinics/${clinic.id}/patients`, {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Buku KIA Digital</h1>
                        <p className="text-sm text-gray-600">Klinik / TPMB: <span className="font-semibold text-pink-600">{clinic.name}</span></p>
                    </div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
                    >
                        + Tambah Pasien Baru
                    </button>
                </div>

                {/* Form Modal */}
                {isOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
                            <h2 className="text-lg font-bold mb-4 text-gray-800">Registrasi Ibu Hamil Baru</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">NIK (16 Digit)</label>
                                    <input
                                        type="text"
                                        maxLength={16}
                                        value={data.nik}
                                        onChange={(e) => setData('nik', e.target.value)}
                                        className="w-full border-gray-300 rounded-md text-sm focus:ring-pink-500 focus:border-pink-500"
                                        required
                                    />
                                    {errors.nik && <div className="text-red-500 text-xs mt-1">{errors.nik}</div>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Nama Lengkap Ibu</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full border-gray-300 rounded-md text-sm focus:ring-pink-500 focus:border-pink-500"
                                        required
                                    />
                                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">No. WhatsApp/Telepon</label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full border-gray-300 rounded-md text-sm focus:ring-pink-500 focus:border-pink-500"
                                        required
                                    />
                                    {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Alamat Domisili</label>
                                    <input
                                        type="text"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="w-full border-gray-300 rounded-md text-sm focus:ring-pink-500 focus:border-pink-500"
                                        required
                                    />
                                    {errors.address && <div className="text-red-500 text-xs mt-1">{errors.address}</div>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Tanggal Lahir</label>
                                    <input
                                        type="date"
                                        value={data.birth_date}
                                        onChange={(e) => setData('birth_date', e.target.value)}
                                        className="w-full border-gray-300 rounded-md text-sm focus:ring-pink-500 focus:border-pink-500"
                                        required
                                    />
                                    {errors.birth_date && <div className="text-red-500 text-xs mt-1">{errors.birth_date}</div>}
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
                                        Simpan Pasien
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Data Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600">NIK</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600">Nama Ibu Hamil</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600">No. HP</th>
                                <th className="px-6 py-3 text-right font-semibold text-gray-600">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {patients.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-gray-500">Belum ada data pasien.</td>
                                </tr>
                            ) : (
                                patients.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-mono text-gray-700">{patient.nik}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{patient.name}</td>
                                        <td className="px-6 py-4 text-gray-600">{patient.phone}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/clinics/${clinic.id}/patients/${patient.id}/pregnancies`}
                                                className="text-xs bg-pink-50 text-pink-700 hover:bg-pink-100 font-semibold px-3 py-1.5 rounded-md inline-block"
                                            >
                                                Lihat Rekam Medis (ANC)
                                            </Link>
                                        </td>
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