import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {IntlProvider, intlShape} from 'react-intl';
import AppComposer from "./AppComposer";

class App extends Component {

    getLocale() {
        return Telescope.settings.get("locale", "en");
    }

    getChildContext() {

        const messages = Telescope.strings[this.getLocale()] || {};
        const intlProvider = new IntlProvider({locale: this.getLocale()}, messages);

        const {intl} = intlProvider.getChildContext();

        return {
            currentUser: this.props.currentUser,
            actions: this.props.actions,
            events: this.props.events,
            messages: this.props.messages,
            intl: intl,
            options: this.props.options,
            currentPage: this.props.currentPage,
            isProfileSection: this.props.isProfileSection
        };
    }

    render() {
        return (
            <IntlProvider locale={this.getLocale()} messages={Telescope.strings[this.getLocale()]}>
                {
                    this.props.ready ?
                        <Telescope.components.Layout
                            isProfileSection={this.props.isProfileSection}
                            currentPage={this.props.currentPage}
                            currentUser={this.props.currentUser}>{this.props.children}</Telescope.components.Layout>
                        : <Telescope.components.AppLoading />
                }
            </IntlProvider>
        )
    }

}

App.propTypes = {
    ready: React.PropTypes.bool,
    currentUser: React.PropTypes.object,
    actions: React.PropTypes.object,
    events: React.PropTypes.object,
    messages: React.PropTypes.object,
    options: React.PropTypes.object,
    currentPage: React.PropTypes.string,
    isProfileSection: React.PropTypes.bool
};

App.childContextTypes = {
    currentUser: React.PropTypes.object,
    actions: React.PropTypes.object,
    events: React.PropTypes.object,
    messages: React.PropTypes.object,
    intl: intlShape,
    options: React.PropTypes.object,
    currentPage: React.PropTypes.string,
    isProfileSection: React.PropTypes.bool
};

module.exports = AppComposer(App);
export default AppComposer(App);