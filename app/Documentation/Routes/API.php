<?php

use Illuminate\Support\Facades\Route;
use App\Documentation\Actions\FetchDocuments;
use App\Documentation\Actions\CreateDocument;
use App\Documentation\Actions\DeleteDocument;

Route::get('fetchDocuments', FetchDocuments::class);
Route::post('createDocument', CreateDocument::class);
Route::delete('deleteDocument', DeleteDocument::class);