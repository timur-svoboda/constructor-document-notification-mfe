<?php

use Illuminate\Support\Facades\Route;
use App\Documentation\Actions\CreateDocument;
use App\Documentation\Actions\FetchDocumentsByIds;

Route::get('fetchDocumentsByIds', FetchDocumentsByIds::class);
Route::post('createDocument', CreateDocument::class);