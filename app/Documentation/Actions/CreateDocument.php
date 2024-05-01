<?php
 
namespace App\Documentation\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\ActionRequest;
use App\Documentation\Models\Document;
use App\Documentation\Resources\DocumentResource;

class CreateDocument {
    use AsAction;

    public function handle(string $title) {
        $document = new Document();
        $document->title = $title;
        $document->save();
        return new DocumentResource($document);
    }

    public function rules() {
        return [
            'title' => ['required', 'string', 'max:255'],
        ];
    }

    public function asController(ActionRequest $request) {
        return $this->handle($request->get('title'));
    }
}