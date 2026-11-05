import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    const { clinic, auth } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar Kiri */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                {/* Brand Logo */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="bg-pink-600 text-white p-2 rounded-lg font-bold text-lg">
                            KIA
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900 text-base">Buku KIA Digital</h1>
                            <p className="text-xs text-pink-600 font-medium">TPMB Management</p>
                        </div>
                    </div>
                </div>

                {/* Info Klinik Aktif */}
                {clinic && (
                    <div className="mx-4 mt-4 p-3 bg-pink-50 border border-pink-100 rounded-lg">
                        <p className="text-[10px] uppercase font-bold text-pink-500">Klinik / TPMB Aktif</p>
                        <p className="text-xs font-semibold text-gray-800 truncate">{clinic.name}</p>
                    </div>
                )}

                {/* Menu Navigasi Sidebar */}
                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        href={clinic ? `/clinics/${clinic.id}/patients` : '#'}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-pink-700 bg-pink-50 transition"
                    >
                        <span>👥</span> Data Pasien & ANC
                    </Link>
                    <a
                        href="#"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                    >
                        <span>📊</span> Laporan Bulanan
                    </a>
                    <a
                        href="#"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                    >
                        <span>⚙️</span> Pengaturan Klinik
                    </a>
                </nav>

                {/* Footer Profil Bidan */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-800">Bidan Praktisi</p>
                            <p className="text-[11px] text-gray-500">Admin TPMB</p>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="text-xs text-red-600 hover:underline font-semibold"
                        >
                            Keluar
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Area Konten Utama */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                    <div className="text-sm font-semibold text-gray-700">
                        Sistem Informasi Kesehatan Ibu dan Anak
                    </div>
                    <div className="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-600 font-medium">
                        Status: <span className="text-green-600 font-bold">● Online (SQLite)</span>
                    </div>
                </header>

                {/* Konten Halaman */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}