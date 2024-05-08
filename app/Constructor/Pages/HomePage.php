<?php
 
namespace App\Constructor\Pages;

use Inertia\Inertia;

class HomePage {
    public function __invoke() {
        return Inertia::render('Constructor/Pages/Src/Lib/HomePage/HomePage');
    }
}