<?php

namespace Database\Factories;

use App\Models\Clinic;
use Illuminate\Database\Eloquent\Factories\Factory;

class PatientFactory extends Factory
{
    public function definition(): array
    {
        return [
            'clinic_id' => Clinic::factory(), // Otomatis membuat atau mengambil clinic_id
            'nik' => $this->faker->unique()->numerify('################'), // 16 digit NIK
            'name' => $this->faker->name('female'),
            'birth_date' => $this->faker->dateTimeBetween('-40 years', '-18 years')->format('Y-m-d'),
            'blood_type' => $this->faker->randomElement(['A', 'B', 'AB', 'O']),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'husband_name' => $this->faker->name('male'),
            'husband_phone' => $this->faker->phoneNumber(),
        ];
    }
}