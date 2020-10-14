/* eslint-disable */

import React, { useState,useEffect } from 'react';

import Button from '@material-ui/core/Button';
import { TextField, Typography} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';

import ABI from './abi';
import './style.css';
import Votingregistration from './Images/Votingregistration.png';
import Web3 from 'web3';

import { useGenericContract, useNamedContract,useAccountEffect } from '../../common/hooks';
import TransactionButton from '../../common/TransactionButton';
import CustomButton from './customButton/CustomButton';
import { useWeb3Context } from 'web3-react';
import { number } from 'prop-types';
import ChartPage from './ChartPage';
import TransactionButton2 from './customButton/TransactionButton2';
import ProfilePage from './ProfilePage';
import ElectionFactory from './ElectionFactory';
import Identicon from '../../../components/identicon';
import snowflake from '../../../services/contracts/snowflake';
import {rinkeby1484_ABI, rinkeby1484_Address} from './config';





// import ShowCampaignStats from './ShowCampaignStats';


let Vote = []
let m = '';



export default function Registration({ ein,electionABI, electionAddress,account}) {

  
  const context = useWeb3Context();
  const [title, getTitle] = useState('');
  const [candidate, isCandidate]  = useState('')
  const [voter, isVoter]  = useState('');
  const [number, Votes]  = useState(['50']);


  const clientRaindropContract = useNamedContract('clientRaindrop')
  const operatorAddress = '0x7Df28F6007f09f30f0dF0457d54eF950baB0De5D';
  const resolverContract = useGenericContract(electionAddress, electionABI);
  const snowFlake = useGenericContract(rinkeby1484_Address, rinkeby1484_ABI);
  const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));  


  const [page, setPage]  = useState(1)

  useAccountEffect(() => {
    //resolverContract.methods.snowflakeName().call().then(Title=> getTitle(Title));
  //  resolverContract.methods.aCandidate(ein).call().then(candidate => isCandidate(candidate));
  //  resolverContract.methods.aParticipant(ein).call().then(voter => isVoter(voter));
    
   // resolverContract.methods.vote('2265').call().then(status => setCurrentStatus(status));
  //x = totalCandidates.length
    //resolverContract.methods.candidates('2265').call().then(Candidates => getTotalCandidates(Candidates))
    
  })

  

  return (
    <div>
      {title}
      <div className="registrationWrapper"> <div className ="registerAsVoter" style ={{textAlign:"center"}}>
      <p>Disclaimer</p>
      <p>If you'd like to participate in voting your favourite candidate, you must first register as a voter.
      </p>
      <div className="registrationImage"><img src={require('./Images/Votingregistration.png')} alt="snow" className="registrationImg"/></div>
      
      <TransactionButton
         readyText='Register As Voter' 
         method={() => snowFlake.methods.addResolver(electionAddress,true,web3.utils.toWei('5000000000000000000000'),0x00)}           
          />
     
       
    </div>

<div className ="registerAsVoter" style ={{textAlign:"center"}}> 
<p>Disclaimer</p>
<p>You can register as a candidate if you think you are qualified to lead or take a position for an organization.
</p>
<div className="registrationImage"><img src={require('./Images/candidatesImage.png')} alt="snow" className="registrationImg"/></div>

<TransactionButton 
      readyText='Register As Candidate' 
      variant= "outlined" 
      color="primary" 
      className="registrationButton"   
      method={() => resolverContract.methods.becomeCandidate(ein)}/>
 
</div>
</div>
          
      

     
          

          
      
    </div>
  );
}