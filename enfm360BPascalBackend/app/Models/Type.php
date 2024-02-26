<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Type extends Model
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


        // get choices
        public function choices(): BelongsToMany
        {
            return $this->belongsToMany(Choice::class);
        }
    
        // get choices
        public function options(): BelongsToMany
        {
            return $this->belongsToMany(Option::class);
        }

}
