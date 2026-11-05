<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pregnancies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('clinic_id')->constrained()->onDelete('cascade');
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            
            // Data Kehamilan
            $table->integer('gravida')->default(1); // Kehamilan ke-
            $table->integer('partus')->default(0);  // Melahirkan ke-
            $table->integer('abortus')->default(0); // Keguguran ke-
            $table->date('hpht');                   // Hari Pertama Haid Terakhir
            $table->date('hpl');                    // Hari Perkiraan Lahir
            $table->text('risk_factors')->nullable();// Faktor risiko (bila ada)
            
            $table->enum('status', ['active', 'delivered', 'closed'])->default('active');
            $table->timestamps();

            $table->index(['clinic_id', 'patient_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pregnancies');
    }
};