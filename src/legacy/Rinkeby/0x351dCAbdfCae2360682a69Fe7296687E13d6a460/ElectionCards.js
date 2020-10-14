/* eslint-disable */


import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import Web3 from 'web3';
import './style.css';


import Deadline from './Deadline';
import Registration from './Registration';
import VerificationPage from './VerificationPage';
import ChartPage from './ChartPage';
import ProfilePage from './ProfilePage';
import NewElection from './NewElection';

export default class ElectionCards extends Component {


	constructor(props) {
		super(props)
			this.state = {
            electionFactory:'',
            electionABI:[],
            title:'',
            deadline:'',
            unixTime:'',
            numCandidates:[],
            maxCandidates:[],
            
            page:1,
            subPage:1,

            account:[],


            raindrop:'',
            
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
                
            console.log("Checksss",this.state.electionABI);
    
            const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));  
            const network = await web3.eth.net.getNetworkType();

            const accounts = await web3.eth.getAccounts();
       
             if (this._isMounted){
            this.setState({account: accounts[0]}); 
             }

            const electionContract = new web3.eth.Contract(this.state.electionABI,this.props.Address);
            if (this._isMounted){
                this.setState({electionContract:electionContract},()=>console.log());
            }
            const title = await electionContract.methods.snowflakeName().call()
            if (this._isMounted){
                this.setState({title:title},()=>console.log(title));
            }

            const deadline = await electionContract.methods.getDeadline().call()
            if (this._isMounted){
                this.setState({unixTime:deadline.slice(0,10),
                    deadline:new Date(parseInt(deadline.slice(0,10),10)*1000)});
            }

            const candidates = await electionContract.methods.getMaxCandidates().call()
            if (this._isMounted){
                this.setState({numCandidates:candidates[0].length,maxCandidates:candidates});
            }
           

        }

       


  render() {
    

    return (
        
        <div className="electionCard">
            <h3 className="card-header small">
            <strong>
            {this.state.title} 
            </strong>
            </h3>
            <div className="card-list">
					
					<ul className="list-group list-group-flush">
						<Deadline deadline={this.state.deadline} unixTime={this.state.unixTime}/>
						
					</ul>
                    
					
		
					</div>          
        
            </div>
		);
	}
}
