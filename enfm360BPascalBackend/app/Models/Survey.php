<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Survey extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'date_start',
        'date_end',
        'nb_max_attempt',
        'user_id',
        'project_id'
    ];


    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_start' => 'datetime',
        'date_end' => 'datetime'
    ];

    // Get creator
    public function user (): HasOne {
        return $this->hasOne(User::class);
    }

    // Get Project
    public function project (): HasOne {
        return $this->hasOne(Project::class);
    }

    // get Services
    public function services (): BelongsToMany {
        return $this->belongsToMany(Service::class);
    }
}
