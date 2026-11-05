<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            // Kolom Multi-Tenancy
            $table->foreignId('clinic_id')->constrained()->onDelete('cascade');
            
            // Identitas Pasien (Buku KIA)
            $table->string('nik', 16)->unique();
            $table->string('name');
            $table->date('birth_date');
            $table->string('blood_type', 3)->nullable(); // A, B, AB, O (+/-)
            $table->string('phone');
            $table->text('address')->nullable();
            
            // Suami / Penanggung Jawab
            $table->string('husband_name')->nullable();
            $table->string('husband_phone')->nullable();
            
            $table->timestamps();
            
            // Indexing untuk performa pencarian multi-tenant
            $table->index(['clinic_id', 'nik']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};