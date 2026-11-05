<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'clinic_id',
        'nik',
        'name',
        'birth_date',
        'blood_type',
        'phone',
        'address',
        'husband_name',
        'husband_phone',
    ];

    // Relasi: Pasien milik satu klinik
    public function clinic(): BelongsTo
    {
        return $this->belongsTo(Clinic::class);
    }

    // Relasi: Satu pasien (ibu) bisa memiliki riwayat beberapa kehamilan
    public function pregnancies(): HasMany
    {
        return $this->hasMany(Pregnancy::class);
    }
}