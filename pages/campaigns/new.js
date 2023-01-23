import React, {Component} from 'react';
import Layout from '../../components/Layout'
import { Button, Checkbox, Form, Input, Message } from 'semantic-ui-react'
import Marketplace from '../../ethereum/marketplace'
import web3 from '../../ethereum/web3'
import {Link, Router} from '../../routes'

class CampaignNew extends Component {

    state = {
        listingName:'',
        errorMessage:'',
        loading: false,
        listingPrice: ''
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading:true});
        this.setState({errorMessage:''});
        try {
            const accounts = await web3.eth.getAccounts();
            await Marketplace.methods
            .createListing(this.state.listingName, this.state.listingPrice)
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
    // to properly show the error on Message tag, we need to add error prop to our Form
    render() {
        return (
            <Layout>
                <h3> Create a Listing</h3> 
                {/*must add error element to Form tag */}
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label> Name </label>
                        <Input 
                            placeholder='Item name' 
                            label="Text" 
                            labelPosition='right' 
                            value={this.state.listingName}
                            onChange={event =>
                                this.setState({listingName: event.target.value})}
                        />
                        
                    </Form.Field>
                    <Form.Field>
                        <label> Price </label>
                        <Input 
                            placeholder='Price' 
                            label="Sepehr Coin" 
                            labelPosition='right' 
                            value={this.state.listingPrice}
                            onChange={event =>
                                this.setState({listingPrice: event.target.value})}
                        />
                        
                    </Form.Field>
                    
                    <Button type='submit' loading={this.state.loading} primary> Create Listing</Button> 
                    <Message error header="Oops!" content={this.state.errorMessage} />
                </Form>
            </Layout>
            
        );
    }
}

export default CampaignNew;
