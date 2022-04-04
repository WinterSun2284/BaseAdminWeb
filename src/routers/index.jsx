import {Login, NotFound, System, User, Admin, Role, Individual} from "@/pages";
import {
    UserOutlined,
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
