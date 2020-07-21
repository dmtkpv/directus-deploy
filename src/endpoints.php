<?php

use Directus\Application\Http\Request;
use Directus\Application\Http\Response;
use Directus\Services\ItemsService;

return [
    '' => [
        'method' => 'GET',
        'handler' => function (Request $request, Response $response) {
            $hookEmitter = $this->get('hook_emitter');
            $hookEmitter->run('deploy.trigger');
            return $response->withStatus($response::HTTP_NOT_CONTENT);
        }
    ]
];

?>