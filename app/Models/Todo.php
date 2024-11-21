<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = [
        'title',
        'is_completed',
    ];

    protected $casts = [
        'is_completed' => 'boolean',
    ];
}