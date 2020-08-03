export default {
    collection: 'module_deploy',
    single: true,
    hidden: true,
    fields: {
        id: {
            field: 'id',
            interface: 'primary-key',
            type: 'integer',
            datatype: 'INT',
            length: 15,
            primary_key: true,
            hidden_browse: true,
            hidden_detail: true,
            auto_increment: true,
        },
        pid: {
            field: 'pid',
            interface: 'numeric',
            type: 'integer',
            datatype: 'INT',
            hidden_browse: true,
            hidden_detail: true
        },
        cmd: {
            field: 'cmd',
            interface: 'text-input',
            type: 'string',
            datatype: 'varchar',
            length: 200,
            hidden_browse: true,
            hidden_detail: true
        },
        command: {
            field: 'command',
            interface: 'text-input',
            type: 'string',
            datatype: 'varchar',
            length: 200
        },
        divider: {
            field: 'divider',
            interface: 'divider',
            type: 'alias',
            options: {
                title: 'Last deploy'
            }
        },
        status: {
            field: 'status',
            interface: 'text-input',
            type: 'string',
            datatype: 'varchar',
            length: 200,
            width: 'half',
            readonly: true,
            options: {
                placeholder: 'Fresh'
            }
        },
        time: {
            field: 'time',
            interface: 'datetime',
            type: 'datetime',
            datatype: 'datetime',
            width: 'half',
            readonly: true
        },
        log: {
            field: 'log',
            interface: 'code',
            type: 'string',
            datatype: 'text',
            readonly: true
        }
    }
}