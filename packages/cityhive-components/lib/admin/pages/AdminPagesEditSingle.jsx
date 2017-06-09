import React, { PropTypes, Component } from 'react';
import Pages from 'meteor/cityhive:pages';
import AdminPagesEditSingleComposer from './AdminPagesEditSingleComposer'
import EditPageForm from './forms/EditPageForm';
import EditPageFormAboutUs from './forms/EditPageFormAboutUs';
import EditPageFormMembership from './forms/EditPageFormMembership';

class AdminPagesEditSingle extends Component {

    displayEditPageForm(pageDocument) {
        if(pageDocument.slug == 'about') {
            return <EditPageFormAboutUs document={pageDocument}  />;
        }
        if(pageDocument.slug == 'membership') {
            return <EditPageFormMembership document={pageDocument} />
        }
        return <EditPageForm document={pageDocument} />;
    }

    render() {

        let pageId = this.props.routeParams._id;
        let page = Pages.findOne({_id: pageId});

        return (
            <div className="admin-pages-edit-single">
                <div className="breadcrumbs">
                    <span>Edit Page</span>
                </div>
                {
                    this.props.ready ?
                        <div className="user-directory section--grey section--padding clearfix">
                            {this.displayEditPageForm(page)}
                        </div>
                        : <p>Loading...</p>
                }
            </div>
        )
    }

}

AdminPagesEditSingle.displayName = "AdminPagesEditSingle";

module.exports = AdminPagesEditSingleComposer(AdminPagesEditSingle);

export default AdminPagesEditSingleComposer(AdminPagesEditSingle);

