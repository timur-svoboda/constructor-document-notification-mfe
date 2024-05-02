<?php
 
namespace App\Documentation\Actions;

use Illuminate\Support\Facades\Event;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use App\Documentation\Models\Document;
use App\Documentation\Resources\DocumentResource;
use App\Documentation\Events\DocumentDeleted;

class DeleteDocument {
    use AsAction;

    public function handle(string $id) {
        $document = Document::find($id);

        $documentResource = DocumentResource::from($document);
        
        $document->delete();

        Event::dispatch(
            new DocumentDeleted(
                documentResource: $documentResource
            )
        );
        
        return $documentResource;
    }

    public function rules() {
        return [
            'id' => ['required', 'exists:App\Documentation\Models\Document'],
        ];
    }

    public function asController(ActionRequest $request) {
        return $this->handle(
            id: $request->get('id'),
        );
    }
}