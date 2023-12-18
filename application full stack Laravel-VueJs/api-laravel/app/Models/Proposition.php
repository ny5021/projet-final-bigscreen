<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Proposition extends Model
{
    use HasFactory;

    /**
     * fillable
     * Les attributs de Proposition renseignables
     * @var array
     */
    protected $fillable = [
        'proposition',
        'question_id'
    ];

    /**
     * question
     * récupère la question liée à cette proposition
     * @return BelongsTo
     */
    public function question(): BelongsTo {
        return $this->belongsTo(Question::class);
    }
}
