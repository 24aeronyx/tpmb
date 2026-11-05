<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ClinicFactory extends Factory
{
    public function definition(): array
    {
        $name = 'TPMB Bidan ' . $this->faker->name();
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'license_number' => 'SIPB-' . $this->faker->numerify('#####'),
            'address' => $this->faker->address(),
            'phone' => $this->faker->phoneNumber(),
        ];
    }
}