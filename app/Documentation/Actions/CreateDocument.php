<?php
 
namespace App\Documentation\Actions;

use Illuminate\Support\Facades\Event;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use App\Documentation\Models\Document;
use App\Documentation\Resources\DocumentResource;
use App\Documentation\Events\DocumentCreated;

class CreateDocument {
    use AsAction;

    public function handle(string $title, string $requestor) {
        $document = new Document();
        $document->title = $title;
        $document->save();

        $documentResource = new DocumentResource($document);

        Event::dispatch(
            new DocumentCreated(
                requestor: $requestor,
                documentResource: $documentResource,
            )
        );
        
        return $documentResource;
    }

    public function rules() {
        return [
            'title' => ['required', 'string', 'max:255'],
            'requestor' => ['string', 'min:1', 'max:255'],
        ];
    }

    public function asController(ActionRequest $request) {
        return $this->handle(
            title: $request->get('title'),
            requestor: $request->get('requestor')
        );
    }
}