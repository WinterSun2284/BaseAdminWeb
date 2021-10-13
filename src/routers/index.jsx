import {Login, NotFound, System, User, Admin, Watermark} from "../pages";
import {
    UserOutlined,
    TagsOutlined,
    SettingOutlined,
    HomeOutlined
} from "@ant-design/icons";

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
        icon: <HomeOutlined />,
    },
    {
        pathName: '/admin/user',
        name: "用户管理",
        icon: <UserOutlined/>,
        component: null,
        children: [
            {
                pathName: '/admin/user/user',
                name: "用户管理",
                icon: <UserOutlined/>,
                component: User
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
        pathName: '/admin/system',
        component: System,
        name: "系统管理",
        icon: <SettingOutlined/>,
    },

]

export {
    commonRoutes,
    privateRoutes
}
