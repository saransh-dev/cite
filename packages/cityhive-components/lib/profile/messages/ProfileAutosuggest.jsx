import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import ProfileMessagesComposer from './ProfileMessagesComposer';
import {browserHistory} from 'react-router';

class ProfileAutosuggest extends Component {

    findConversationUser() {
        let fullName = '';
        let conversation = Meteor.conversations.findOne({_id: this.props.conversationId});
        if(conversation) {
            conversation.participants().forEach(function(participant){
                if(participant.user() && (participant.user()._id != Meteor.userId())) {
                    fullName = participant.user().profile.firstName + ' ' + participant.user().profile.lastName
                    return false;
                }
            });
        }
        return fullName;
    }

    constructor(props) {
        super(props);
        this.state = {
            value: this.findConversationUser(),
            suggestions: []
        };
        this.onChange = this.onChange.bind(this)
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    }

    onChange(event, {newValue}) {
        this.setState({
            value: newValue
        });
    }

    onSuggestionsFetchRequested({value}) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    }

    getUsers() {

        const users = this.props.users;
        let newUsers = [];
        if(users) {
            users.forEach((user) => {
                newUsers.push({
                    id: user._id,
                    name: user.profile.firstName + ' ' + user.profile.lastName,
                    image: user.profile.image ? user.profile.image : Telescope.settings.get('defaultProfileImage')
                })
            });

            return newUsers;

        }
    }

    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.getUsers().filter(lang =>
            lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    }

    getSuggestionValue(suggestion) {
        return suggestion.name;
    }

    renderSuggestion(suggestion) {
        return (
            <div>
                <img className="img-circle" src={suggestion.image} />
                {suggestion.name}
            </div>
        );
    }

    onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
        let userId = suggestion.id;

        let participants = [userId];

        Meteor.user().findExistingConversationWithUsers(participants, (error, result) => {
            if(result){
                browserHistory.push('/user/messages/' + result);
                // this.setState({conversationId: result});
            } else {
                let conversation = new Conversation().save();
                conversation.addParticipant( Meteor.users.findOne(participants[0]) );
                browserHistory.push('/user/messages/' + conversation._id);
                // this.setState({conversationId: conversation._id});
            }
        })

    }

    render() {
        const {value, suggestions} = this.state;

        const inputProps = {
            placeholder: 'Type a name to start...',
            value,
            onChange: this.onChange
        };

        // Finally, render it!
        return (
            <div>
                {
                    this.props.ready ?
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={this.getSuggestionValue}
                                renderSuggestion={this.renderSuggestion}
                                inputProps={inputProps}
                                onSuggestionSelected={this.onSuggestionSelected}
                            />
                    : '<p>Loading</p>'
                }
            </div>
        );
    }
}

ProfileAutosuggest.displayName = "ProfileAutosuggest";

module.exports = ProfileMessagesComposer(ProfileAutosuggest);
export default ProfileMessagesComposer(ProfileAutosuggest);