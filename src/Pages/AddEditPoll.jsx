import React, {useEffect,useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addPoll,
    getSinglePoll,
    updatePollTitle,
    updatePoll,
} from "../slices/pollsSlice";
import {useLoaction,useNavigate,useParams,useparams} from "react-router-dom"



const AddEditPoll = () =>{
    const {id} = useParams();
    const{state} = useLoaction();
}