<?php

use App\Http\Controllers\WEB\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::controller(HomeController::class)->group(function () {
    Route::get('/','index')->name('home');
    Route::get('/about-us','aboutUs');
    Route::get('/services','services');
    Route::get('/portfolio','portfolio');
    Route::get('/blog','blog');
    Route::get('/blog/{slug}','blogDetail');
    Route::get('/contact-us','contactUs');
    Route::post('/send-mail','sendMail')->name('send.mail');

});

// Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
