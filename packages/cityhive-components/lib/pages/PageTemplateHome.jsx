import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';

class PageTemplateHome extends Component {

    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.state = {
            width: '',
            height: '',
            ready: false,
        }
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        if(typeof window !== "undefined") {
            window.addEventListener("resize", this.updateDimensions);
            this.setState({ready: true})
        }

        let width = this.state.width;

        if(width > 999) {
            var clientHeight = $( window ).height();
            $('.section').css('height', clientHeight);
        } else {
            $('.section').css('height', 'auto');
        }

        $(window).on('resize', function(){
            var wid = $(window).width();
            if (wid > 999) {
                var clientHeight = $( window ).height();
                $('.section').css('height', clientHeight);
            } else {
                $('.section').css('height', 'auto');
            }
        });

        $('.home-loading').addClass('remove-opacity');
        setTimeout(function () {
            $('.home-loading').remove();
        }, 250)

        $(".slide-quote ul li:nth-child(" + Math.floor((Math.random() * $('.slide-quote ul li').length) + 1) + ")").addClass('active');

    }

    componentWillUnmount() {
        if(typeof window !== "undefined") {
            window.removeEventListener("resize", this.updateDimensions);
        }
    }

    updateDimensions() {
        if(typeof window !== "undefined") {
            this.setState({width: $(window).width(), height: $(window).height()});
        }
    }

    render() {
        const page = this.props.page;

        let pageClass = "page-item page-template-home";

        return (
            <div className={pageClass}>
                <span className="slide-spray-triangle"></span>

                <ul className="section-menu">
                <li data-menuanchor="section-one" className="active"><a href="#section-one"></a></li>
                <li data-menuanchor="section-two" ><a href="#section-two"></a></li>
                <li data-menuanchor="section-three" ><a href="#section-three"></a></li>
                <li data-menuanchor="section-four" ><a href="#section-four"></a></li>
                <li data-menuanchor="section-five" ><a href="#section-five"></a></li>
            </ul>

            <div className="homepage-panels" id="fullpage">

                <div className="section section-one">
                    <span className="slide-spray-mask"></span>
                    <span className="slide-spray-bg"></span>
                    <span className="slide-spray-triangle"></span>
                    <div className="slide-inner">
                        <div className="container">
                        <div className="slide-top-content">
                            <div className="margin-bot-xl txt-center txt-col--light">
                                <h2 className="page-title"><img src="/img/logo-white.png"/></h2>
                                <h4>Uniting, supporting and championing women in asset and investment management</h4>
                            </div>
                            <div className="txt-center txt-col--light">
                            <Link to="/sign-up">
                                <p><strong>SIGN UP</strong><br/>
                                Join City Hive today</p>
                            </Link>
                            </div>
                        </div>

                            <div className="hex-wrapper">
                                    <div className="hex-home">
                                    <div className="tri tri-top"></div>
                                    <div className="hex-inner">
                                        <div className="play-vid">
                                            <a className="typeform-share link" href="https://cityhive.typeform.com/to/QRwyt0" data-mode="1" target="_blank"><img src="/img/vid-play-btn.png"/></a>
                                            {this.state.ready && <script>{(function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'share.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)}})()}</script>}
                                        </div>
                                        <p><strong>
                                            City Hive is dedicated to uniting, supporting and championing women at all levels of asset and investment management.</strong>
                                        </p>
                                        <p>A Hive, like the City, does not comprise just one solitary queen bee but a dynamic eco-system of thousands of industrious female worker bees.  We want to dispel the myth of the lone queen bee, and recognise the thousands of smart, talented females working hard to create sweet, valuable liquid gold in the City on a daily basis.</p>
                                    
                                    </div>
                                    <div className="tri tri-bottom"></div>
                                    </div>
                                    </div>
                                <div className="slide-quote">
                                    <ul>
                                        <li>
                                             <div className="slide-quote-image">
                                                <img src="/img/quote-madeleine-albright.png"/>
                                            </div>
                                            <div className="hex-quote">
                                                <div className="inner">
                                                <small>There is a special place in hell for women who don’t help other women.</small>
                                                <h6>Madeleine Albright</h6></div>
                                            </div>                                           
                                        </li>
                                        <li>
                                             <div className="slide-quote-image">
                                                <img src="/img/quote-oprah.png"/>
                                            </div>
                                            <div className="hex-quote">
                                                <div className="inner">
                                                <small>Think like a queen. A queen is not afraid to fail. Failure is another steppingstone to greatness.</small>
                                                <h6>Oprah Winfrey</h6></div>
                                            </div>                                           
                                        </li>
                                        <li>
                                             <div className="slide-quote-image">
                                                <img src="/img/quote-rosie-riveter.png"/>
                                            </div>
                                            <div className="hex-quote">
                                                <div className="inner">
                                                <small>We can do it.</small>
                                                <h6>Rosie the Riveter</h6></div>
                                            </div>                                           
                                        </li>  
                                        <li>
                                             <div className="slide-quote-image">
                                                <img src="/img/quote-sheryl-sandberg.png"/>
                                            </div>
                                            <div className="hex-quote">
                                                <div className="inner">
                                                <small>Option A is not available. So let’s kick the sh** out of option B.</small>
                                                <h6>Sheryl Sandberg</h6></div>
                                            </div>                                           
                                        </li> 
                                        <li>
                                             <div className="slide-quote-image">
                                                <img src="/img/quote-christine-lagarde.png"/>
                                            </div>
                                            <div className="hex-quote">
                                                <div className="inner">
                                                <small>If Lehman Brothers had been Lehman Sisters...</small>
                                                <h6>Christine Lagarde</h6></div>
                                            </div>                                           
                                        </li> 
                                        <li>
                                             <div className="slide-quote-image">
                                                <img src="/img/quote-jessica-rabbit.png"/>
                                            </div>
                                            <div className="hex-quote">
                                                <div className="inner">
                                                <small>You don't know how hard it is being a woman looking the way I do.</small>
                                                <h6>Jessica Rabbit</h6></div>
                                            </div>                                           
                                        </li> 
                                        <li>
                                             <div className="slide-quote-image">
                                                <img src="/img/quote-aung-sang-suu-kyi.png"/>
                                            </div>
                                            <div className="hex-quote">
                                                <div className="inner">
                                                <small>In societies where men are truly confident of their own worth, women are not merely tolerated but valued.</small>
                                                <h6>Aung Sang Suu Kyi</h6></div>
                                            </div>                                           
                                        </li>                                                                                                                                                                                                                                              
                                    </ul>                                                                      
                                </div>                                    
                        </div>
                    </div>
                    </div>
                    <div className="section section-two">
                    <span className="slide-spray-mask"></span>
                    <span className="slide-spray-bg"></span>
                    <span className="slide-spray-triangle"></span>
                    <div className="slide-inner">
                        <div className="container">
                         <div className="row">
                            <div className="col-sm-8">
                                <div className="slide-title">
                                    Connect women across the industry.
                                </div>
                                <div className="slide-content">
                                    Building a strong, supportive community providing advice and comradeship. Running regular networking events, professional development workshops, and a members’ website featuring forums, blogs, news, advice and careers portal.
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="section section-three">
                    <span className="slide-spray-mask"></span>
                    <span className="slide-spray-bg"></span>
                    <span className="slide-spray-triangle"></span>
                    <div className="slide-inner">
                        <div className="container">
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="slide-title">
                                    Campaign to raise awareness of gender issues.
                                </div>
                                <div className="slide-content">
                                    Pushing gender diversity and the female contribution to the top of the agenda, fostering a real dialogue about how gender imbalance affects us all. Engaging with HR and management teams, banging the drum with the media and getting the issues talked about at the water cooler.
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="section section-four">
                    <span className="slide-spray-mask"></span>
                    <span className="slide-spray-bg"></span>
                    <span className="slide-spray-triangle"></span>
                    <div className="slide-inner">
                        <div className="container">
                        <div className="row">
                            <div className="col-sm-8">
                                  <div className="slide-title">
                                    Collaborate with employers and employees on best practice.
                                </div>
                                <div className="slide-content">
                                    Helping companies address their unconscious biases and adapt the working environment; monitoring best practice through regular industry surveys and detailed analysis carried out by a specialised Task Force of diverse representatives from across the City.
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="section section-five">
                    <span className="slide-spray-mask"></span>
                    <span className="slide-spray-bg"></span>
                    <span className="slide-spray-triangle"></span>
                    <div className="slide-inner">
                        <div className="container">
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="slide-title">
                                    Cultivate the pipeline of leadership from the classroom to the boardroom.
                                </div>
                                <div className="slide-content">
                                    Inspiring female graduates to attract a continuing stream of capable women to the industry, including the ‘Grow Your Own’ campaign partnering asset management companies with universities. At the same time nurturing existing industry talent through a highly-respected cross-company mentoring scheme.
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                </div>

            </div>
        )
    }
}

PageTemplateHome.propTypes = {
    page: React.PropTypes.object.isRequired
};

PageTemplateHome.contextTypes = {
    currentUser: React.PropTypes.object
};

module.exports = PageTemplateHome;
export default PageTemplateHome;