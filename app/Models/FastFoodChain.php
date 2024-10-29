<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class FastFoodChain extends Model
{
    use HasFactory;

    protected $fillable = [
        'branch_name',
        'founder',
        'location',
        'date_founded',
        'created_by',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}

