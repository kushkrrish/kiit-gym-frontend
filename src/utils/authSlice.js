import { createSlice } from "@reduxjs/toolkit";


const authSlice=createSlice({
    name:"auth",
    initialState:{
        
        token:null,
        email: localStorage.getItem("email") || "",
        isAuthenticated:false,
    },
    reducers:{
        login:(state,action)=>{
            
            state.token=action.payload.token
            state.email=action.payload.email
            state.isAuthenticated = true
            localStorage.setItem("email", action.payload.email);

        },
        signup:(state,action)=>{
            state.email=action.payload.email
            state.token=action.token
            state.isAuthenticated=true
        },
        logout:(state)=>{
           
            state.token=null
            state.isAuthenticated=false
            state.email=null
            localStorage.removeItem("email");
            
        }
        
    }
});
export const {login,signup,logout}=authSlice.actions;
export default authSlice.reducer