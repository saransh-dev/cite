import Telescope from 'meteor/nova:lib';
import React from 'react';

const ArticlesPage = ({document, currentUser}) => {
  
  const article = document;
  const htmlBody = {__html: article.content};

  return (

		<div className="container txt-col--light">

			<div className="limited-width-small">
				<h2 className="page-title">Press</h2>

				<div className="article-page">

					<Telescope.components.ArticlesItem article={article}/>

				</div>

			</div>
		</div>
  )
};

ArticlesPage.displayName = "ArticlesPage";

module.exports = ArticlesPage;
export default ArticlesPage;