<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Assertion extends Model
{
    use HasFactory;

    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'description'
    ];

    // Get associate Service
    public function service(): BelongsTo {
        return $this->belongsTo(Service::class);
    }

    // Get choices
    public function choices() {
        return $this->belongsToMany(Choice::class);
    }

}
