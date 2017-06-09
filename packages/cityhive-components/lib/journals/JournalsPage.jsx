import Telescope from 'meteor/nova:lib';
import React from 'react';

const JournalsPage = ({document, currentUser}) => {
  
  const journal = document;
  const htmlBody = {__html: journal.content};

  return (

		<div className="container txt-col--light">

			<div className="limited-width-small">
				<h2 className="page-title">Press</h2>

				<div className="journal-page">

					<Telescope.components.JournalsItem journal={journal}/>

				</div>

			</div>
		</div>
  )
};

JournalsPage.displayName = "JournalsPage";

module.exports = JournalsPage;
export default JournalsPage;