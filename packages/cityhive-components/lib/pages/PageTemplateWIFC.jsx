import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';
import Articles from 'meteor/cityhive:articles';
import { ListContainer, DocumentContainer } from "meteor/utilities:react-list-container";

class PageTemplateWIFC extends Component {

    render() {
        const page = this.props.page;

        let pageClass = "page-item page-template-wifc";

        return (
            <div className={pageClass}>

                <div className="container txt-col--light">

                    <div className="limited-width-medium">
                        <h2 className="page-title">HM Treasury Women in Finance Charter:<span>improving gender diversity in financial services</span></h2>
                        <img src="/img/page-wifc.jpg" className="image" />

                        <p className="lead">In 2015 the government asked Jayne-Anne Gadhia, CEO of Virgin Money, to lead a review into the representation of women in senior managerial roles in financial services.</p>
                        <p>Financial services is the highest paid sector in the UK economy, where the gender salary gap for full-time employees is at its most stark. Jayne-Anne’s review looked at the issue of unequal gender representation in the financial services sector that worsens as employees rise into more senior positions.</p>
                        <p>The review was published on 22 March, and makes four recommendations to industry to improve gender diversity in financial services, which received widespread support from the sector.</p>

                        <hr/>


                        <ul className="ul-menu--with-circles">
                            <li>Firms should have one member of the senior executive team who is responsible and accountable for gender diversity and inclusion.</li>
                            <li>Firms should set internal targets for gender diversity in senior management.</li>
                            <li>Firms should publish progress annually against these targets in reports on their website.</li>
                            <li>Firms should have an intention to ensure the pay of the senior executive team is linked to delivery against these gender diversity targets.</li>
                        </ul>

                        <hr />

                        <p>To take forward Jayne-Anne’s work, the government launched the HM Treasury Women in Finance Charter in March, asking firms to commit these four industry actions. On 8 November the government announced that 93 firms across the financial services sector have signed the Charter. Firms of all shapes and sizes have signed up, with headquarters in the UK, USA, Europe and Asia.</p>
                        <p>The reception from industry has been enormously positive, but there is still more that can be done. The payments firms, fintechs and investments firms in particular are underrepresented among current Charter signatories, and the government wants to see more firms leading the way on gender diversity. The government also recently appointed Jayne-Anne Gadhia as the government’s new Women in Finance Champion to promote the benefits of a diverse workforce across UK financial services.</p>
                        <p>HM Treasury welcomes interest from all firms of any type and size. You can find out more about the Women in Finance Charter here, or you can email <a href="mailto:womeninfinance@hmtreasury.gsi.gov.uk">womeninfinance@hmtreasury.gsi.gov.uk</a> if you would like to speak to the team about issues relating to the Charter that are specific to your organisation.</p>
                        <p>To sign the Charter and formally commit to improving gender diversity, please visit <a href="http://www.womeninfinance.org.uk" target="_blank">www.womeninfinance.org.uk</a> and fill out the online form.</p>

                    </div>
                </div>

            </div>
        )
    }
}

PageTemplateWIFC.propTypes = {
    page: React.PropTypes.object.isRequired
};

PageTemplateWIFC.contextTypes = {
    currentUser: React.PropTypes.object
};

module.exports = PageTemplateWIFC;
export default PageTemplateWIFC;