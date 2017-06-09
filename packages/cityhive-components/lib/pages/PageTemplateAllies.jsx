import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';

class PageTemplateAllies extends Component {

    showLogoOverlay(){
        $('.logo-overlay, body').toggleClass('active');    
        $('.logo-overlay').find('.close').on('click', function () {
            $('.logo-overlay, body').removeClass('active');
        });        
    }

    render() {
        const page = this.props.page;

        let pageClass = "page-item page-template-allies";

        return (
            <div className={pageClass}>


                <div className="container txt-col--light">

                    <div className="limited-width-small">
                        <h2 className="page-title">Allies</h2>

                        <p><strong>City Hive is dedicated to uniting, supporting and championing women at all levels of asset and investment management.</strong></p>
                        <p>A Hive, like the City, doesn’t comprise just one solitary queen bee but a dynamic eco-system of thousands of industrious female worker bees.  We want to dispel the myth of the lone queen bee, and recognise the thousands of smart, talented females working hard to create sweet, valuable liquid gold in the City on a daily basis.</p>
            
                        <div className="logos logos-block clearfix">
                        <table>
                            <tbody>
                            <tr>
                                <td><img onClick={this.showLogoOverlay} src="/img/logos-hm-treasury.png" data-source="#logo-one"/></td>
                                <td><img onClick={this.showLogoOverlay} src="/img/logos-un.png" data-source="#logo-two"/></td>
                            </tr>
                            <tr>
                                <td><img onClick={this.showLogoOverlay} src="/img/logos-cfa.png" data-source="#logo-three"/></td>
                                <td><img onClick={this.showLogoOverlay} src="/img/logos-caia.png" data-source="#logo-four"/></td>
                            </tr> 
                            </tbody>                           
                        </table>
                        </div>

                        <div className="logo-overlay" id="logo-one">
                        <div className="container">
                        <span className="close">X</span>
                            <img src="/img/logos-hm-treasury.png"/>
                            <h5>HM Treasury</h5>
                            <p>Fusce porttitor odio a ligula gravida pulvinar. Quisque sit amet finibus eros. Vivamus vestibulum sit amet ex in condimentum. Quisque vel nibh eu libero blandit tempus. Donec odio tellus, vehicula non faucibus ac, fermentum sed turpis. In risus mi, ornare sit amet pharetra non, accumsan eget dolor. Curabitur ornare dapibus quam, sit amet feugiat augue ullamcorper ut. Fusce et erat vel quam pulvinar pharetra in in urna. Quisque sollicitudin metus et tortor lobortis, malesuada dictum elit blandit.</p>
                            <p><a href="http://www.google.co.uk">gov.uk/government/orginisations/hm-treasury</a></p>
                        </div>
                        </div>                                                                     


                        <div className="hex"><h5>Stand with us</h5></div>

                            <p>Fusce porttitor odio a ligula gravida pulvinar. Quisque sit amet finibus eros. Vivamus vestibulum sit amet ex in condimentum. Quisque vel nibh eu libero blandit tempus. Donec odio tellus, vehicula non faucibus ac, fermentum sed turpis. In risus mi, ornare sit amet pharetra non, accumsan eget dolor. Curabitur ornare dapibus quam, sit amet feugiat augue ullamcorper ut. Fusce et erat vel quam pulvinar pharetra in in urna. Quisque sollicitudin metus et tortor lobortis, malesuada dictum elit blandit.</p>
                                <p className="txt-orange">-</p>
                                <p><strong><a className="txt-col--light" href="mailto:office@cityhive.co.uk">office@cityhive.co.uk</a></strong></p>                                                    

                </div>

            </div>

            </div>
        )
    }
}

PageTemplateAllies.propTypes = {
    page: React.PropTypes.object.isRequired
};

PageTemplateAllies.contextTypes = {
    currentUser: React.PropTypes.object
};

module.exports = PageTemplateAllies;
export default PageTemplateAllies;