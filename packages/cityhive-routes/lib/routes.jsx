import Telescope from 'meteor/nova:lib';
import React from 'react';
import {Messages} from 'meteor/nova:core';
import {ReactRouterSSR} from 'meteor/reactrouter:react-router-ssr';
import Events from 'meteor/nova:events';
import Helmet from 'react-helmet';
import Cookie from 'react-cookie';
import ReactDOM from 'react-dom';

Telescope.routes.indexRoute = {
    name: 'index',
    component: Telescope.components.Index
};

Meteor.startup(() => {

    let adminChildRoutes = [
        {
            name: 'admin.dashboard',
            path: 'dashboard',
            component: Telescope.components.AdminDashboard
        },
        {
            name: 'admin.users.edit',
            path: 'users/edit',
            component: Telescope.components.AdminUsersEdit
        },
        {
            name: 'admin.users.edit',
            path: 'users/edit/:_id',
            component: Telescope.components.AdminUsersEditSingle
        },
        {
            name: 'admin.pages',
            path: 'pages',
            component: Telescope.components.AdminPages
        },
        {
            name: 'admin.pages.create',
            path: 'pages/create',
            component: Telescope.components.AdminPagesCreate
        },
        {
            name: 'admin.pages.edit',
            path: 'pages/edit/:_id',
            component: Telescope.components.AdminPagesEditSingle
        },
        {
            name: 'admin.articles',
            path: 'articles',
            component: Telescope.components.AdminArticles
        },
        {
            name: 'admin.articles.create',
            path: 'articles/create',
            component: Telescope.components.AdminArticlesCreate
        },
        {
            name: 'admin.journals',
            path: 'journals',
            component: Telescope.components.AdminJournals
        },
        {
            name: 'admin.journals.create',
            path: 'journals/create',
            component: Telescope.components.AdminJournalsCreate
        },
        {
            name: 'admin.options',
            path: 'options',
            component: Telescope.components.AdminOptions
        },
        {
            name: 'admin.options.create',
            path: 'options/create',
            component: Telescope.components.AdminOptionsCreate
        }
    ];

    let adminIndexRoute = {onEnter: (nextState, replace) => replace('admin/dashboard')};

    Telescope.routes.add([
        {
            name: 'admin',
            path: 'admin',
            components: Telescope.components.Admin,
            childRoutes: adminChildRoutes,
            indexRoute: adminIndexRoute
        },
        {name: 'profile.edit', path: 'user/profile/edit/:_id', component: Telescope.components.EditProfile},
        // {name: 'profile.edit2', path: 'user/profile/edit2/:_id', component: Telescope.components.EditUserProfile},

        {name: 'user.dashboard', path: 'user/dashboard', component: Telescope.components.ProfileDashboard},
        {name: 'user.dashboard', path: 'user/following', component: Telescope.components.ProfileFollowing},
        {name: 'user.messages', path: 'user/messages', component: Telescope.components.ProfileMessages},
        {name: 'user.messages.conversation', path: 'user/messages/:_id', component: Telescope.components.ProfileMessagesConversation},

        {name: 'users.directory', path: 'users/directory', component: Telescope.components.UsersDirectory},
        {name: 'user.profile', path: 'user/profile/:_id', component: Telescope.components.UserProfile},
        {name: 'user.change.password', path: 'user/change-password', component: Telescope.components.ProfileChangePassword},
        {name: 'user.privacy.settings', path: 'user/privacy-settings', component: Telescope.components.ProfilePrivacySettings},
        {name: 'user.delete', path: 'user/delete', component: Telescope.components.ProfileDelete},
        {name: 'user.delete.confirmation', path: 'user/delete-confirmation/:token', component: Telescope.components.ProfileDeleteConfirmation},

        {name: 'sign-in', path: 'sign-in', component: Telescope.components.SignIn},
        {name: 'sign-up', path: 'sign-up', component: Telescope.components.Register},
        {name: 'forgotten.password', path: 'forgotten-password', component: Telescope.components.CityHiveForgottenPassword},
        {name: 'reset.password', path: 'reset-password/:token', component: Telescope.components.CityHiveResetPassword},
        {name: 'verify.email', path: 'verify-email/:token', component: Telescope.components.CityHiveVerifyEmail},
        {name: 'news', path: 'news', component: Telescope.components.ArticlesHome},
        {name: 'news.single', path: 'news/:_id', component: Telescope.components.ArticlesSingle},
        {name: 'journals', path: 'journals', component: Telescope.components.JournalsHome},
        {name: 'journals.single', path: 'journals/:_id', component: Telescope.components.JournalsSingle},
        {name: 'pages', path: '*', component: Telescope.components.PageIndex},
        {name: 'journal-news', path: 'journal-news/:category/:id', component: Telescope.components.PageTemplateJournalNews}

    ]);

    const AppRoutes = {
        path: '/',
        component: Telescope.components.App,
        indexRoute: Telescope.routes.indexRoute,
        childRoutes: Telescope.routes.routes
    };

    const clientOptions = {
        renderHook: ReactDOM.render,
        props: {
            onUpdate: () => {
                Events.analyticsRequest();
                Messages.clearSeen();

                    window.scrollTo(0, 0);

            }
        }
    };

    const serverOptions = {
        htmlHook: (html) => {
            const head = Helmet.rewind();
            return html.replace('<head>', '<head>' + head.title + head.meta + head.link);
        },
        preRender: (req, res) => {
            Cookie.plugToRequest(req, res);
        },
    };

    ReactRouterSSR.Run(AppRoutes, clientOptions, serverOptions);

});


/*
 import Telescope from 'meteor/nova:lib';
 import React from 'react';

 // Authentication
 Telescope.routes.add({name: 'login', path: 'login', component: Telescope.components.Login});
 Telescope.routes.add({name: 'register', path: 'register', component: Telescope.components.Register});

 // Accounts
 Telescope.routes.add({name: 'account.profile', path: 'account/:slug', component: Telescope.components.ViewProfile});
 Telescope.routes.add({name: 'account.profile.edit', path: 'account/:slug/edit', component: Telescope.components.EditProfile});

 // Pages
 Telescope.routes.add({name:'about-us', path:'about-us', component: Telescope.components.PageAboutUs});
 Telescope.routes.add({name:'our-supporters', path:'our-supporters', component: Telescope.components.PageOurSupporters});
 Telescope.routes.add({name:'contact-us', path:'contact-us', component: Telescope.components.PageContactUs});
 Telescope.routes.add({name:'terms-and-privacy', path:'terms-and-privacy', component: Telescope.components.PageTermsAndPrivacy});

 // Articles
 Telescope.routes.add({name:'news', path:'news', component: Telescope.components.ArticlesHome});
 Telescope.routes.add({name:'news.single', path:'/news/:_id(/:slug)', component: Telescope.components.ArticlesSingle});

// Journals
 Telescope.routes.add({name:'journals', path:'journals', component: Telescope.components.JournalsHome});
 Telescope.routes.add({name:'journals.single', path:'/journals/:_id(/:slug)', component: Telescope.components.JournalsSingle});
 */




/*
 Telescope.routes.add(
 {
 name: 'test',
 path: 'test',
 component: Telescope.components.Test,
 childRoutes: [
 {
 name: 'test.new',
 path: 'new',
 component: Telescope.components.New
 }
 ]
 }
 );
 */