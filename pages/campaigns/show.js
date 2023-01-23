//This file takes care of showing info about each campaig

import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Marketplace from '../../ethereum/marketplace';
import SepehrCoin from '../../ethereum/sepehrCoin';
import {Card, Button, Grid} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import {Link} from '../../routes';
import web3 from '../../ethereum/web3';
//import ContributeForm from '../../components/ContributeForm';


class CampaignShow extends Component {
    static async getInitialProps(props) {
        //const campaign = Ma(props.query.address);
        const summary = await Marketplace.methods.listings(props.query.address).call();
        console.log(summary);
        return {
            name: summary[0],
            adSeller: summary[1],
            adBuyer: summary[2],
            price: summary[3],
            soldStatus: summary[4],
            //props.query.address comes from routes.js
            address: props.query.address
        };
    }
    state = {     
      errorMessage:'',
      loading: false,
      loadingApprove: false,
      loadingRemove: false,
      errorMessageRemove:'',
      errorMessageApprove:''
    };

    onSubmit = async (event) => {
      event.preventDefault();
      this.setState({loading:true});
      this.setState({errorMessage:''});
      try {
          const accounts = await web3.eth.getAccounts();
          await Marketplace.methods
          .purchaseListing(this.props.address)
          .send({
              from: accounts[0]
          });
          //To redirect web page to home page
          Router.pushRoute('/');
      } catch (err) {
          this.setState({errorMessage: err.message});
      }
      this.setState({loading:false})
    }

    removeListing = async (event) => {
      event.preventDefault();
      this.setState({loadingRemove:true});
      this.setState({errorMessageRemove:''});
      try {
          const accounts = await web3.eth.getAccounts();
          await Marketplace.methods
          .removeListing(this.props.address)
          .send({
              from: accounts[0]
          });
          //To redirect web page to home page
          Router.pushRoute('/');
      } catch (err) {
          this.setState({errorMessage: err.message});
      }
      this.setState({loading:false})
    }
    approveTransaction = async (event) => {
      event.preventDefault();
      this.setState({loadingApprove:true});
      this.setState({errorMessageApprove:''});
      try {
        const accounts = await web3.eth.getAccounts();
        const marketAddress = await Marketplace.methods.contractAddress().call();
        await SepehrCoin.methods
        .approve(marketAddress,this.props.price)
        .send({
            from: accounts[0]
        });
        //To redirect web page to home page
        Router.pushRoute('/');
        } catch (err) {
            this.setState({errorMessageApprove: err.message});
        }
        this.setState({loadingApprove:false})
      }

    renderCards(){
        const items = [
          {
            header: this.props.name,
            description:'Listing name',
            meta: 'Item',
          },  
          {
            header: this.props.price,
            description:'Price',
            meta: 'Listing price',
            style: {overflowWrap:'break-word'}
          },
           
            {
              header: this.props.adSeller,
              description:
                'Seller Address',
              meta: '',
              style: {overflowWrap:'break-word'}
            },
            {
                header: this.props.adBuyer,
                description:
                  'Buyer address',
                meta: '',
                style: {overflowWrap:'break-word'}
              },
              
              
          ]
          return <Card.Group items={items} />;
    }
    render() {
        return(
        <Layout>
            <div class="ui warning message">
            <i class="close icon"></i>
            <div class="header">
              You must approve the transaction before you can purchase the listing.
            </div>
              The contract needs premission to access your Sepehr Coin holdings and process a secure transaction.
              This allowance is only for the amount to cover the listing's price.
            </div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={12}>
                        {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column width={4} style={{display: "flex", flexDirection: "column"}}>
                        
                      <Button style={{marginBottom: "10px"}} onClick={this.approveTransaction}loading={this.state.loadingApprove} primary> Approve Transaction</Button>      
                      <Button style={{marginBottom: "10px"}} onClick={this.onSubmit} loading={this.state.loading} primary> Buy </Button> 
                      <Button onClick={this.removeListing}loading={this.state.loadingRemove} secondary> Remove listing</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    
                </Grid.Row>
            </Grid>
        </Layout>
        );
    }
}

export default CampaignShow;