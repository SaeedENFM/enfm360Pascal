<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Option extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'min',
        'max',
        'required',
        'width',
        'height',
        'color',
        'rows',
        'cols',
        'mime'
    ];

    // get types
    public function types(): BelongsToMany
    {
        return $this->belongsToMany(Type::class);
    }
}
