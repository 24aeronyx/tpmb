<?php

namespace Database\Seeders;

use App\Models\Clinic;
use App\Models\Patient;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat 3 data klinik dummy
        Clinic::factory(3)->create()->each(function ($clinic) {
            // 2. Untuk setiap klinik, buat 5 data pasien dummy
            Patient::factory(5)->create([
                'clinic_id' => $clinic->id,
            ]);
        });
    }
}