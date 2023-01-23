import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';
export default () => {
    return (
        //An example of adding custom css to semantic-ui components
        <Menu style={{marginTop: '10px'}}>
            {/*on click redirects to root directory (homepage) */}
            <Link route="/">
                <a className="item">
                    SepehrMarket 
                </a>
            </Link>

            <Menu.Menu position="right">
            <Link route="/">
                <a className="item">
                    Listing
                </a>
            </Link>
            <Link route="/campaigns/new">
                <a className="item">
                    +
                </a>
            </Link>
            </Menu.Menu>

            
        </Menu>
    )
}