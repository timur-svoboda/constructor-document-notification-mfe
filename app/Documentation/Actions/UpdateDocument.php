<?php
 
namespace App\Documentation\Actions;

use Illuminate\Support\Facades\Event;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use App\Documentation\Models\Document;
use App\Documentation\Resources\DocumentResource;
use App\Documentation\Events\DocumentUpdated;

class UpdateDocument {
    use AsAction;

    public function handle(string $id, string | null $title) {
        $document = Document::find($id);

        $oldDocumentResource = new DocumentResource($document);

        $hasChanges = false;

        if ($title && $document->title !== $title) {
            $document->title = $title;
            $hasChanges = true;
        }

        $document->save();

        $newDocumentResource = new DocumentResource($document);

        if ($hasChanges) {
            Event::dispatch(
                new DocumentUpdated(
                    oldDocumentResource: $oldDocumentResource,
                    newDocumentResource: $newDocumentResource,
                )
            );
        }

        return $newDocumentResource;
    }

    public function rules() {
        return [
            'id' => ['required', 'exists:App\Documentation\Models\Document,id'],
            'title' => ['string', 'min:1', 'max:255'],
        ];
    }

    public function asController(ActionRequest $request) {
        return $this->handle(
            id: $request->get('id'),
            title: $request->get('title'),
        );
    }
}