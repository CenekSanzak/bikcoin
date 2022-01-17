import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction, useContractCall } from "@usedapp/core"

import productProvenanceContract from '../contracts.js'
import '../App.css';
import logo from '../logo.svg'
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useState} from "react";
import {productProvenanceAddress, productProvenanceAbi} from "../contracts.js"
import OwnerCard from "./Components/OwnerCard";

const productProvenanceInterface = new utils.Interface(productProvenanceAbi)

export default function TraceOwners() {
    const [tokenId, setTokenId] = useState("")
    const [address, setAddress] = useState("")
    const [query, setQuery] = useState(false)
    const [queried, setQueried] = useState(false)
    const [ownerCount, setOwnerCount] = useState(0)
    const [ownerCountByTokenId] =
        useContractCall({
                abi: productProvenanceInterface,
                address: productProvenanceAddress,
                method: "getOwnerCountByTokenId", 
                args: [tokenId],
            }
        ) ?? [];

    if(query || (ownerCountByTokenId && ownerCount !== ownerCountByTokenId)){
        setQueried(true)
        setOwnerCount(ownerCountByTokenId)
        setQuery(false)
    }
    console.log(query, ownerCountByTokenId, Array(ownerCount&& ownerCount._isBigNumber ?ownerCount.toNumber():0))
    return (
        <div>
            <Typography variant="h2" component="div" gutterBottom align={"center"}>
                Get Owners By Token ID
            </Typography>
            <Typography variant="body1" component="div" gutterBottom align={"center"}>
                {(queried)&&(ownerCount>0?
                    (`Token with ID ${tokenId} has ${ownerCount} owners.`):
                    `Token with ID ${tokenId} does not exist.`)
                }
            </Typography>
            <TextField style={{marginBottom: 15}} fullWidth label="Address" value={tokenId} onChange={e=>setTokenId(e.target.value)||setQueried(false)}/>
            <Button  variant="outlined" fullWidth onClick={_=>setQuery(true)}>Query</Button>
            {queried&&
                Array(ownerCount&&ownerCount._isBigNumber ?ownerCount.toNumber():0).map(ownerId=><OwnerCard key={ownerId} ownerId={ownerId} tokenId={tokenId}/>)
            }
        </div>
    );
}
