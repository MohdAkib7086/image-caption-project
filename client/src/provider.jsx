import { useState } from "react";
import CustomerContext from "./context";

export default function CustomerProvider({ children }) {
    const [searchData,setSearchData] = useState({"Mobile":0,"Email":"","Policy_No":0})
    const resetSearchData = () =>{
        setSearchData({"mobileNumber":null,"email":null,"policyId":null})
    }
    const [customerData, setCustomerData] = useState([])
    const [geniAiChatBaseUrl, setGenAiChatBaseUrl] = useState("")
    const [searchCustomersData, setSearchCustomersData] = useState([])
    const [favoriteChats, serFavoriteChats] = useState(new Set())
    const [chatType, setChatType] = useState(
        {
            "id" : "QA",
            "label" : "Customer Q&A Agent",
            "desc" : "Ask queries for specific customers",
            "icon" : "Chat",
            "urlType" : "VITE_QA_AGENT",
            "responseType" : "TEXT"
        }
    )
    const [customerId, setCustomerId] = useState("")

    return (
        <CustomerContext.Provider value={{searchData,setSearchData,resetSearchData, customerData, setCustomerData,geniAiChatBaseUrl, setGenAiChatBaseUrl,searchCustomersData, setSearchCustomersData,
            favoriteChats, serFavoriteChats,chatType, setChatType,customerId, setCustomerId}}>{children}</CustomerContext.Provider>
    )
}