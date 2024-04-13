import { Router, static as static_ } from 'express'
import { 
    Register, 
    Login, 
    AuthenticatedUser, 
    Logout, 
    UpdateInfo, 
    UpdatePassword 
} from './controller/auth.controller'
import { 
    Users, 
    CreateUser, 
    GetUser, 
    UpdateUser, 
    DeleteUser 
} from './controller/user.controller'
import { AuthMiddleware } from './middleware/auth.middleware'
import { Permissions } from './controller/permission.controller'
import { CreateRole, Roles, GetRole, UpdateRole, DeleteRole } from './controller/role.controller'
import { CreateProduct, DeleteProduct, GetProduct, Products, UpdateProduct } from './controller/product.controller'
import { Upload } from './controller/image.controller'
import { Chart, Export, Orders } from './controller/order.controller'
import { PermissionMiddleware } from './middleware/permission.middleware'


export const routes = (router: Router) => {
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthMiddleware, AuthenticatedUser)
    router.post('/api/logout', AuthMiddleware, Logout)
    router.put('/api/users/info', AuthMiddleware, UpdateInfo)

    // Middleware Users
    const middlewareUser = PermissionMiddleware('users')
    
    router.put('/api/users/password', AuthMiddleware, middlewareUser , UpdatePassword)
    router.get('/api/users', AuthMiddleware, middlewareUser, Users)
    router.post('/api/users', AuthMiddleware, middlewareUser, CreateUser)
    router.get('/api/users/:id', AuthMiddleware, middlewareUser, GetUser)
    router.put('/api/users/:id', AuthMiddleware, middlewareUser, UpdateUser)
    router.delete('/api/users/:id', AuthMiddleware, middlewareUser, DeleteUser)

    router.get('/api/permissions', AuthMiddleware, Permissions)

    // Middleware Roles
    const middlewareRoles = PermissionMiddleware('roles')

    router.get('/api/roles', AuthMiddleware, middlewareRoles, Roles)
    router.get('/api/roles/:id', AuthMiddleware, middlewareRoles, GetRole)
    router.put('/api/roles/:id', AuthMiddleware, middlewareRoles, UpdateRole)
    router.delete('/api/roles/:id', AuthMiddleware, middlewareRoles, DeleteRole)
    router.post('/api/roles', AuthMiddleware, middlewareRoles, CreateRole)

    // Middleware Products
    const middlewareProducts = PermissionMiddleware('products')

    router.get('/api/products', AuthMiddleware, middlewareProducts, Products)  
    router.get('/api/products/:id', AuthMiddleware, middlewareProducts, GetProduct)
    router.post('/api/products', AuthMiddleware, middlewareProducts, CreateProduct)
    router.put('/api/products/:id', AuthMiddleware, middlewareProducts, UpdateProduct)
    router.delete('/api/products/:id', AuthMiddleware, middlewareProducts, DeleteProduct)

    router.post('/api/upload/', AuthMiddleware, Upload)
    router.use('/api/uploads', static_('./uploads'))

    router.get('/api/orders', AuthMiddleware, Orders)
    router.post('/api/export', AuthMiddleware, Export)

    router.get('/api/chart', AuthMiddleware, Chart)
}