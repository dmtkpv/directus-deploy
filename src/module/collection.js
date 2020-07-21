export default {
    collection: 'module_deploy',
    single: true,
    hidden: true,
    fields: [
        {
            auto_increment: true,
            datatype: 'INT',
            field: 'id',
            hidden_browse: true,
            hidden_detail: true,
            interface: 'primary-key',
            length: 15,
            primary_key: true,
            type: 'integer'
        },
        {
            field: 'command',
            interface: 'text-input',
            type: 'string',
            datatype: 'varchar',
            length: 200
        },
        {
            field: 'hooks',
            interface: 'repeater',
            type: 'json',
            datatype: 'text',
            options: {
                fields: [
                    {
                        field: 'hook',
                        interface: 'text-input',
                        type: 'string'
                    }
                ],
                template: '{{key}}'
            },

        },
        {
            field: 'divider',
            interface: 'divider',
            type: 'alias',
            options: {
                title: 'Last deploy'
            }
        },
        {
            field: 'status',
            interface: 'text-input',
            type: 'string',
            datatype: 'varchar',
            length: 200,
            width: 'half',
            readonly: true,
            options: {
                // iconLeft: 'error',
                placeholder: 'Fresh'
            }
        },
        {
            field: 'time',
            interface: 'datetime',
            type: 'datetime',
            datatype: 'datetime',
            width: 'half',
            readonly: true
        },
        {
            field: 'log',
            interface: 'code',
            type: 'string',
            datatype: 'text',
            readonly: true
        }
    ]
}