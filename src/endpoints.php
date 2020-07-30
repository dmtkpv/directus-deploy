<?php

use Directus\Application\Http\Request;
use Directus\Application\Http\Response;
use Directus\Services\ItemsService;

$log = realpath(__DIR__ . '/../../../../logs') . '/module_deploy.txt';

return [

    // ------------------------------------------------
    // GET /custom/deploy (run deploy command)
    // ------------------------------------------------

    '' => [
        'method' => 'GET',
        'handler' => function (Request $request, Response $response) use ($log) {


            // get collection data

            $itemsService = new ItemsService($this);
            $data = $itemsService->findOne('module_deploy')['data'];


            // kill previous deploy process

            $pid = $data['pid'];

            if ($pid && posix_getpgid($pid)) {
                posix_kill($pid, SIGTERM);
            }


            // empty log file

            file_put_contents($log, '');


            // execute command

            $descriptorspec = array(
               0 => array('pipe', 'r'),
               1 => array('file', $log, 'a'),
               2 => array('file', $log, 'a')
            );

            $process = proc_open($data['command'], $descriptorspec, $pipes);


            // update pid, status, time

            $status = proc_get_status($process);

            $itemsService->update('module_deploy', $data['id'], [
                'pid' => $status['pid'],
                'status' => 'Pending',
                'time' => date('Y-m-d H:i:s')
            ]);


            // finish request

            fastcgi_finish_request();


            // get process exit code

            $return_value = proc_close($process);

            if (!$return_value) {
                $itemsService->update('module_deploy', $data['id'], ['status' =>'Success']);
            }
            else if ($return_value !== 15) {
                $itemsService->update('module_deploy', $data['id'], ['status' => 'Error']);
            }


        }
    ],

    // ------------------------------------------------
    // GET /custom/deploy/status (run deploy command)
    // ------------------------------------------------

    'status' => [
        'method' => 'GET',
        'handler' => function (Request $request, Response $response) use ($log) {

            $itemsService = new ItemsService($this);
            $data = $itemsService->findOne('module_deploy')['data'];
            $data['log'] = file_get_contents($log);

            return $response->withJson([
                'data' => $data
            ]);

        }

    ]

];

?>