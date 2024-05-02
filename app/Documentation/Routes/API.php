<?php

use Illuminate\Support\Facades\Route;
use App\Documentation\Actions\CreateDocument;
use App\Documentation\Actions\FetchDocuments;

Route::get('fetchDocuments', FetchDocuments::class);
Route::post('createDocument', CreateDocument::class);