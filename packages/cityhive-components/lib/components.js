import Telescope from 'meteor/nova:lib';

// Permissions
Telescope.registerComponent("CanDo", require('./permissions/CanDo.jsx'));

// Common
Telescope.registerComponent("App", require('./common/App.jsx'));
Telescope.registerComponent("Index", require('./common/Index.jsx'));
Telescope.registerComponent("AppLoading", require('./common/AppLoading.jsx'));
Telescope.registerComponent("Logo", require('./common/Logo.jsx'));
Telescope.registerComponent("Layout", require('./common/Layout.jsx'));
Telescope.registerComponent("HeadTags", require('./common/HeadTags.jsx'));
Telescope.registerComponent("Header", require('./common/Header.jsx'));
Telescope.registerComponent("Footer", require('./common/Footer.jsx'));
Telescope.registerComponent("Flash", require('./common/Flash.jsx'));
Telescope.registerComponent("FlashMessages", require('./common/FlashMessages.jsx'));
Telescope.registerComponent("SignUpBar", require('./common/SignUpBar.jsx'));
Telescope.registerComponent("Loading", require('./common/Loading.jsx'));
Telescope.registerComponent("Icon", require('./common/Icon.jsx'));

// Navigation
Telescope.registerComponent("MainMenu", require('./navigation/MainMenu.jsx'));

// Authentication
Telescope.registerComponent("SignIn", require('./authentication/SignIn.jsx'));
Telescope.registerComponent("Register", require('./authentication/Register.jsx'));
Telescope.registerComponent("CityHiveForgottenPassword", require('./authentication/CityHiveForgottenPassword.jsx'));
Telescope.registerComponent("CityHiveResetPassword", require('./authentication/CityHiveResetPassword.jsx'));
Telescope.registerComponent("CityHiveVerifyEmail", require('./authentication/CityHiveVerifyEmail.jsx'));

// Users
Telescope.registerComponent("UsersProfile", require('./users/UsersProfile.jsx'));
Telescope.registerComponent("UsersEdit", require('./users/UsersEdit.jsx'));
Telescope.registerComponent("UsersAccountForm", require('./users/UsersAccountForm.jsx'));

// User Accounts
Telescope.registerComponent("Profile", require('./profile/Profile.jsx'));
Telescope.registerComponent("ProfileInfo", require('./profile/ProfileInfo.jsx'));
Telescope.registerComponent("ProfileDashboard", require('./profile/ProfileDashboard.jsx'));
Telescope.registerComponent("ProfileSidebar", require('./profile/ProfileSidebar.jsx'));
// Telescope.registerComponent("ViewProfile", require('./accounts/ViewProfile.jsx'));
Telescope.registerComponent("EditProfile", require('./accounts/EditProfile.jsx'));
Telescope.registerComponent("EditUserProfile", require('./accounts/EditUserProfile.jsx'));
Telescope.registerComponent("ProfileChangePassword", require('./profile/ProfileChangePassword.jsx'));
Telescope.registerComponent("ProfilePrivacySettings", require('./profile/ProfilePrivacySettings.jsx'));
Telescope.registerComponent("ProfileDelete", require('./profile/ProfileDelete.jsx'));
Telescope.registerComponent("ProfileDeleteConfirmation", require('./profile/ProfileDeleteConfirmation.jsx'));

Telescope.registerComponent("UsersProfileListItem", require('./users/UsersProfileListItem.jsx'));
Telescope.registerComponent("UsersSentRequests", require('./users/UsersSentRequests.jsx'));
Telescope.registerComponent("UsersReceivedRequests", require('./users/UsersReceivedRequests.jsx'));
Telescope.registerComponent("UsersFriends", require('./users/UsersFriends.jsx'));
// Telescope.registerComponent("UsersFollowers", require('./users/UsersFollowers.jsx'));

Telescope.registerComponent("ProfileFollowing", require('./profile/ProfileFollowing.jsx'));
Telescope.registerComponent("ProfileMessages", require('./profile/messages/ProfileMessages.jsx'));
Telescope.registerComponent("ProfileMessagesInbox", require('./profile/messages/ProfileMessagesInbox.jsx'));
Telescope.registerComponent("ProfileMessagesConversation", require('./profile/messages/ProfileMessagesConversation.jsx'));
Telescope.registerComponent("ProfileMessagesContainer", require('./profile/ProfileMessagesContainer.jsx'));
Telescope.registerComponent("ProfileTimeline", require('./profile/ProfileTimeline.jsx'));

Telescope.registerComponent("UsersDirectory", require('./users/UsersDirectory.jsx'));
Telescope.registerComponent("UsersDirectoryList", require('./users/UsersDirectoryList.jsx'));
Telescope.registerComponent("UsersDirectoryListItem", require('./users/UsersDirectoryListItem.jsx'));

Telescope.registerComponent("UsersLoadMore", require('./users/UsersLoadMore.jsx'));

Telescope.registerComponent("UserProfile", require('./users/UserProfile.jsx'));
Telescope.registerComponent("UserProfileContainer", require('./users/UserProfileContainer.jsx'));


// Messages
Telescope.registerComponent("FromConversationCreate", require('./messages/FromConversationCreate.jsx'));

// Chat
Telescope.registerComponent("ChatUsersList", require('./chat/ChatUsersList.jsx'));

// Pages
Telescope.registerComponent("PageIndex", require('./pages/PageIndex.jsx'));
Telescope.registerComponent("PageHomepage", require('./pages/PageHomepage.jsx'));
Telescope.registerComponent("PageAboutUs", require('./pages/PageAboutUs.jsx'));
Telescope.registerComponent("PageOurSupporters", require('./pages/PageOurSupporters.jsx'));
Telescope.registerComponent("PageContactUs", require('./pages/PageContactUs.jsx'));
Telescope.registerComponent("PageTermsAndPrivacy", require('./pages/PageTermsAndPrivacy.jsx'));
Telescope.registerComponent("Page", require('./pages/Page.jsx'));
Telescope.registerComponent("PageItem", require('./pages/PageItem.jsx'));
Telescope.registerComponent("PageTemplateHome", require('./pages/PageTemplateHome.jsx'));
Telescope.registerComponent("PageTemplateAbout", require('./pages/PageTemplateAbout.jsx'));
Telescope.registerComponent("PageTemplateMembership", require('./pages/PageTemplateMembership.jsx'));
Telescope.registerComponent("PageTemplateAllies", require('./pages/PageTemplateAllies.jsx'));
Telescope.registerComponent("PageTemplatePress", require('./pages/PageTemplatePress.jsx'));
Telescope.registerComponent("PageTemplateTerms", require('./pages/PageTemplateTerms.jsx'));
Telescope.registerComponent("PageTemplatePrivacy", require('./pages/PageTemplatePrivacy.jsx'));
Telescope.registerComponent("PageTemplateCookies", require('./pages/PageTemplateCookies.jsx'));
Telescope.registerComponent("PageTemplateCredits", require('./pages/PageTemplateCredits.jsx'));
Telescope.registerComponent("PageTemplateMission", require('./pages/PageTemplateMission.jsx'));
Telescope.registerComponent("PageTemplateWIFC", require('./pages/PageTemplateWIFC.jsx'));
Telescope.registerComponent("PageTemplateWIFCPledge", require('./pages/PageTemplateWIFCPledge.jsx'));
Telescope.registerComponent("PageTemplateAwards", require('./pages/PageTemplateAwards.jsx'));
Telescope.registerComponent("PageTemplateCharity", require('./pages/PageTemplateCharity.jsx'));
Telescope.registerComponent("PageTemplateJournal", require('./pages/PageTemplateJournal.jsx'));
Telescope.registerComponent("PageTemplateJournalNews", require('./pages/PageTemplateJournalNews.jsx'));
Telescope.registerComponent("PageTemplateJournalCatSpecialEdition", require('./pages/PageTemplateJournalCatSpecialEdition.jsx'));
Telescope.registerComponent("PageTemplateJournalCatNews", require('./pages/PageTemplateJournalCatNews.jsx'));
Telescope.registerComponent("PageTemplateJournalSearch", require('./pages/PageTemplateJournalSearch.jsx'));

// Articles
Telescope.registerComponent("ArticlesHome", require('./articles/ArticlesHome.jsx'));
Telescope.registerComponent("ArticlesList", require('./articles/ArticlesList.jsx'));
Telescope.registerComponent("ArticlesListItem", require('./articles/ArticlesListItem.jsx'));
Telescope.registerComponent("ArticlesItem", require('./articles/ArticlesItem.jsx'));
Telescope.registerComponent("ArticlesSingle", require('./articles/ArticlesSingle.jsx'));
Telescope.registerComponent("ArticlesPage", require('./articles/ArticlesPage.jsx'));
Telescope.registerComponent("ArticlesLoading", require('./articles/ArticlesLoading.jsx'));
Telescope.registerComponent("ArticlesNoResults", require('./articles/ArticlesNoResults.jsx'));


// Journal
Telescope.registerComponent("JournalHome", require('./journals/JournalsHome.jsx'));
Telescope.registerComponent("JournalList", require('./journals/JournalsList.jsx'));
Telescope.registerComponent("JournalListItem", require('./journals/JournalsListItem.jsx'));
Telescope.registerComponent("JournalItem", require('./journals/JournalsItem.jsx'));
Telescope.registerComponent("JournalSingle", require('./journals/JournalsSingle.jsx'));
Telescope.registerComponent("JournalPage", require('./journals/JournalsPage.jsx'));
Telescope.registerComponent("JournalLoading", require('./journals/JournalsLoading.jsx'));
Telescope.registerComponent("JournalNoResults", require('./journals/JournalsNoResults.jsx'));


// Admin
Telescope.registerComponent("Admin", require('./admin/Admin.jsx'));
Telescope.registerComponent("AdminDashboard", require('./admin/AdminDashboard.jsx'));
Telescope.registerComponent("AdminMenu", require('./admin/navigation/AdminMenu.jsx'));

Telescope.registerComponent("AdminUsersEdit", require('./admin/users/AdminUsersEdit.jsx'));
Telescope.registerComponent("AdminUsersEditSingle", require('./admin/users/AdminUsersEditSingle.jsx'));

Telescope.registerComponent("AdminPages", require('./admin/pages/AdminPages.jsx'));
Telescope.registerComponent("AdminPagesCreate", require('./admin/pages/AdminPagesCreate.jsx'));
Telescope.registerComponent("AdminPagesEditSingle", require('./admin/pages/AdminPagesEditSingle.jsx'));

Telescope.registerComponent("AdminArticles", require('./admin/articles/AdminArticles.jsx'));
Telescope.registerComponent("AdminArticlesCreate", require('./admin/articles/AdminArticlesCreate.jsx'));

Telescope.registerComponent("AdminJournals", require('./admin/journals/AdminJournals.jsx'));
Telescope.registerComponent("AdminJournalsCreate", require('./admin/journals/AdminJournalsCreate.jsx'));

Telescope.registerComponent("AdminOptions", require('./admin/options/AdminOptions.jsx'));
Telescope.registerComponent("AdminOptionsCreate", require('./admin/options/AdminOptionsCreate.jsx'));


// Timeline

Telescope.registerComponent("PostsList", require('./posts/PostsList.jsx'));
Telescope.registerComponent("PostsListItem", require('./posts/PostsListItem.jsx'));
Telescope.registerComponent("PostsLoadMore", require('./posts/PostsLoadMore.jsx'));

