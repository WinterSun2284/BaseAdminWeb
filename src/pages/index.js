import Loadable from 'react-loadable'
import Loading from '../components/Loading'

// 路由懒加载

const Login = Loadable({
    loader: () => import("./login"),
    loading: Loading,
})
const System = Loadable({
    loader: () => import("./system"),
    loading: Loading,
})
const Admin = Loadable({
    loader: () => import("./admin"),
    loading: Loading,
})
const NotFound = Loadable({
    loader: () => import("./notFound"),
    loading: Loading,
})
const User = Loadable({
    loader: () => import("./user/user"),
    loading: Loading,
})
const Watermark = Loadable({
    loader: () => import("./user/watermarkCode"),
    loading: Loading,
})

const Role = Loadable({
    loader: () => import("./user/role"),
    loading: Loading,
})

const Individual = Loadable({
    loader: () => import("./individual"),
    loading: Loading,
})
const DbConn = Loadable({
    loader: () => import("./database/dbConn"),
    loading: Loading,
})

const DbType = Loadable({
    loader: () => import("./database/dbType"),
    loading: Loading,
})


export {
    Login,
    System,
    Admin,
    NotFound,
    User,
    Watermark,
    Role,
    Individual,
    DbConn,
    DbType
}
