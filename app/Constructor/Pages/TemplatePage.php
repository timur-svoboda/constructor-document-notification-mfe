<?php
 
namespace App\Constructor\Pages;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Constructor\Actions\FetchNodes;

class TemplatePage {
    public function __invoke(Request $request) {
        // $nodes = FetchNodes::run()->toArray();

        // $documents = [];
        // try {
        //     $documents = app()->handle(
        //         Request::create(
        //             '/api/documentation/fetchDocuments',
        //             'GET',
        //             [
        //                 'ids' => collect($nodes)->filter(fn ($node) => $node['type'] === 'document')
        //                     ->map(fn ($node) => $node['resourceId'])
        //                     ->toArray(),
        //             ],
        //         )
        //     )->getData();

        // } catch (\Throwable $throwable) {
        //     // Log error
        // }

        // $statistics = [];
        // try {
        //     $statistics = app()->handle(
        //         Request::create(
        //             '/api/notificationSystem/fetchStatistics',
        //             'GET',
        //             [
        //                 'ids' => collect($documents)
        //                     ->map(fn ($document) => $document->id)
        //                     ->toArray(),
        //             ],
        //         )
        //     )->getData();
        // } catch (\Throwable $throwable) {
        //     dd($throwable);
        //     // Log error
        // }

        // $notifications = [];
        // try {
        //     $notifications = app()->handle(
        //         Request::create(
        //             '/api/notificationSystem/fetchNotifications',
        //             'GET',
        //             [
        //                 'isRead' => false,
        //             ],
        //         )
        //     )->getData();
        // } catch (\Throwable $throwable) {
        //     // Log error
        // }
        
        return Inertia::render('Constructor/Pages/Src/Lib/TemplatePage/TemplatePage', [
            // 'nodes' => $nodes,
            // 'documents' => $documents,
            // 'statistics' => $statistics,
            // 'notifications' => $notifications,
        ]);
    }
}