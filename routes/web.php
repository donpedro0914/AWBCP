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
Route::get('/product/x/{any}', 'HomepageController@product');
Route::get('/issue/{any}', 'HomepageController@issue');


Route::get('/admin', 'AdminController@index');


Auth::routes();
//Admin
Route::get('/dashboard', 'AdminController@dashboard');
Route::get('/logout', 'Auth\LoginController@logout');

Route::post('product/store', 'ProductController@store');
Route::get('/product/add', 'ProductController@addproduct');
Route::get('/product/addissue/{id}', 'ProductController@addissue');
Route::get('product/product_list', 'ProductController@product_list')->name('product.product_list');
Route::get('product/info/{id}', 'ProductController@edit');
Route::get('issue/info/{id}', 'IssueController@edit');
Route::get('issue/issue_list/{id}', 'IssueController@issue_list')->name('issue.issue_list');
Route::post('issue/store', 'IssueController@store');

Route::delete('product/delete/{id}', 'ProductController@delete');

