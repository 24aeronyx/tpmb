<?php

namespace App\Http\Controllers;

use App\Models\Clinic;
use App\Models\Patient;
use App\Models\Pregnancy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PregnancyController extends Controller
{
    public function show(Clinic $clinic, Patient $patient)
    {
        if ($patient->clinic_id !== $clinic->id) {
            abort(404);
        }

        // Ambil kehamilan aktif pasien beserta riwayat kunjungan ANC-nya
        $pregnancy = $patient->pregnancies()->with('ancVisits')->latest()->first();

        return Inertia::render('Patients/Pregnancies', [
            'clinic' => $clinic,
            'patient' => $patient,
            'pregnancy' => $pregnancy,
        ]);
    }

    public function store(Request $request, Clinic $clinic, Patient $patient)
    {
        if ($patient->clinic_id !== $clinic->id) {
            abort(404);
        }

        $validated = $request->validate([
            'hpht' => 'required|date',
            'hpl' => 'required|date',
            'gestational_age_weeks' => 'required|integer|min:1|max:42',
            'weight' => 'required|numeric',
            'blood_pressure' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        // 1. Cari atau buat record kehamilan aktif untuk pasien ini
        $pregnancy = $patient->pregnancies()->firstOrCreate(
            ['status' => 'active'],
            [
                'clinic_id' => $clinic->id,
                'hpht' => $validated['hpht'],
                'hpl' => $validated['hpl'],
            ]
        );

        // 2. Catat kunjungan pemeriksaan ANC baru
        $pregnancy->ancVisits()->create([
            'clinic_id' => $clinic->id,
            'gestational_age_weeks' => $validated['gestational_age_weeks'],
            'weight' => $validated['weight'],
            'blood_pressure' => $validated['blood_pressure'],
            'notes' => $validated['notes'],
        ]);

        return redirect()->back()->with('message', 'Pemeriksaan ANC berhasil dicatat!');
    }

    public function print(Clinic $clinic, Patient $patient)
    {
        if ($patient->clinic_id !== $clinic->id) {
            abort(404);
        }

        $pregnancy = $patient->pregnancies()->with('ancVisits')->latest()->first();

        return Inertia::render('Patients/PrintPregnancy', [
            'clinic' => $clinic,
            'patient' => $patient,
            'pregnancy' => $pregnancy,
        ]);
    }
}
