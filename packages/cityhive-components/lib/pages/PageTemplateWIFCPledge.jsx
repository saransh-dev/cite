import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';
import Articles from 'meteor/cityhive:articles';
import { ListContainer, DocumentContainer } from "meteor/utilities:react-list-container";

class PageTemplateWIFCPledge extends Component {

    render() {
        const page = this.props.page;

        let pageClass = "page-item page-template-wifc-pledge";

        return (
            <div className={pageClass}>

                <div className="container txt-col--light">

                    <div className="limited-width-medium">
                        <h2 className="page-title">Women in Finance Charter:<span>a pledge for gender balance across financial services</span></h2>

                        <p className="lead">City Hive Women’s Network have signed HM Treasury's Women in Finance Charter, a pledge for gender balance across financial services.</p>
                        <p>This is a commitment by HM Treasury and signatory firms like ourselves to work together to build a more balanced and fair industry. Firms who sign up to this Charter are pledging to be the best businesses in the sector in setting standards for gender balance.</p>
                        <p>The Charter reflects the government’s aspiration to see gender balance at all levels across financial services firms. A balanced workforce is good for business, good for customers, good for profitability and workplace culture, and increasingly attractive for investors.</p>
                        <p>As the only women’s network in asset and investment management, City Hive's vision and mission mean all of our work focuses on improving gender diversity in the Industry, and our Managing Director is fully accountable for this.</p>
                        <p><strong>In addition, City Hive's pledges in relation to the Women in Finance Charter are:</strong></p>
                        
                        <hr />

                        <ul className="ul-menu--with-circles">
                            <li><strong>To support</strong>, unite and champion women, recognising and developing their valuable traits to create a more balanced diverse culture in the City.</li>
                            <li><strong>To collaborate</strong> with financial corporations on improving best practice and cultivating a more inclusive working environment.</li>
                            <li><strong>To challenge</strong> unconscious gender biases embedded historically in the mind-set of financial corporations.</li>
                            <li><strong>To cultivate</strong> the entire female pipeline from schoolroom to boardroom within the Asset and Investment Management Industry.</li>
                            <li><strong>To keep 100%</strong> of our Senior Management and Advisory Team female, a fact which we will report upon annually on our website.</li>
                            <li><strong>To promote</strong> HM Treasury’s ‘Women in Finance Charter’.</li>
                            <li><strong>To promote</strong> the United Nations ‘Principles of Responsible Investing (UN PRI)’ and ‘Women's Empowerment Principles (UN WEP)’.</li>
                        </ul>

                        <hr />
                        
                        <div className="bev-pledge">
                        <i className="fa fa-quote-left"></i>
                        <p>A vision of a more balanced industry with a positive inclusive culture enabling both genders to be proudly recognised for who they are and the complementary talents they bring is central to the very existence of City Hive, so we are hugely supportive of the Women in Finance Charter and proud to be part of it.</p>
                        <p>City Hive is dedicated to uniting, supporting and championing women at all levels of asset and investment management; recognising and developing their valuable traits, collaborating with financial corporations in improving best practice, and challenging unconscious gender biases embedded historically in the finance sector.</p>
                        <p>HM Treasury welcomes interest from all firms of any type and size. You can find out more about the Women in Finance Charter here, or you can email <a href="mailto:womeninfinance@hmtreasury.gsi.gov.uk">womeninfinance@hmtreasury.gsi.gov.uk</a> if you would like to speak to the team about issues relating to the Charter that are specific to your organisation.</p>
                        <p>At City Hive we believe that by standing shoulder to shoulder with the other corporations signed up to this Charter who share our core values and mission, we will we affect true change.”</p>

                        <p><span>Bhavini ‘Bev’ Shah</span>, Founder and Managing Director of City Hive Women’s Network Ltd</p>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

PageTemplateWIFCPledge.propTypes = {
    page: React.PropTypes.object.isRequired
};

PageTemplateWIFCPledge.contextTypes = {
    currentUser: React.PropTypes.object
};

module.exports = PageTemplateWIFCPledge;
export default PageTemplateWIFCPledge;