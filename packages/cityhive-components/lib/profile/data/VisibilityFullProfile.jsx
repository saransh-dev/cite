import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import ProfileFollowingComposer from '../ProfileFollowingComposer';
import {Messages} from 'meteor/nova:core';
import Blocks from 'meteor/cityhive:user-blocking';
import Users from 'meteor/nova:users';

class VisibilityFullProfile extends Component {

    joinedDate(user) {
        return moment(user.createdAt).format("Do MMM YYYY");
    }

    displayButtons(user) {
        return (
            <div className="social-buttons">
                {this.displayBlockButton()}
                {this.displaySendMessageButton(user)}
                {this.displayFollowButtons()}
            </div>
        )
    }

    displayBlockButton() {
        const user = this.props.user;
        if(user.username != Telescope.settings.get('bev').username) {// do not allow un-follow of the user 'bev'
            return this.blockButtonElement(user);
        }
    }

    blockButtonElement(user) {

        if( Blocks.findOne({userId: Meteor.userId(), blockedUserId: user._id}) ) {
            return (
                <a className="btn btn-xs btn-white block" onClick={() => {this.unblockUser(user)}}>
                    <i className="iconmoon-cityhive-iconmoon-font-v2-ol_block"/> Unblock
                </a>
            )
        } else {
            return (
                <a className="btn btn-xs btn-white block" onClick={() => {this.blockUser(user)}}>
                    <i className="iconmoon-cityhive-iconmoon-font-v2-ol_block"/> Block
                </a>
            )
        }
    }

    blockUser(user) {
        let blockUserId = user._id;

        Meteor.call('cityhive.user.block', blockUserId, function (error, result) {
            if(!error) {
                setTimeout(function () {
                        Messages.flash('You have blocked user:' + user.profile.firstName + ' ' + user.profile.lastName, 'success');
                        browserHistory.push('/user/dashboard');
                    }
                ,100)
            }
        });

    }

    unblockUser(user) {
        let unblockUserId = user._id;

        Meteor.call('cityhive.user.unblock', unblockUserId);

    }

    displayFollowButtons() {
        const user = this.props.user;

        if (user.isFollowed()) {
            return <span className="btn btn-orange" onClick={() => {
                this.userUnfollow(user)
            }}>Unfollow</span>;
        } else {
            return <span className="btn btn-orange" onClick={() => {
                this.userFollow(user)
            }}>Follow</span>;
        }
    }

    displaySendMessageButton(user) {

        if(Meteor.follows.findOne({userId: user._id, followId: Meteor.userId()}) && Meteor.follows.findOne({userId: Meteor.userId(), followId: user._id})) {
            return (
                <span className="btn btn-white" onClick={() => {
                    this.sendMessage(user)
                }}><i className="iconmoon-cityhive-iconmoon-font-v2-ol_messages"></i> Send Message</span>
            )
        }
    }

    userFollow(user) {
        user.follow();
        Meteor.call('cityhive.email.newFollower', user._id);
        Meteor.call('feed.follow', user, Meteor.userId());
    }

    userUnfollow(user) {
        user.unfollow();
    }

    sendMessage(user) {
        let participants = [user._id];
        Meteor.user().findExistingConversationWithUsers(participants, function (error, result) {
            if (result) {
                console.log('conversation found');
                browserHistory.push('/user/messages/' + result);
            } else {
                console.log('no conversations found. starting new.');
                var conversation = new Conversation().save();
                conversation.addParticipant(Meteor.users.findOne({_id: user._id}));
                browserHistory.push('/user/messages/' + conversation._id);
            }
        })
    }

    getMembershipStatus(user) {
        let membership = user.cityhive.membership;
        if(!membership || membership == 'free') return 'Basic';
        if(membership == 'corporate') return 'Corporate';
        if(membership == 'recruiter') return 'Recruiter';
    }

    getDepartmentValue(user) {
        let options = [
            {label: 'Finance',value: 'finance'},
            {label: 'Human Resources',value: 'human-resources'},
            {label: 'Management',value: 'management'},
            {label: 'Legal',value: 'legal'},
            {label: 'Marketing & Product Strategy',value: 'marketing-product-strategy'},
            {label: 'Operations & IT',value: 'operations-it'},
            {label: 'Risk & Compliance',value: 'risk-compliance'},
            {label: 'Sales & Distribution',value: 'sales-distribution'},
            {label: 'Other',value: 'other'}
        ];

        if(user.profile.department) {
            var result = options.filter(function( obj ) {
                return obj.value == user.profile.department;
            });
            if(result.length) {
                return result[0].label;
            } else {
                return '-';
            }
        }
    }

    getProfessionValue(user) {
        let options = [
            {
                label: 'Asset Management',
                value: 'asset-management'
            },
            {
                label: 'Investment Management',
                value: 'investment-management'
            },
            {
                label: 'Private Banking',
                value: 'private-banking'
            },
            {
                label: 'Wealth Management',
                value: 'wealth-management'
            },
            {
                label: 'Other',
                value: 'other'
            },
        ];

        if(user.profile.profession) {
            var result = options.filter(function( obj ) {
                return obj.value == user.profile.profession;
            });
            if(result.length) {
                return result[0].label;
            } else {
                return '-';
            }
        }
    }

    getQualificationValue(user) {

        if(user.profile.professionalQualifications && user.profile.professionalQualifications.length) {

            let qualifications = user.profile.professionalQualifications;
            let values = '';

            qualifications.forEach(q => {
                values += q.toUpperCase() + ' ';
            });

            return values;

        } else {
            return '-';
        }
    }

    getMaritalStatusValue(user) {
        let options = [
            {
                label: 'Single',
                value: 'single'
            },
            {
                label: 'Married',
                value: 'married'
            }
        ];

        if(user.profile.maritalStatus) {
            var result = options.filter(function( obj ) {
                return obj.value == user.profile.maritalStatus;
            });
            if(result.length) {
                return result[0].label;
            } else {
                return '-';
            }
        }
    }

    getChildrenValue(user) {
        let options = [
            {
                label: 'No',
                value: 'no'
            },
            {
                label: 'Yes',
                value: 'yes'
            }
        ];

        if(user.profile.children) {
            var result = options.filter(function( obj ) {
                return obj.value == user.profile.children;
            });
            if(result.length) {
                return result[0].label;
            } else {
                return '-';
            }
        }
    }

    getPetsValue(user) {
        let options = [
            {
                label: 'Dogs',
                value: 'dogs'
            },
            {
                label: 'Cats',
                value: 'cats'
            },
            {
                label: 'Small furry',
                value: 'small-furry'
            },
            {
                label: 'Horse',
                value: 'horse'
            },
            {
                label: 'Feathered',
                value: 'feathered'
            },
            {
                label: 'Aquatic',
                value: 'aquatic'
            },
            {
                label: 'Reptile',
                value: 'reptila'
            },
            {
                label: 'Other',
                value: 'other'
            },
        ];

        if(user.profile.pets) {
            var result = options.filter(function( obj ) {
                return obj.value == user.profile.pets;
            });
            if(result.length) {
                return result[0].label;
            } else {
                return '-';
            }
        }
    }

    getPetsValue(user) {
        let options = [
            {
                label: 'Dogs',
                value: 'dogs'
            },
            {
                label: 'Cats',
                value: 'cats'
            },
            {
                label: 'Small furry',
                value: 'small-furry'
            },
            {
                label: 'Horse',
                value: 'horse'
            },
            {
                label: 'Feathered',
                value: 'feathered'
            },
            {
                label: 'Aquatic',
                value: 'aquatic'
            },
            {
                label: 'Reptile',
                value: 'reptila'
            },
            {
                label: 'Other',
                value: 'other'
            },
        ];

        if(user.profile.pets) {
            var result = options.filter(function( obj ) {
                return obj.value == user.profile.pets;
            });
            if(result.length) {
                return result[0].label;
            } else {
                return '-';
            }
        }
    }

    getCountryOptions() {
        const array = [
            'AFGHANISTAN',
            'ÅLAND ISLANDS',
            'ALBANIA',
            'ALGERIA',
            'AMERICAN SAMOA',
            'ANDORRA',
            'ANGOLA',
            'ANGUILLA',
            'ANTARCTICA',
            'ANTIGUA AND BARBUDA',
            'ARGENTINA',
            'ARMENIA',
            'ARUBA',
            'AUSTRALIA',
            'AUSTRIA',
            'AZERBAIJAN',
            'BAHAMAS',
            'BAHRAIN',
            'BANGLADESH',
            'BARBADOS',
            'BELARUS',
            'BELGIUM',
            'BELIZE',
            'BENIN',
            'BERMUDA',
            'BHUTAN',
            'BOLIVIA, PLURINATIONAL STATE OF',
            'BONAIRE, SINT EUSTATIUS AND SABA',
            'BOSNIA AND HERZEGOVINA',
            'BOTSWANA',
            'BOUVET ISLAND',
            'BRAZIL',
            'BRITISH INDIAN OCEAN TERRITORY',
            'BRUNEI DARUSSALAM',
            'BULGARIA',
            'BURKINA FASO',
            'BURUNDI',
            'CAMBODIA',
            'CAMEROON',
            'CANADA',
            'CAPE VERDE',
            'CAYMAN ISLANDS',
            'CENTRAL AFRICAN REPUBLIC',
            'CHAD',
            'CHILE',
            'CHINA',
            'CHRISTMAS ISLAND',
            'COCOS (KEELING) ISLANDS',
            'COLOMBIA',
            'COMOROS',
            'CONGO',
            'CONGO, THE DEMOCRATIC REPUBLIC OF THE',
            'COOK ISLANDS',
            'COSTA RICA',
            'CÔTE D\'IVOIRE',
            'CROATIA',
            'CUBA',
            'CURAÇAO',
            'CYPRUS',
            'CZECH REPUBLIC',
            'DENMARK',
            'DJIBOUTI',
            'DOMINICA',
            'DOMINICAN REPUBLIC',
            'ECUADOR',
            'EGYPT',
            'EL SALVADOR',
            'EQUATORIAL GUINEA',
            'ERITREA',
            'ESTONIA',
            'ETHIOPIA',
            'FALKLAND ISLANDS (MALVINAS)',
            'FAROE ISLANDS',
            'FIJI',
            'FINLAND',
            'FRANCE',
            'FRENCH GUIANA',
            'FRENCH POLYNESIA',
            'FRENCH SOUTHERN TERRITORIES',
            'GABON',
            'GAMBIA',
            'GEORGIA',
            'GERMANY',
            'GHANA',
            'GIBRALTAR',
            'GREECE',
            'GREENLAND',
            'GRENADA',
            'GUADELOUPE',
            'GUAM',
            'GUATEMALA',
            'GUERNSEY',
            'GUINEA',
            'GUINEA-BISSAU',
            'GUYANA',
            'HAITI',
            'HEARD ISLAND AND MCDONALD ISLANDS',
            'HOLY SEE (VATICAN CITY STATE)',
            'HONDURAS',
            'HONG KONG',
            'HUNGARY',
            'ICELAND',
            'INDIA',
            'INDONESIA',
            'IRAN, ISLAMIC REPUBLIC OF',
            'IRAQ',
            'IRELAND',
            'ISLE OF MAN',
            'ISRAEL',
            'ITALY',
            'JAMAICA',
            'JAPAN',
            'JERSEY',
            'JORDAN',
            'KAZAKHSTAN',
            'KENYA',
            'KIRIBATI',
            'KOREA, DEMOCRATIC PEOPLE\'S REPUBLIC OF',
            'KOREA, REPUBLIC OF',
            'KUWAIT',
            'KYRGYZSTAN',
            'LAO PEOPLE\'S DEMOCRATIC REPUBLIC',
            'LATVIA',
            'LEBANON',
            'LESOTHO',
            'LIBERIA',
            'LIBYA',
            'LIECHTENSTEIN',
            'LITHUANIA',
            'LUXEMBOURG',
            'MACAO',
            'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF',
            'MADAGASCAR',
            'MALAWI',
            'MALAYSIA',
            'MALDIVES',
            'MALI',
            'MALTA',
            'MARSHALL ISLANDS',
            'MARTINIQUE',
            'MAURITANIA',
            'MAURITIUS',
            'MAYOTTE',
            'MEXICO',
            'MICRONESIA, FEDERATED STATES OF',
            'MOLDOVA, REPUBLIC OF',
            'MONACO',
            'MONGOLIA',
            'MONTENEGRO',
            'MONTSERRAT',
            'MOROCCO',
            'MOZAMBIQUE',
            'MYANMAR',
            'NAMIBIA',
            'NAURU',
            'NEPAL',
            'NETHERLANDS',
            'NEW CALEDONIA',
            'NEW ZEALAND',
            'NICARAGUA',
            'NIGER',
            'NIGERIA',
            'NIUE',
            'NORFOLK ISLAND',
            'NORTHERN MARIANA ISLANDS',
            'NORWAY',
            'OMAN',
            'PAKISTAN',
            'PALAU',
            'PALESTINE, STATE OF',
            'PANAMA',
            'PAPUA NEW GUINEA',
            'PARAGUAY',
            'PERU',
            'PHILIPPINES',
            'PITCAIRN',
            'POLAND',
            'PORTUGAL',
            'PUERTO RICO',
            'QATAR',
            'RÉUNION',
            'ROMANIA',
            'RUSSIAN FEDERATION',
            'RWANDA',
            'SAINT BARTHÉLEMY',
            'SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA',
            'SAINT KITTS AND NEVIS',
            'SAINT LUCIA',
            'SAINT MARTIN (FRENCH PART)',
            'SAINT PIERRE AND MIQUELON',
            'SAINT VINCENT AND THE GRENADINES',
            'SAMOA',
            'SAN MARINO',
            'SAO TOME AND PRINCIPE',
            'SAUDI ARABIA',
            'SENEGAL',
            'SERBIA',
            'SEYCHELLES',
            'SIERRA LEONE',
            'SINGAPORE',
            'SINT MAARTEN (DUTCH PART)',
            'SLOVAKIA',
            'SLOVENIA',
            'SOLOMON ISLANDS',
            'SOMALIA',
            'SOUTH AFRICA',
            'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS',
            'SOUTH SUDAN',
            'SPAIN',
            'SRI LANKA',
            'SUDAN',
            'SURINAME',
            'SVALBARD AND JAN MAYEN',
            'SWAZILAND',
            'SWEDEN',
            'SWITZERLAND',
            'SYRIAN ARAB REPUBLIC',
            'TAIWAN, PROVINCE OF CHINA',
            'TAJIKISTAN',
            'TANZANIA, UNITED REPUBLIC OF',
            'THAILAND',
            'TIMOR-LESTE',
            'TOGO',
            'TOKELAU',
            'TONGA',
            'TRINIDAD AND TOBAGO',
            'TUNISIA',
            'TURKEY',
            'TURKMENISTAN',
            'TURKS AND CAICOS ISLANDS',
            'TUVALU',
            'UGANDA',
            'UKRAINE',
            'UNITED ARAB EMIRATES',
            'UNITED KINGDOM',
            'UNITED STATES',
            'UNITED STATES MINOR OUTLYING ISLANDS',
            'URUGUAY',
            'UZBEKISTAN',
            'VANUATU',
            'VENEZUELA, BOLIVARIAN REPUBLIC OF',
            'VIETNAM',
            'VIRGIN ISLANDS, BRITISH',
            'VIRGIN ISLANDS, U.S.',
            'WALLIS AND FUTUNA',
            'WESTERN SAHARA',
            'YEMEN',
            'ZAMBIA',
            'ZIMBABWE',
        ];
        let elements = [];

        array.forEach((country) => {
            let slug = country.toLowerCase()
                    .replace(/ /g,'-')
                    .replace(/[^\w-]+/g,'')
                ;
            elements.push({
                label: country,
                value: slug
            });
        });

        return elements;
    }

    getCountryValue(user) {
        let options = this.getCountryOptions();

        if(user.profile.basedIn) {
            var result = options.filter(function( obj ) {
                return obj.value == user.profile.basedIn;
            });
            if(result.length) {
                return result[0].label;
            } else {
                return '-';
            }
        }
    }

    getLanguagesOptions() {
        {
            const array = [
                'Afrikaans',
                'Albanian',
                'Arabic',
                'Armenian',
                'Basque',
                'Bengali',
                'Bulgarian',
                'Catalan',
                'Cambodian',
                'Chinese (Mandarin)',
                'Croatian',
                'Czech',
                'Danish',
                'Dutch',
                'English',
                'Estonian',
                'Fiji',
                'Finnish',
                'French',
                'Georgian',
                'German',
                'Greek',
                'Gujarati',
                'Hebrew',
                'Hindi',
                'Hungarian',
                'Icelandic',
                'Indonesian',
                'Irish',
                'Italian',
                'Japanese',
                'Javanese',
                'Korean',
                'Latin',
                'Latvian',
                'Lithuanian',
                'Macedonian',
                'Malay',
                'Malayalam',
                'Maltese',
                'Maori',
                'Marathi',
                'Mongolian',
                'Nepali',
                'Norwegian',
                'Persian',
                'Polish',
                'Portuguese',
                'Punjabi',
                'Quechua',
                'Romanian',
                'Russian',
                'Samoan',
                'Serbian',
                'Slovak',
                'Slovenian',
                'Spanish',
                'Swahili',
                'Swedish',
                'Tagalog',
                'Tamil',
                'Tatar',
                'Telugu',
                'Thai',
                'Tibetan',
                'Tonga',
                'Turkish',
                'Ukrainian',
                'Urdu',
                'Uzbek',
                'Vietnamese',
                'Welsh',
                'Xhosa',
                'Other',
            ];

            let elements = [];

            array.forEach((language) => {
                let slug = language.toLowerCase()
                        .replace(/ /g,'-')
                        .replace(/[^\w-]+/g,'')
                    ;
                elements.push({
                    label: language,
                    value: slug
                });
            });

            return elements;
        }

    }

    getLanguageValue(user) {
        let options = this.getLanguagesOptions();

        if(user.profile.languages) {
            var result = options.filter(function( obj ) {
                return obj.value == user.profile.languages;
            });
            if(result.length) {
                return result[0].label;
            } else {
                return '-';
            }
        }
    }

    render() {
        let Following = this.props.following.length ? this.props.following.length : 0;
        let Followers = this.props.followers.length ? this.props.followers.length : 0;
        const user = this.props.user;
        return (
            <div className="profile-data-wrapper">

            <div className="profileViewTop section--dark ">
                <div className="padding-all-sm">
                    <div className="row">
                        <div className="col-sm-3 align-self-center">
                            <div className="txt-center">
                                <h2 className="txt-col--light no-margin-top txt-weight--light">{user.profile.firstName} {user.profile.lastName}</h2>
                                <small><span className="since">Member since: <strong>{this.joinedDate(user)}</strong></span></small>   
                            </div>
                        </div>
                        <div className="col-sm-2 align-self-center">
                            {user.profile.image ? <img className="img-circle" src={user.profile.image}/> : <img className="img-circle" src={Telescope.settings.get('defaultProfileImage')}/>}
                        </div>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-4">
                            <h6>Job title</h6>
                            <h3>{user.profile.jobTitle ? user.profile.jobTitle : '-'}</h3>
                            <br/><br/>
                            <h6>Company</h6>
                            <h3>{user.profile.firm}</h3>
                        </div>
                        <div className="col-sm-2">
                            <h6>Based in</h6>
                            <h3>{this.getCountryValue(user)}</h3>
                            <br/><br/>
                            <h6>Department</h6>
                            <h3>{this.getDepartmentValue(user)}</h3>                         
                        </div>
                        
                    </div>
                    <hr className="orange" />
                    <div className="row">
                        <div className="col-sm-2">
                            <div className='counter'><span className="txt-orange">{Following}</span> <span className='text'>Following</span></div>
                        </div>
                        <div className="col-sm-2">
                            <div className='counter'><span className="txt-orange">{Followers} </span><span className='text'>Followers</span></div>
                        </div>
                        <div className="col-sm-8">
                            {(user._id != Meteor.userId() ? this.displayButtons(user) : '')}
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-view-bottom section--grey">


                <div className="row profile-section profile-summary">

                    <div className="col-sm-4 section--white">
                        <h3 className="txt-center margin-top-10 margin-bottom-20">activity archive</h3>
                        <div className="hide-mobile">
                            <Telescope.components.Status statusForUser={user._id}/>
                            {/*<Telescope.components.ProfileTimeline/>*/}
                        </div>
                    </div>

                    <div className="col-sm-8">
                        <h3>Bio</h3>
                        <div>{user.profile ? (user.profile.bio ? user.profile.bio : '-') : '-'}</div>
                        
                        <hr />
                        
                        <div className="full-profile-extra-fields">

                            {
                                user.profile.profession &&
                                (
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3 className="txt-orange">Profession</h3>
                                            <div>
                                                {this.getProfessionValue(user)}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                user.profile.professionalQualifications &&
                                (
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3 className="txt-orange">Qualifications</h3>
                                            <div>
                                                {this.getQualificationValue(user)}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                user.profile.languages &&
                                (
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3 className="txt-orange">Languages</h3>
                                            <div>
                                                {this.getLanguageValue(user)}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                user.profile.maritalStatus &&
                                (
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3 className="txt-orange">Marital Status</h3>
                                            <div>
                                                {this.getMaritalStatusValue(user)}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                user.profile.children &&
                                (
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3 className="txt-orange">Children</h3>
                                            <div>
                                                {this.getChildrenValue(user)}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                user.profile.pets &&
                                (
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3 className="txt-orange">Pets</h3>
                                            <div>
                                                {this.getPetsValue(user)}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                user.profile.hobbies &&
                                (
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3 className="txt-orange">Hobbies and interests</h3>
                                            <div>
                                                {user.profile.hobbies}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                user.profile.favMovie &&
                                (
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3 className="txt-orange">Favourite movie</h3>
                                            <div>
                                                {user.profile.favMovie}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                user.profile.favBook &&
                                (
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3 className="txt-orange">Favourite book</h3>
                                            <div>
                                                {user.profile.favBook}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                user.profile.favMusician &&
                                (
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3 className="txt-orange">Favourite musician</h3>
                                            <div>
                                                {user.profile.favMusician}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

VisibilityFullProfile.displayName = "VisibilityFullProfile";
module.exports = VisibilityFullProfile;
export default VisibilityFullProfile;
