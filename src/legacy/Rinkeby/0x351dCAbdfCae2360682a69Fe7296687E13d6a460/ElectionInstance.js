/* eslint-disable */


import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import Web3 from 'web3';
import './style.css';
import VoteButton from './customButton/VoteButton';
import clientRaindrop from '../../../services/contracts/clientRaindrop';
import abi from'./abi';
import FactoryAbi from './FactoryAbi';
import ElectionInstance from './ElectionInstance';
import { get } from 'jquery';
import VotingDapp from './VotingDapp';
import Registration from './Registration';
import VerificationPage from './VerificationPage';
import ChartPage from './ChartPage';
import ProfilePage from './ProfilePage';
import NewElection from './NewElection';

export default class ElectionFactory extends Component {


	constructor(props) {
		super(props)
			this.state = {
            electionFactory:'',
            electionABI:[],
            title:'',
            page:1,
            subPage:1,

            account:[],


            raindrop:'',
            maxCandidates:[],
            votes:[],
            userName:[],
            accounts:[],
            blockNumber:'',
            candidate:'',
            blocks:600000,

            loading:true,
            
        }
       // this.handleChangeCandidate = this.handleChangeCandidate.bind(this)
	}


	componentDidMount(){
	  this._isMounted = true;
      this.loadBlockchain();
	}

    async loadBlockchain(){
        console.log("Checksss",this.props.Address)
    
        const ApiKey='ZPRBBU2E6Z4QMEXPI7BWMCMVK7I6XZ6ZXE';
            fetch('https://api-rinkeby.etherscan.io/api?module=contract&action=getsourcecode&address='+this.props.Address+'&apikey='+ApiKey)
            .then(res =>res.json())
            .then((data)=> { 
               
                    this.setState({electionABI:JSON.parse(data.result[0].ABI)},()=> console.log("ABI",this.state.electionABI))
                }).catch(console.log)
            
            
            const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));  
            const network = await web3.eth.net.getNetworkType();

            const accounts = await web3.eth.getAccounts();
       
             if (this._isMounted){
            this.setState({account: accounts[0]}); 
             }

            const electionContract = new web3.eth.Contract(this.state.electionABI,this.props.Address);
            if (this._isMounted){
                this.setState({electionContract:electionContract},()=>console.log("check",electionContract));
            }
            const title = await electionContract.methods.snowflakeName().call()
            if (this._isMounted){
                this.setState({title:title});
            }
           


        }
 

  render() {    
   
    
        let subBody = <Registration electionABI={this.state.electionABI} electionAddress={this.props.Address} ein={this.props.ein} account={this.state.account}/>
        if(this.props.subPage === 1){
            subBody = <Registration electionABI={this.state.electionABI} electionAddress={this.props.Address} ein={this.props.ein} account={this.state.account}/>
        }
        else if(this.props.subPage === 2){
            subBody = <VerificationPage electionABI={this.state.electionABI} electionAddress={this.props.Address} ein={this.props.ein} account={this.state.account}/>
        }

        else if(this.props.subPage === 3){
            subBody = <ChartPage electionABI={this.state.electionABI} electionAddress={this.props.Address} ein={this.props.ein} account={this.state.account}/>
        }

        else if(this.props.subPage === 4){
            subBody = <ProfilePage electionABI={this.state.electionABI} electionAddress={this.props.Address} ein={this.props.ein} account={this.state.account} goToVoting={this.subPageVoting}/>
        }
  

    return (
        
        <div>

            <div>
               {subBody}            
            </div>
            </div>
		);
	}
}
