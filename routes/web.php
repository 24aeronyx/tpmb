<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PregnancyController;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/clinics/{clinic}/patients', [PatientController::class, 'index'])->name('clinics.patients.index');
Route::post('/clinics/{clinic}/patients', [PatientController::class, 'store'])->name('clinics.patients.store');
Route::get('/clinics/{clinic}/patients/{patient}/pregnancies', [PregnancyController::class, 'show'])->name('clinics.patients.pregnancies.show');
Route::post('/clinics/{clinic}/patients/{patient}/pregnancies', [PregnancyController::class, 'store'])->name('clinics.patients.pregnancies.store');
Route::get('/clinics/{clinic}/patients/{patient}/pregnancies/print', [PregnancyController::class, 'print'])->name('clinics.patients.pregnancies.print');
