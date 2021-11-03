import {Login, NotFound, System, User, Admin, Watermark, Role, Individual, DbConn, DbType} from "../pages";
import {
    UserOutlined,
    TagsOutlined,
    SettingOutlined,
    HomeOutlined
} from "@ant-design/icons";
import MyIcon from '../components/MyIcon'

const commonRoutes = [
    {
        pathName: '/login',
        component: Login
    },
    {
        pathName: '/404',
        component: NotFound
    }

]

const privateRoutes = [
    {
        pathName: '/admin',
        component: Admin,
        name: "首页",
        icon: <HomeOutlined/>,
        isFirst: true,
        id: 1,
    },
    {
        pathName: '/admin/database',
        name: "数据库管理",
        icon: <MyIcon type={'icon-database'}/>,
        component: null,
        isFirst: true,
        id: 4,
        children: [
            {
                pathName: '/admin/database/dbConn',
                name: "数据库连接管理",
                icon: <MyIcon type={'icon-shujukulianjie'}/>,
                component: DbConn
            },
            {
                pathName: '/admin/database/dbType',
                name: "数据库类型管理",
                icon: <MyIcon type={'icon-shujukuleixing'}/>,
                component: DbType
            }
        ]
    },
    {
        pathName: '/admin/user',
        name: "用户管理",
        icon: <UserOutlined/>,
        component: null,
        isFirst: true,
        id: 2,
        children: [
            {
                pathName: '/admin/user/user',
                name: "用户管理",
                icon: <UserOutlined/>,
                component: User
            },
            {
                pathName: '/admin/user/role',
                name: "角色管理",
                icon: <MyIcon type={'icon-jiaoseguanli'}/>,
                component: Role
            },
            {
                pathName: '/admin/user/watermark',
                name: "标识码管理",
                icon: <TagsOutlined/>,
                component: Watermark
            }
        ]
    },
    {
        pathName: '/admin/test',
        component: System,
        name: "测试",
        icon: <SettingOutlined/>,
        isFirst: true,
        id: 3,
        children: [
            {
                pathName: '/admin/test/watermark',
                name: "标识码管理",
                icon: <TagsOutlined/>,
                component: Watermark
            }
        ]
    },
    {
        pathName: '/admin/system',
        component: System,
        name: "系统管理",
        icon: <SettingOutlined/>,
        isFirst: true,
        id: 10,
    },
]

const hideRoutes = [
    {
        pathName: '/admin/individual',
        component: Individual,
    },
]

export {
    commonRoutes,
    privateRoutes,
    hideRoutes
}
