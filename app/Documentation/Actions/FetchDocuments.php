<?php
 
namespace App\Documentation\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use App\Documentation\Models\Document;
use App\Documentation\Resources\DocumentResource;

class FetchDocuments {
    use AsAction;

    public function handle(array $ids) {
        $documents = Document::query()
            ->when($ids, fn ($query) => $query->whereIn('id', $ids))
            ->get();

        return DocumentResource::collection($documents);
    }

    public function rules() {
        return [
            'ids' => ['array'],
            'ids.*' => ['exists:App\Documentation\Models\Document,id'],
        ];
    }

    public function asController(ActionRequest $request) {
        return $this->handle(ids: $request->get('ids'));
    }
}