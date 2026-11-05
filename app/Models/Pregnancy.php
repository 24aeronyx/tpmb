<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pregnancy extends Model
{
    protected $fillable = [
        'clinic_id',
        'patient_id',
        'gravida',
        'partus',
        'abortus',
        'hpht',
        'hpl',
        'risk_factors',
        'status',
    ];

    protected $casts = [
        'hpht' => 'date',
        'hpl' => 'date',
    ];

    // Relasi: Data kehamilan milik satu klinik
    public function clinic(): BelongsTo
    {
        return $this->belongsTo(Clinic::class);
    }

    // Relasi: Data kehamilan ini milik satu pasien tertentu
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function ancVisits()
    {
        return $this->hasMany(AncVisit::class);
    }
}
