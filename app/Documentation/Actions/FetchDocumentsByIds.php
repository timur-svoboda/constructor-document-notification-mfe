<?php
 
namespace App\Documentation\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use App\Documentation\Models\Document;
use App\Documentation\Resources\DocumentResource;

class FetchDocumentsByIds {
    use AsAction;

    public function handle(array $ids) {
        $documents = Document::find($ids);
        return DocumentResource::collection($documents);
    }

    public function rules() {
        return [
            'ids' => ['required', 'array'],
            'ids.*' => ['required', 'exists:App\Documentation\Models\Document,id'],
        ];
    }

    public function asController(ActionRequest $request) {
        return $this->handle($request->get('ids'));
    }
}