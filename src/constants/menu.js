const data = [{
    id: "dashboards",
    icon: "iconsminds-shop-4",
    label: "menu.dashboards",
    to: "/app/dashboard",
    // subs: [{
    //     icon: "simple-icon-briefcase",
    //     label: "menu.default",
    //     to: "/app/dashboard/default"
    //   },
    //   {
    //     icon: "simple-icon-pie-chart",
    //     label: "menu.analytics",
    //     to: "/app/dashboard/analytics"
    //   },
    //   {
    //     icon: "simple-icon-basket-loaded",
    //     label: "menu.ecommerce",
    //     to: "/app/dashboard/ecommerce"
    //   },
    //   {
    //     icon: "simple-icon-doc",
    //     label: "menu.content",
    //     to: "/app/dashboard/content"
    //   }
    // ]
  },
    {
        id: 'categories',
        icon: "simple-icon-list",
        label: "menu.categories",
        to: "/app/categories",
        subs: [{
            icon: 'simple-icon-note',
            label: "menu.create",
            permissions: 'category.store',
            to: "/app/categories/create",
        }, {
            icon: 'iconsminds-preview',
            label: "menu.view",
            permissions: 'category',
            to: "/app/categories/view",
        }]
    },
    {
        id: 'Users',
        icon: "simple-icon-user-follow",
        label: "menu.users",
        subPermissions: ['user','user.store','user.edit', 'user.update', 'user.delete'],
        to: "/app/users/view",
        subs: [
                {
                icon: 'simple-icon-note',
                label: "menu.create",
                permissions: 'user.store',
                to: "/app/users/create",
            },
            {
                icon: "iconsminds-preview",
                label: "menu.view",
                permissions: 'user',
                to: "/app/users/view"
            }]
    },
    {
        id: 'authors',
        icon: "iconsminds-user",
        label: "menu.authors",
        subPermissions: ['author','author.store', 'author.edit', 'author.update', 'author.delete'],
        to: "/app/author/view",
        subs: [
            {
                icon: 'simple-icon-note',
                label: "menu.create",
                permissions: 'author.store',
                to: "/app/author/create",
            },
            {
                icon: "iconsminds-preview",
                label: "menu.view",
                permissions: 'author',
                to: "/app/author/view"
            }]
    },
    {
        id: 'posts',
        icon: "iconsminds-box-with-folders",
        label: "menu.posts",
        subPermissions: ['post','post.store', 'post.edit', 'post.update', 'post.delete'],
        to: "/app/post/view",
        subs: [
                {
                icon: 'simple-icon-note',
                label: "menu.create",
                permissions: 'post.store',
                to: "/app/post/create",
            },
            {
                icon: "iconsminds-preview",
                label: "menu.view",
                permissions: 'post',
                to: "/app/post/view"
            }]
    },
    {
        id: 'quotes',
        icon: "iconsminds-quotes",
        label: "menu.quotes",
        subPermissions: ['quote','quote.store', 'quote.edit', 'quote.update', 'quote.delete'],
        to: "/app/post/view",
        subs: [
            {
                icon: 'simple-icon-note',
                label: "menu.create",
                permissions: 'quote.store',
                to: "/app/quote/create",
            },
            {
                icon: "iconsminds-preview",
                label: "menu.view",
                permissions: 'quote',
                to: "/app/quote/view"
            }]
    },
    {
        id: 'tags',
        icon: "iconsminds-tag-3",
        label: "menu.tags",
        subPermissions: [
            'tag',
            'tag.store',
            'tag.edit',
            'tag.update',
            'tag.delete',
            'seo-tag',
            'seo-tag.store',
            'seo-tag.edit',
            'seo-tag.update',
            'seo-tag.delete'
        ],
        to: "/app/tags/view",
        subs: [
                {
                icon: 'simple-icon-note',
                label: "menu.create",
                permissions: 'tag.store',
                to: "/app/tags/create",
            },
            {
                icon: "iconsminds-preview",
                label: "menu.view",
                permissions: 'tag',
                to: "/app/tags/view"
            },
            {
                id: 'seotags',
                icon: "simple-icon-key",
                label: "menu.seo-tags",
                subPermissions: ['seo-tag', 'seo-tag.store', 'seo-tag.edit', 'seo-tag.update', 'seo-tag.delete'],
                to: "/app/seo-tags",
                subs: [{
                    icon: 'simple-icon-note',
                    label: "menu.create",
                    permissions: 'seo-tag.store',
                    to: "/app/seo-tags/create",
                },
                    {
                        icon: 'iconsminds-preview',
                        label: "menu.view",
                        permissions: 'seo-tag',
                        to: "/app/seo-tags/view",
                    }]
            }
        ]
    },
    {
        id: "newsletter",
        icon: "iconsminds-bird-delivering-letter",
        label: "menu.newsletter",
        permissions: 'newsletter',
        to: "/app/newsletter",
    },
    {
        id: 'settings',
        icon: 'simple-icon-settings',
        label: 'menu.settings',
        subPermissions: [
            'permission',
            'permission.store',
            'permission.edit',
            'permission.update',
            'permission.delete',
            'role',
            'role.store',
            'role.edit',
            'role.update',
            'role.delete',
        ],
        to: "/app/settings/general",
        subs: [
            {
                id: 'Roles',
                icon: "iconsminds-key-lock",
                label: "menu.roles",
                subPermissions: [
                    'role',
                    'role.store',
                    'role.edit',
                    'role.update',
                    'role.delete',
                ],
                to: "/app/roles",
                subs: [{
                    icon: 'simple-icon-note',
                    label: "menu.create",
                    permissions: 'role.store',
                    to: "/app/roles/create",
                }, {
                    icon: 'iconsminds-preview',
                    label: "menu.view",
                    permissions: 'role',
                    to: "/app/roles/view",
                }]
            },
            {
                id: 'permissions',
                icon: "simple-icon-key",
                label: "menu.permissions",
                subPermissions: [
                    'permission',
                    'permission.store',
                    'permission.edit',
                    'permission.update',
                    'permission.delete',
                ],
                to: "/app/permissions",
                subs: [{
                    icon: 'simple-icon-note',
                    label: "menu.create",
                    permissions: 'permission.store',
                    to: "/app/permissions/create",
                },
                    {
                        icon: 'iconsminds-preview',
                        label: "menu.view",
                        permissions: 'permission',
                        to: "/app/permissions/view",
                    }]
            },
        ]
    },
//     {
//     id: 'Users',
//     icon: "simple-icon-user-follow",
//     label: "menu.users",
//     to: "/app/users",
//     subs: [{
//         icon: 'simple-icon-note',
//         label: "menu.create",
//         to: "/app/users/create",
//     }, {
//         icon: "iconsminds-preview",
//         label: "menu.view",
//         to: "/app/users/view"
//     }]
// }
//     ,{
//         id: "chat",
//         icon: "iconsminds-speach-bubbles",
//         label: "menu.chat",
//         to: "/app/chat",
//     },{
//         id: "registration",
//         icon: "simple-icon-login",
//         label: "menu.vip-registration",
//         to: "/app/vip-registrations",
//     },
//     {
//         id: "signals",
//         icon: "iconsminds-communication-tower-2",
//         label: "menu.signals",
//         to: "/app/vip-signals",
//         subs: [{
//             icon: 'simple-icon-note',
//             label: "menu.create",
//             to: "/app/vip-signals/create",
//         }, {
//             icon: 'iconsminds-preview',
//             label: "menu.view",
//             to: "/app/vip-signals/view",
//         }]
//     },
//     {
//         id: "result",
//         icon: "iconsminds-paper",
//         label: "menu.result",
//         to: "/app/results",
//         subs: [{
//             icon: 'simple-icon-note',
//             label: "menu.create",
//             to: "/app/results/create",
//         }, {
//             icon: 'iconsminds-preview',
//             label: "menu.view",
//             to: "/app/results/view",
//         }]
//     },

//     {
//         id: 'guide',
//         icon: "iconsminds-books",
//         label: "menu.guides",
//         to: "/app/guides",
//         subs: [{
//             icon: 'simple-icon-note',
//             label: "menu.create",
//             to: "/app/guides/create",
//         }, {
//             icon: 'iconsminds-preview',
//             label: "menu.view",
//             to: "/app/guides/view",
//         }]
//     },
//     {
//         id: 'faqs',
//         icon: "simple-icon-question",
//         label: "menu.faqs",
//         to: "/app/faqs",
//         subs: [{
//             icon: 'simple-icon-note',
//             label: "menu.create",
//             to: "/app/faqs/create",
//         }, {
//             icon: 'iconsminds-preview',
//             label: "menu.view",
//             to: "/app/faqs/view",
//         }]
//     },
//     {
//         id: 'partners',
//         icon: "iconsminds-business-mens",
//         label: "menu.partners",
//         to: "/app/partners",
//         subs: [{
//             icon: 'simple-icon-note',
//             label: "menu.create",
//             to: "/app/partners/create",
//         }, {
//             icon: 'iconsminds-preview',
//             label: "menu.view",
//             to: "/app/partners/view",
//         }]
//     },
//     {
//         id: "contact",
//         icon: "iconsminds-mail",
//         label: "menu.contact",
//         to: "/app/contact/view",
//     },{
//         id: "videos",
//         icon: "iconsminds-video",
//         label: "menu.videos",
//         to: "/app/video/upload",
//     },
//     {
//         id: 'settings',
//         icon: 'simple-icon-settings',
//         label: 'menu.settings',
//         to: "/app/settings",
//         subs: [{
//             icon: 'iconsminds-firewall',
//             label: "menu.privacy-policy",
//             to: "/app/settings/privacy-policy",
//         },{
//             icon: 'iconsminds-notepad',
//             label: "menu.terms",
//             to: "/app/settings/terms-and-conditions",
//         },{
//             icon: 'iconsminds-security-settings',
//             label: "menu.security",
//             to: "/app/settings/security",
//         }]
//     }

  // {
  //   id: "pages",
  //   icon: "iconsminds-digital-drawing",
  //   label: "menu.pages",
  //   to: "/app/pages",
  //   subs: [{
  //       id: "pages-authorization",
  //       label: "menu.authorization",
  //       to: "/user",
  //       subs: [{
  //           icon: "simple-icon-user-following",
  //           label: "menu.login",
  //           to: "/user/login",
  //           newWindow: true
  //         },
  //         {
  //           icon: "simple-icon-user-follow",
  //           label: "menu.register",
  //           to: "/user/register",
  //           newWindow: true
  //         },
  //         {
  //           icon: "simple-icon-user-following",
  //           label: "menu.forgot-password",
  //           to: "/user/forgot-password",
  //           newWindow: true
  //         },
  //         {
  //           icon: "simple-icon-user-unfollow",
  //           label: "menu.reset-password",
  //           to: "/user/reset-password",
  //           newWindow: true
  //         }
  //       ]
  //     },
  //     {
  //       id: "pages-product",
  //       label: "menu.product",
  //       to: "/app/pages/product",
  //       subs: [{
  //           icon: "simple-icon-credit-card",
  //           label: "menu.data-list",
  //           to: "/app/pages/product/data-list"
  //         },
  //         {
  //           icon: "simple-icon-list",
  //           label: "menu.thumb-list",
  //           to: "/app/pages/product/thumb-list"
  //         },
  //         {
  //           icon: "simple-icon-grid",
  //           label: "menu.image-list",
  //           to: "/app/pages/product/image-list"
  //         },
  //         {
  //           icon: "simple-icon-picture",
  //           label: "menu.details",
  //           to: "/app/pages/product/details"
  //         },
  //         {
  //           icon: "simple-icon-book-open",
  //           label: "menu.details-alt",
  //           to: "/app/pages/product/details-alt"
  //         },
  //       ]
  //     },
  //     {
  //       id: "pages-profile",
  //       label: "menu.profile",
  //       to: "/app/pages/profile",
  //       subs: [{
  //           icon: "simple-icon-share",
  //           label: "menu.social",
  //           to: "/app/pages/profile/social"
  //         },
  //         {
  //           icon: "simple-icon-link",
  //           label: "menu.portfolio",
  //           to: "/app/pages/profile/portfolio"
  //         },
  //
  //       ]
  //     },
  //     {
  //       id: "pages-blog",
  //       label: "menu.blog",
  //       to: "/app/pages/blog",
  //       subs: [{
  //           icon: "simple-icon-share",
  //           label: "menu.blog-list",
  //           to: "/app/pages/blog/blog-list"
  //         },
  //         {
  //           icon: "simple-icon-link",
  //           label: "menu.blog-detail",
  //           to: "/app/pages/blog/blog-detail"
  //         },
  //
  //       ]
  //     },
  //     {
  //       id: "pages-miscellaneous",
  //       label: "menu.miscellaneous",
  //       to: "/app/pages/miscellaneous",
  //       subs: [{
  //           icon: "simple-icon-question",
  //           label: "menu.faq",
  //           to: "/app/pages/miscellaneous/faq"
  //         },
  //         {
  //           icon: "simple-icon-graduation",
  //           label: "menu.knowledge-base",
  //           to: "/app/pages/miscellaneous/knowledge-base"
  //         },
  //
  //         {
  //           icon: "simple-icon-diamond",
  //           label: "menu.prices",
  //           to: "/app/pages/miscellaneous/prices"
  //         },
  //         {
  //           icon: "simple-icon-magnifier",
  //           label: "menu.search",
  //           to: "/app/pages/miscellaneous/search"
  //         },
  //         {
  //           icon: "simple-icon-envelope-open",
  //           label: "menu.mailing",
  //           to: "/app/pages/miscellaneous/mailing"
  //         },
  //         {
  //           icon: "simple-icon-bag",
  //           label: "menu.invoice",
  //           to: "/app/pages/miscellaneous/invoice"
  //         },
  //
  //         {
  //           icon: "simple-icon-exclamation",
  //           label: "menu.error",
  //           to: "/error",
  //           newWindow: true
  //         }
  //       ]
  //     },
  //   ]
  // },
  // {
  //   id: "applications",
  //   icon: "iconsminds-air-balloon-1",
  //   label: "menu.applications",
  //   to: "/app/applications",
  //   subs: [{
  //       icon: "simple-icon-check",
  //       label: "menu.todo",
  //       to: "/app/applications/todo"
  //     },
  //     {
  //       icon: "simple-icon-calculator",
  //       label: "menu.survey",
  //       to: "/app/applications/survey"
  //     },
  //     {
  //       icon: "simple-icon-bubbles",
  //       label: "menu.chat",
  //       to: "/app/applications/chat"
  //     }
  //   ]
  // },
  // {
  //   id: "ui",
  //   icon: "iconsminds-pantone",
  //   label: "menu.ui",
  //   to: "/app/ui",
  //   subs: [
  //
  //     {
  //       id: "ui-forms",
  //       label: "menu.forms",
  //       to: "/app/ui/forms",
  //       subs: [{
  //           icon: "simple-icon-notebook",
  //           label: "menu.layouts",
  //           to: "/app/ui/forms/layouts"
  //         },
  //         {
  //           icon: "simple-icon-puzzle",
  //           label: "menu.components",
  //           to: "/app/ui/forms/components"
  //         },
  //         {
  //           icon: "simple-icon-check",
  //           label: "menu.validations",
  //           to: "/app/ui/forms/validations"
  //         },
  //         {
  //           icon: "simple-icon-magic-wand",
  //           label: "menu.wizard",
  //           to: "/app/ui/forms/wizard"
  //         }
  //       ]
  //     },
  //     {
  //       id: "ui-components",
  //       label: "menu.components",
  //       to: "/app/ui/components",
  //       subs: [{
  //           icon: "simple-icon-bell",
  //           label: "menu.alerts",
  //           to: "/app/ui/components/alerts"
  //         },
  //         {
  //           icon: "simple-icon-badge",
  //           label: "menu.badges",
  //           to: "/app/ui/components/badges"
  //         },
  //         {
  //           icon: "simple-icon-control-play",
  //           label: "menu.buttons",
  //           to: "/app/ui/components/buttons"
  //         },
  //         {
  //           icon: "simple-icon-layers",
  //           label: "menu.cards",
  //           to: "/app/ui/components/cards"
  //         },
  //         {
  //           icon: "simple-icon-picture",
  //           label: "menu.carousel",
  //           to: "/app/ui/components/carousel"
  //         },
  //         {
  //           icon: "simple-icon-chart",
  //           label: "menu.charts",
  //           to: "/app/ui/components/charts"
  //         },
  //         {
  //           icon: "simple-icon-arrow-up",
  //           label: "menu.collapse",
  //           to: "/app/ui/components/collapse"
  //         },
  //         {
  //           icon: "simple-icon-arrow-down",
  //           label: "menu.dropdowns",
  //           to: "/app/ui/components/dropdowns"
  //         },
  //         {
  //           icon: "simple-icon-book-open",
  //           label: "menu.editors",
  //           to: "/app/ui/components/editors"
  //         },
  //
  //         {
  //           icon: "simple-icon-star",
  //           label: "menu.icons",
  //           to: "/app/ui/components/icons"
  //         },
  //         {
  //           icon: "simple-icon-note",
  //           label: "menu.input-groups",
  //           to: "/app/ui/components/input-groups"
  //         },
  //         {
  //           icon: "simple-icon-screen-desktop",
  //           label: "menu.jumbotron",
  //           to: "/app/ui/components/jumbotron"
  //         },
  //         {
  //           icon: "simple-icon-map",
  //           label: "menu.maps",
  //           to: "/app/ui/components/maps"
  //         },
  //         {
  //           icon: "simple-icon-docs",
  //           label: "menu.modal",
  //           to: "/app/ui/components/modal"
  //         },
  //         {
  //           icon: "simple-icon-cursor",
  //           label: "menu.navigation",
  //           to: "/app/ui/components/navigation"
  //         },
  //         {
  //           icon: "simple-icon-pin",
  //           label: "menu.popover-tooltip",
  //           to: "/app/ui/components/popover-tooltip"
  //         },
  //         {
  //           icon: "simple-icon-shuffle",
  //           label: "menu.sortable",
  //           to: "/app/ui/components/sortable"
  //         },
  //         {
  //           icon: "simple-icon-grid",
  //           label: "menu.tables",
  //           to: "/app/ui/components/tables"
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: "menu",
  //   icon: "iconsminds-three-arrow-fork",
  //   label: "menu.menu",
  //   to: "/app/menu",
  //   subs: [{
  //       icon: "simple-icon-logout",
  //       label: "menu.types",
  //       to: "/app/menu/types"
  //     },
  //     {
  //       icon: "simple-icon-layers",
  //       label: "menu.levels",
  //       to: "/app/menu/levels",
  //       subs: [{
  //           icon: "simple-icon-arrow-right",
  //           label: "menu.third-level-1",
  //           to: "/app/menu/levels/third-level-1"
  //         },
  //         {
  //           icon: "simple-icon-arrow-right",
  //           label: "menu.third-level-2",
  //           to: "/app/menu/levels/third-level-2"
  //         },
  //         {
  //           icon: "simple-icon-arrow-right",
  //           label: "menu.third-level-3",
  //           to: "/app/menu/levels/third-level-3"
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: "blankpage",
  //   icon: "iconsminds-bucket",
  //   label: "menu.blank-page",
  //   to: "/app/blank-page"
  // },
  // {
  //   id: "docs",
  //   icon: "iconsminds-library",
  //   label: "menu.docs",
  //   to: "https://gogo-react-docs.coloredstrategies.com/",
  //   newWindow: true
  // }
];
export default data;