import Vue from 'vue'
import VueRouter from 'vue-router'

// 缓加载
const Login = () => import("../views/management/Login.vue");
const Admin = () => import("../views/management/Admin");
const BlogManage = () => import("../views/management/managementchild/BlogManage");
const TypeManage = () => import("../views/management/managementchild/TypeManage");
const TagManage = () => import("../views/management/managementchild/TagManage");
const BlogList = () => import("../views/management/managementchild/blogmanage/BlogList");
const BlogRelease = () => import("../views/management/managementchild/blogmanage/BlogRelease");
const TypeList = () => import("../views/management/managementchild/typemanage/TypeList");
const TypeAdd = () => import("../views/management/managementchild/typemanage/TypeAdd");
const TagList = () => import("../views/management/managementchild/tagmanage/TagList");
const TagAdd = () => import("../views/management/managementchild/tagmanage/TagAdd");
const BlogModification = () => import("../views/management/managementchild/blogmanage/BlogModification");
const TypeModification = () => import("../views/management/managementchild/typemanage/TypeModification");
const TagModification = () => import("../views/management/managementchild/tagmanage/TagModification");
const Home = () => import("../views/home/Home");
const Type = () => import("../views/type/Type");
const Tag = () => import("../views/tag/Tag");
const File = () => import("../views/file/File");
const About = () => import("../views/about/About");

const BlogsType = () =>import("../views/type/blogs_type/BlogsType");
const BlogsTag = () =>import("../views/tag/blogs_tag/BlogsTag");

const Search = () =>import("../views/search/Search");
const Blog = () =>import("../views/blog/Blog");



Vue.use(VueRouter);

const routes = [
  // {
  //   path:'',
  //   redirect:'/home'
  // },
  {
    path:'',
    component:Home
  },
  {
    path:'/type',
    component:Type,
  },
  {
    path: '/type/:typeId',
    component:BlogsType
  },
  {
    path:'/tag',
    component:Tag,
  },
  {
    path: '/tag/:tagId',
    component:BlogsTag
  },
  {
    path:'/file',
    component:File
  },
  {
    path:'/about',
    component:About
  },
  {
    path:'/search/:searchParams',
    component:Search
  },
  {
    path:'/blog/:blogId',
    component:Blog
  },
  {
    path:'/login',
    component:Login,
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/admin',
    component:Admin,
    children:[
      {
        path:'',
        redirect:'/admin/blog'
      },
      {
        path:'/admin/blog',
        component:BlogManage,
        children:[
          {
            path:'',
            redirect:'/admin/blog/list'
          },
          {
            path:'/admin/blog/list',
            component:BlogList,
          },
          {
            path:'/admin/blog/release',
            component:BlogRelease
          },
          {
            path:'/admin/blog/modification/:blogId',
            component:BlogModification
          }
        ]
      },
      {
        path:'/admin/type',
        component:TypeManage,
        children:[
          {
            path: '',
            redirect: '/admin/type/list'
          },
          {
            path: '/admin/type/list',
            component:TypeList
          },
          {
            path: '/admin/type/add',
            component:TypeAdd
          },
          {
            path:'/admin/type/modification/:typeId',
            component:TypeModification
          }
        ]
      },
      {
        path:'/admin/tags',
        component:TagManage,
        children:[
          {
            path:'',
            redirect:'/admin/tags/list'
          },
          {
            path:'/admin/tags/list',
            component:TagList
          },
          {
            path:'/admin/tags/add',
            component:TagAdd
          },
          {
            path:'/admin/tags/modification/:tagId',
            component:TagModification
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode:'history',
  linkActiveClass:'active',
  scrollBehavior(to,from,savedPosition){
    return {
      x:0,
      y:0
    }
  }
});

export default router
