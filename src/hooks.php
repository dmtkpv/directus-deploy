<?php

use Directus\Database\TableGateway\RelationalTableGateway;
use Directus\Application\Application;


$container = Application::getInstance()->getContainer();
$dbConnection = $container->get('database');
$hooks = array('deploy.trigger');
$actions = [];


try {

    RelationalTableGateway::setContainer($container);
    $tableGateway = new RelationalTableGateway('module_deploy', $dbConnection, null);
    $data = $tableGateway->getOne(1)['data'];


    // extract hooks from db

    if ($data['hooks']) {
        $arr = json_decode($data['hooks'], true);
        foreach ($arr as $item) {
            if ($item['hook']) {
                array_push($hooks, $item['hook']);
            }
        }
    }

    if ($data['command']) {

//         $script = __DIR__ . '../modules/deploy/deploy.sh';
        $script = '/Users/dmitriykarpov/Sketches/directus/public/extensions/custom/modules/deploy/deploy.sh';

        error_log($script);

        $deploy = function () {
//             exec($script . ' "' . $data['command'] . '" > /dev/null 2>&1');
            exec($script);
        };

        $actions = array_fill_keys($hooks, $deploy);

    }




    // extract hooks from db

// error_log($data['command']);





} catch (Exception $e) {
    error_log($e->getMessage());
}





return [
    'actions' => $actions
];