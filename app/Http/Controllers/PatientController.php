<?php

namespace App\Http\Controllers;

use App\Models\Clinic;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index(Clinic $clinic)
    {
        return Inertia::render('Patients/Index', [
            'clinic' => $clinic,
            'patients' => $clinic->patients()->latest()->get(),
        ]);
    }

    public function store(Request $request, Clinic $clinic)
    {
        $validated = $request->validate([
            'nik' => 'required|string|size:16',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string',
            'birth_date' => 'required|date', // <-- Pastikan ini ada
        ]);

        $clinic->patients()->create($validated);

        return redirect()->back()->with('message', 'Pasien berhasil ditambahkan!');
    }
}
