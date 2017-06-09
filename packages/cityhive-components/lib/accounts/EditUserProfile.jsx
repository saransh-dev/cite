import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import {Messages} from 'meteor/nova:core';
import {FlashContainer} from "meteor/nova:core";

class EditUserProfile extends Component {

    getYearsRange() {
        // years range
        let currentYear = new Date().getFullYear(),
            startYear = 1950;
        years = [];
        while ( startYear <= currentYear ) {
            let year = startYear++;
            years.push(<option key={year} value={year}>{year}</option>)
        }
        return years;
    }

    render() {

        return (
            <Telescope.components.Profile>

                <div className="breadcrumbs">
                    <i className="iconmoon-cityhive-iconmoon-font-v2-ol_messages-copy"/>
                    <span>Edit Profile</span>
                </div>

                <div className="edit-user-profile">
                    <form ref="editProfile" onSubmit={this.formSubmit}>

                        <fieldset className="section--grey section--padding">

                            <div className="form-group">
                                <div className="profile-image-label">
                                    <p><strong>Profile image</strong></p>
                                    <p>Image file type: .jpg .gif .png<br/>Max file size: 2mb</p>
                                    <p><span>Top tip:</span> A photo with your face in the center will preview best.</p>

                                </div>
                            </div>

                            <div className="form-group display-name">
                                <div className="row">
                                    <label htmlFor="username" className="col-sm-3 col-form-label">Display name</label>
                                    <div className="col-sm-9">
                                        <input ref="username" id="username" type="text" className="form-control" required />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="work-email" className="col-sm-3 col-form-label">Work email</label>
                                <div className="col-sm-9">
                                    <input ref="workEmail" id="work-email" type="text" className="form-control" required />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="title" className="col-sm-3 col-form-label">Title</label>
                                <div className="col-sm-9">
                                    <select ref="title" id="title" className="form-control" required>
                                        <option value="miss">Miss</option>
                                        <option value="mrs">Mrs</option>
                                        <option value="ms">Ms</option>
                                        <option value="mr">Mr</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="first-name" className="col-sm-3 col-form-label">First name</label>
                                <div className="col-sm-9">
                                    <input ref="firstName" id="first-name" type="text" className="form-control" required />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="last-name" className="col-sm-3 col-form-label">Last name</label>
                                <div className="col-sm-9">
                                    <input ref="lastName" id="last-name" type="text" className="form-control" required />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="personal-email" className="col-sm-3 col-form-label">Personal email</label>
                                <div className="col-sm-9">
                                    <input ref="personalEmail" id="personal-email" type="text" className="form-control" required />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="mobile-number" className="col-sm-3 col-form-label">Mobile number</label>
                                <div className="col-sm-9">
                                    <input ref="mobileNumber" id="mobile-number" type="text" className="form-control" required />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="bio" className="col-sm-3 col-form-label">Bio</label>
                                <div className="col-sm-9">
                                    <textarea ref="bio" id="bio" className="form-control" rows="5"/>
                                </div>
                            </div>
                        </fieldset>

                        <p className="fieldset-caption">Edit your professional details</p>
                        <fieldset className="section--grey section--padding">

                            <div className="form-group row">
                                <label htmlFor="profession" className="col-sm-3 col-form-label">Profession</label>
                                <div className="col-sm-9">
                                    <select ref="profession" id="profession" className="form-control" required>
                                        <option value="asset-management">Asset Management</option>
                                        <option value="investment-management">Investment Management</option>
                                        <option value="private-banking">Private Banking</option>
                                        <option value="wealth-management">Wealth Management</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="job-title" className="col-sm-3 col-form-label">Job title</label>
                                <div className="col-sm-9">
                                    <input ref="jobTitle" id="jobTitle" type="text" className="form-control" required />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="department" className="col-sm-3 col-form-label">Department</label>
                                <div className="col-sm-9">
                                    <select ref="department" id="department" className="form-control" required>
                                        <option value="finance">Finance</option>
                                        <option value="human-resources">Human Resources</option>
                                        <option value="management">Management</option>
                                        <option value="legal">Legal</option>
                                        <option value="marketing-product-strategy">Marketing & Product Strategy</option>
                                        <option value="operations-it">Operations & IT</option>
                                        <option value="risk-compliance">Risk & Compliance</option>
                                        <option value="sales-distribution">Sales & Distribution</option>
                                        <option value="other">Other (free type)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="year-started" className="col-sm-3 col-form-label">Year started</label>
                                <div className="col-sm-9">
                                    <select ref="yearStarted" id="year-started" className="form-control" required>
                                        {this.getYearsRange()}
                                    </select>
                                </div>
                            </div>

                        </fieldset>

                        <p className="fieldset-caption">Edit your qualifications</p>
                        <fieldset className="section--grey section--padding">

                            <div className="form-check row">
                                <label htmlFor="qualifications" className="col-sm-3 col-form-label">Qualifications</label>
                                <div className="col-sm-9">
                                    <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input"/> CFA
                                    </label>
                                    <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input"/> CAIA
                                    </label>
                                    <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input"/> CISI
                                    </label>
                                </div>
                            </div>

                        </fieldset>

                        <p className="fieldset-caption">Edit your extra details</p>
                        <fieldset className="section--grey section--padding">

                            <div className="form-group three-words">
                                <div className="row">
                                    <label htmlFor="three-words-one" className="col-sm-3 col-form-label">Three words that describe you</label>
                                    <div className="col-sm-9">
                                        <input ref="threeWordsOne" id="three-words-one" type="text" className="form-control" />
                                        <input ref="threeWordsTwo" id="three-words-two" type="text" className="form-control" />
                                        <input ref="threeWordsThree" id="three-words-three" type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-check row">
                                <label htmlFor="marital-status" className="col-sm-3 col-form-label">Marital Status</label>
                                <div className="col-sm-9">
                                    <label htmlFor="maritalStatusSingle" className="form-check-label">
                                        <input type="radio" className="form-check-input" name="maritalStatus" ref="maritalStatusSingle" id="maritalStatusSingle" value="single"/> Single
                                    </label>
                                    <label htmlFor="maritalStatusMarried" className="form-check-label">
                                        <input type="radio" className="form-check-input" name="maritalStatus" ref="maritalStatusMarried" id="maritalStatusMarried" value="married"/> Married
                                    </label>
                                </div>
                            </div>

                            <div className="form-check row">
                                <label htmlFor="children" className="col-sm-3 col-form-label">Children</label>
                                <div className="col-sm-9">
                                    <label htmlFor="children-no" className="form-check-label">
                                        <input type="radio" className="form-check-input" name="children" ref="childrenNo" id="children-no" value="no"/> No
                                    </label>
                                    <label htmlFor="children-yes" className="form-check-label">
                                        <input type="radio" className="form-check-input" name="children" ref="childrenYes" id="children-yes" value="yes"/> Yes
                                    </label>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="pets" className="col-sm-3 col-form-label">Pets</label>
                                <div className="col-sm-9">
                                    <select ref="pets" id="pets" className="form-control" multiple="multiple">
                                        <option value="dogs">Dogs</option>
                                        <option value="cats">Cats</option>
                                        <option value="small-furry">Small furry</option>
                                        <option value="horse">Horse</option>
                                        <option value="feathered">Feathered</option>
                                        <option value="aquatic">Aquatic</option>
                                        <option value="reptile">Reptile</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <label htmlFor="hobbies" className="col-sm-3 col-form-label">Hobbies and interests</label>
                                    <div className="col-sm-9">
                                        <input ref="hobbies" id="hobbies" type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <label htmlFor="favourite-movie" className="col-sm-3 col-form-label">Favourite movie</label>
                                    <div className="col-sm-9">
                                        <input ref="favouriteMovie" id="favourite-movie" type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <label htmlFor="favourite-book" className="col-sm-3 col-form-label">Favourite book</label>
                                    <div className="col-sm-9">
                                        <input ref="favouriteBook" id="favourite-book" type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <label htmlFor="favourite-musician" className="col-sm-3 col-form-label">Favourite musician</label>
                                    <div className="col-sm-9">
                                        <input ref="favouriteMusician" id="favourite-musician" type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>

                        </fieldset>

                        <input type="submit" value="Sign up"/>

                    </form>
                </div>

            </Telescope.components.Profile>
        )

    }

}

EditUserProfile.contextTypes = {
  currentUser: React.PropTypes.object
};

EditUserProfile.displayName = "EditUserProfile";

module.exports = EditUserProfile;
