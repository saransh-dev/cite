import Telescope from 'meteor/nova:lib';
import React from 'react';
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Pages from "meteor/cityhive:pages";
import PageIndexComposer from './PageIndexComposer';
import PageNotFound from './PageNotFound';

const PageIndex = (props, context) => {

    return (
        <div>
            {
                props.ready ?
                    <div>
                        {props.page ?
                            <DocumentContainer
                                collection={Pages}
                                publication="pages.single"
                                selector={{slug: props.params.splat}}
                                terms={props.params}
                                joins={Pages.getJoins()}
                                component={Telescope.components.Page}
                            />
                            : <PageNotFound/>
                        }
                    </div>
                : <p>Loading</p>
            }
        </div>
    )
};

Pages.displayName = "PageIndex";

module.exports = PageIndexComposer(PageIndex);
export default PageIndexComposer(PageIndex);