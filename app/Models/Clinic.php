<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Clinic extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'slug',
        'license_number',
        'address',
        'phone',
    ];

    // Relasi: Satu klinik memiliki banyak pasien
    public function patients(): HasMany
    {
        return $this->hasMany(Patient::class);
    }

    // Relasi: Satu klinik memiliki banyak data kehamilan
    public function pregnancies(): HasMany
    {
        return $this->hasMany(Pregnancy::class);
    }
}