import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';

class HeadTags extends Component {
	render() {

		const url = !!this.props.url ? this.props.url : Telescope.utils.getSiteUrl();
		const title = "City Hive Women's Network Ltd";
		const description = "City Hive Women's Network Ltd";

		// default image meta: logo url, else site image defined in settings
		let image = !!Telescope.settings.get("siteImage") ? Telescope.settings.get("siteImage"): Telescope.settings.get("logoUrl");
		
		// overwrite default image if one is passed as props 
		if (!!this.props.image) {
			image = this.props.image; 
		}

		// add site url base if the image is stored locally
		if (!!image && image.indexOf('//') === -1) {
			image = Telescope.utils.getSiteUrl() + image;
		}

		const meta = Telescope.headtags.meta.concat([
			{ charset: "utf-8" },
			{ name: "description", content: description },
			// responsive
			{ name: "viewport", content:"width=device-width, initial-scale=1" },
			// facebook
			{ property: "og:type", content: "article" },
			{ property: "og:url", content: url },
			{ property: "og:image", content: image },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			//twitter
			{ name: "twitter:card", content: "summary" },
			{ name: "twitter:image:src", content: image },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description }
		]);

		const link = Telescope.headtags.link.concat([
			{ rel: "canonical", href: Telescope.utils.getSiteUrl() },
			{ rel: "shortcut icon", href: Telescope.settings.get("faviconUrl", "/img/favicon.png") }
		]);

		return (
			<div>
				<Helmet title={title} meta={meta} link={link} script={
					[
						{"src": "/js/jquery.fitvids.js", "type": "text/javascript"},
						{
						"innerHTML": ` (function(d) {
							var config = {
							  kitId: 'bqv2awy',
							  scriptTimeout: 3000,
							  async: true
							},
							h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
						  })(document);`
						}
					]
				} />
			</div>
		);
	}
}

HeadTags.propTypes = {
	url: React.PropTypes.string,
	title: React.PropTypes.string,
	description: React.PropTypes.string,
	image: React.PropTypes.string,
};

module.exports = HeadTags;
export default HeadTags;
