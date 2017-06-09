import Options from "meteor/cityhive:admin-options";
import { createContainer } from 'meteor/react-meteor-data';
import PageHomepage from './PageHomepage.jsx';

const PageHomepageContainer = createContainer(({ params }) => {
  const todosHandle = Meteor.subscribe('options.list');
  const loading = !todosHandle.ready();
  const option = Options.findOne({optionName: 'homepage'});
  const optionExists = !loading && !!option;
  return {
    loading,
    option,
    optionExists,
    homepage: optionExists ? option.optionValue : [],
  };
}, PageHomepage);

PageHomepageContainer.displayName = "PageHomepageContainer";

module.exports = PageHomepageContainer;
export default PageHomepageContainer;