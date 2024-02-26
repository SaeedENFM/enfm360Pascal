<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Choice extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'description',
        'type_id'
    ];

      // get type
      public function type(): HasOne {
       return $this->hasOne(Type::class);
    }

    // Get assertions
    public function assertions() : belongsToMany {
        return $this->belongsToMany(Assertion::class);
    }

    // Get answers
    public function answers() : belongsToMany {
      return $this->belongsToMany(Answer::class);
    }


}
