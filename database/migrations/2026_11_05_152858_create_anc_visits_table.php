<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('anc_visits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('clinic_id')->constrained()->onDelete('cascade');
            $table->foreignId('pregnancy_id')->constrained()->onDelete('cascade');

            // Data Pemeriksaan Fisik ANC
            $table->integer('gestational_age_weeks'); // Usia kehamilan saat periksa
            $table->decimal('weight', 5, 2);          // Berat Badan
            $table->string('blood_pressure', 10);     // Tekanan Darah (TD)
            $table->text('notes')->nullable();          // Catatan / Keluhan / Terapi

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('anc_visits');
    }
};