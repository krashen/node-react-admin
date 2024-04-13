import 'dotenv/config'
import { DataSource } from 'typeorm';
import { Permission } from '../entity/permission.entity'
import { Role } from '../entity/role.entity'

const myDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Permission, Role],
})

myDataSource.initialize().then(async() => {
    const permRepo = myDataSource.getRepository(Permission);

    const perms = [
        'view_users',
        'edit_users',
        'view_roles',
        'edit_roles',
        'view_products',
        'edit_products',
        'view_orders',  
        'edit_orders',
    ];

    let permissions = []

    for (let i = 0; i < perms.length; i++) {
        permissions.push(await permRepo.save({
            name: perms[i]
        }))
    }

    const roleRepository = myDataSource.getRepository(Role)

    await roleRepository.save({
        name: 'admin',
        permissions
    })

    delete permissions[3]

    await roleRepository.save({
        name: 'editor',
        permissions
    })

    delete permissions[1]
    delete permissions[5]
    delete permissions[7]

    await roleRepository.save({
        name: 'viewer',
        permissions
    })
    
    await myDataSource.destroy()
})

console.log('Roles seeding finished')


