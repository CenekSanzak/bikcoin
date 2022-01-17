import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction } from "@usedapp/core"

import '../App.css';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useState} from "react";
import {verificationAddress, verificationAbi} from "../contracts.js"

const verificationInterface = new utils.Interface(verificationAbi)
const verificationContract = new Contract(verificationAddress, verificationInterface)

export default function Verify() {
    const [address, setAddress] = useState("")
    const { state, send } = useContractFunction(verificationContract, 'verify', {})
    const [mostRecentState, setMostRecentState] = useState(state)
    if(mostRecentState !== state){
        setMostRecentState(state)
    }
    console.log(state, mostRecentState, )
    return (
        <div>
            <Typography variant="h1" component="div" gutterBottom align={"center"}>
                Verify Address At State
            </Typography>
            <TextField style={{marginBottom: 15}} fullWidth label="Address" value={address} onChange={e=>setAddress(e.target.value)}/>
            <Button  variant="outlined" fullWidth onClick={_=>send(address)}>Verify</Button></div>);
}
