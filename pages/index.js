import React, {Component} from 'react';
import Marketplace from '../ethereum/marketplace';  // 1- Marketplace instance 
import {Card, Button, Table, Header} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/Layout';
import {Link} from '../routes';
import SepehrCoin from '../ethereum/sepehrCoin'

class Listings  extends Component {
    static async getInitialProps() {
        const listingCount = await Marketplace.methods.listingCount().call();
        // Fetch the listings

        let listings = [];
        for(var i = 1; i <= listingCount; i++) {
            let checkExist = await Marketplace.methods.checkListingExists(i).call();
            if (checkExist == true){
            const listing = await Marketplace.methods.getListing(i).call();
            listing[2] = i;
            listings.push(listing);
            }
        }
        return {listings}
    }
    
    //A function to render card groups dispaying campaigns:
    renderMarket(){
        const { listings } = this.props;
        return (
          <div >
            <Header as="h2" style={{marginTop: '20px'}}>Listings</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Price (SepehrCoin)</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {listings.map((listing, index) => (
                  <Table.Row key={listing[2]}>
                    <Table.Cell>
                        <Link route={`/campaigns/${listing[2]}`}>
                        {listing[0]}
                        </Link>
                    </Table.Cell>
                    <Table.Cell>{listing[1]}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        );
      }    
    render() {
        return (
            <Layout>
                <div>
                    
                    <Link route="/campaigns/new/">
                        <a>
                            <Button
                                content="Create Listing"
                                icon="add circle"
                                secondary
                                floated='right'
                            />
                        </a>
                    </Link>
                    {this.renderMarket()}
                </div>
                
            </Layout>
        );
    }

}

export default Listings ;