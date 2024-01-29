<script setup lang="ts">
const rawRules = [
    `
        [{
            "action": "read",
            "subject": "DetalleDeComision",
            "conditions": {
                "receptor": "\${ user.name }",
                "role": { "$in": \${JSON.stringify(user.roles)} }
            },
            "scope": {
                "user.name": "<%= user.name %>"
            }
        }]
    `,
    `
        [{
            "action": "manage",
            "subject": "DetalleDeComision",
            "scope": {
                "user.name": "KENYI"
            }
        }]
    `,
]
const meta = {
    user: {
        name: 'DIEGO',
        roles: ['SALES'],
    },
}

const { can, cannot } = getCaslAbility(rawRules, meta)
const { can: adminCan } = getCaslAbility(rawRules, { user: { name: 'KENYI', roles: ['SYSADMIN'] } })

can('read', 'DetalleDeComision', 'receptor')
// ^?
can('update', 'DetalleDeComision', 'receptor')
// ^?
cannot('read', { __typename: 'DetalleDeComision' }, 'receptor')
// ^?
cannot('update', { __typename: 'DetalleDeComision' }, 'receptor')
// ^?
</script>

<template>
    <div>
        {{ can('read', 'DetalleDeComision', 'receptor') }}
        {{ adminCan('read', 'DetalleDeComision', 'receptor') }}
        {{ can('update', 'DetalleDeComision', 'receptor') }}
        {{ adminCan('update', 'DetalleDeComision', 'receptor') }}
        {{ can('read', { __typename: 'DetalleDeComision' }, 'receptor') }}
        {{ adminCan('read', { __typename: 'DetalleDeComision' }, 'receptor') }}
        {{ can('read', { __typename: 'DetalleDeComision', receptor: 'DIEGO' }, 'receptor') }}
        {{ adminCan('read', { __typename: 'DetalleDeComision', receptor: 'DIEGO' }, 'receptor') }}
        {{ can('read', { __typename: 'DetalleDeComision', receptor: 'DIEGO', role: 'SALES' }, 'receptor') }}
        {{ adminCan('read', { __typename: 'DetalleDeComision', receptor: 'DIEGO', role: 'SALES' }, 'receptor') }}
    </div>
</template>
