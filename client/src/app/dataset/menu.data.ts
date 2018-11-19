/**
 * 菜单接口，侧边栏菜单接口对象
 */
export interface Menu {
  /**菜单选项的名字 */
  name: string;
  /**菜单选项的icon类型 */
  style?: string;
  /**用来确定用户的权限, 有一些menu必须要确定的权限才能够读取 */
  auth?: any;
  routerlink?: string;
  // 在父一级的是 Array<string>
  // 子一级的是 strings
  /**包含的子菜单（可选） */
  subMenu?: Array<Menu>;
}

/**
 * static value for the menus, easy to expand in the future
 */
export const menu: Array<Menu> = [
  {
    // <i class="anticon anticon-environment-o"></i>
    name: "Money Collection",
    // <i nz-icon type="money-collect" theme="outline"></i>
    style: "money-collect",
    auth: ["super", "admin", "user"],
    subMenu: [
      {
        name: "Report",

        auth: "super",
        routerlink: "/core/money/report"
      },
      {
        name: "History",
        routerlink: "add-regional-admin",
        auth: "admin"
      },
      {
        name: "Add a Record",
        routerlink: "/core/money/addRecord",
        auth: "super"
      },
      {
        name: "Setting",
        routerlink: "/core/money/setting",
        auth: "admin"
      }
    ]
  },
  {
    // <i class="anticon anticon-database"></i>
    name: "My Blogs",

    style: "form",
    auth: ["super", "admin", "user"],
    subMenu: [
      {
        name: "Dashboard",
        routerlink: "add-regional-admin",
        auth: "super"
      },
      {
        name: "Blog list",
        routerlink: "add-regional-admin",
        auth: "admin"
      },
      {
        name: "History of Today",
        routerlink: "add-regional-admin",
        auth: "super"
      }
    ]
  },
  {
    // <i nz-icon type="hourglass" theme="outline"></i>
    name: "Todo",
    style: "hourglass",
    subMenu: [
      {
        // default to inbox
        name: "Inbox",
        routerlink: "/core/todo/inbox"
      },
      {
        name: "Today"
      },
      // done use timeline page
      {
        name: "Done",
        routerlink: "/core/todo/archieve"
      }
    ]
  },

  {
    // <i class="anticon anticon-tool"></i>
    // <i nz-icon type="user" theme="outline"></i>
    name: "Account",
    style: "user",
    auth: ["super", "admin", "user"],
    subMenu: [
      { name: "My account", routerlink: "add-regional-admin", auth: "super" },
      { name: "Manage", routerlink: "add-regional-admin", auth: "super" }

      // 普通用户具有的设置功能
    ]
  },
  {
    // <i class="anticon anticon-usergroup-add"></i>

    name: "Setting",
    style: "setting",
    auth: ["super", "admin"]

    // note:  super 可以添加 上面两个,
    // admin 只能添加当前区域下面的公司管理员
  }
];
