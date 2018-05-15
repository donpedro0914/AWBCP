<?php

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

Route::get('/', 'HomepageController@index');


Route::get('/admin', 'AdminController@index');


Auth::routes();
//Admin
Route::get('/dashboard', 'AdminController@dashboard');
Route::get('/logout', 'Auth\LoginController@logout');
Route::get('/home', 'AdminController@dashboard')->name('home');

Route::post('product/store', 'ProductController@store');

