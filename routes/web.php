<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::get('/', [TodoController::class, 'index'])->name('todo.index');
Route::post('/todos/create', [TodoController::class, 'store'])->name('todo.store');
Route::post('/todos/{todo}/update', [TodoController::class, 'update'])->name('todo.update');
