<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Issue_Images extends Model
{
    protected $table = 'issue_images';

    protected $fillable = ['issue_id', 'images'];
}
