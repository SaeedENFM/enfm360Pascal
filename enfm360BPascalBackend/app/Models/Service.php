<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description'
    ];

    // Get Surveys
    public function surveys (): BelongsToMany {
        return $this->belongsToMany(Survey::class);
    }

    // Get Assertions
    public function assertions(): HasMany {
        return $this->hasMany(Assertion::class);
    }
}
