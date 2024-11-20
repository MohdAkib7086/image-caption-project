import * as moment from 'moment';
import { setLoaderStatus } from './common';

// filter data based on search params
const handleFilterData = (SearchData, searchParams) => {
    const data = []
    SearchData.forEach((item) => {
        let flag = false;
        let count = 0;
        searchParams.map((ind) => {
            if (!count && Object.keys(item).includes(ind["key"])) {
                let index = Object.keys(item).indexOf(String(ind["key"]))
                if (String(ind["value"]) == String(item[Object.keys(item)[index]])) {
                    flag = true;
                }
                else {
                    flag = false;
                    count = count + 1;
                }
            }
        })
        if (flag) {
            data.push(item)
        }
    })
    return data;
}

// call api to get selected customer details
const customerDataApiCall = async () => {
    setLoaderStatus({ loader: true })
    try {
        console.log(import.meta.env.VITE_FETCH_CUSTOMER_DETAILS_API,"gggggg")
        const response = await fetch(import.meta.env.VITE_FETCH_CUSTOMER_DETAILS_API)
        setLoaderStatus({ loader: false })
        const data = await response.json()
        return data.data
    } catch (error) {
        setLoaderStatus({ loader: false })
    }
}

// calculate age from dob
const calculateAge = (dob) => {
    // let date = new Date(dob);
    // let age = moment().diff(date, 'years', false);
    return Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e+10);

}

const searchCustomers = async (payload) => {
    setLoaderStatus({ loader: true })
    try {
        console.log("payload", import.meta.env.VITE_SEARCH_CUSTOMER_API, payload)
        const response = await fetch(import.meta.env.VITE_SEARCH_CUSTOMER_API, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        setLoaderStatus({ loader: false })
        const data = await response.json()
        return data?.response
        //return data
    } catch (error) {
        setLoaderStatus({ loader: false })
        console.log("error", error)
    }
}

const genAiChats = async (item, payload, selectedOption) => {
    try {
        setLoaderStatus({ loader: true })
        let url
        if (selectedOption && selectedOption == "option1") {
            url = import.meta.env["VITE_QA_AGENT_NOVICE"]
        }
        else if (selectedOption && selectedOption == "option2") {
            url = import.meta.env["VITE_QA_AGENT_INTERMEDIATE"]
        }
        else if (selectedOption && selectedOption == "option3") {
            url = import.meta.env["VITE_QA_AGENT_EXPERIENCED"]
        }
        else{
            url=import.meta.env[item?.urlType]
        }
        // console.log("payload", import.meta.env[item?.urlType], payload, item.id)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        setLoaderStatus({ loader: false })
        const data = await response.json()
        if(item.id=="CHOICE_PREDICT"){
            return data; //const text=setQuestionaire(data)
        }
        else if (item.id == "MARKETING") {
            return data.body
        }
        else if (item.id == "QA") {
            return data.response;
        }
        else if (item.id == "COMMUNICATION") {
            return data.body;
        }
        else if (item.id == "TARGET") {
            return data.body;
        }
        else if (item.id == "IMAGE_PICKER") {
            return data;
        }
        else if (item.id == "cmpManage") {
            return data;
        }
        else if (item.id == "AGENT_ASSISTANT") {
            return data.response;
        }
        else if (item.id == "imgGeneration") {
            return data;
        }

    } catch (error) {
        setLoaderStatus({ loader: false })
        return Promise.reject({ error: true })
    }
}

const payloadGeneration = (data, request) => {
    const payload = {}
    if(data.id=="CHOICE_PREDICT"){
        payload["question"]=request;
    }
    else if (data.id == "MARKETING") {
        payload["query"] = request
    }
    else if (data.id == "QA") {
        payload["question"] = request
        // payload["query"] = request
    }
    else if (data.id == "COMMUNICATION") {
        payload["idea"] = request
    }
    else if (data.id == "TARGET") {
        payload["idea"] = request
    }
    else if (data.id == "IMAGE_PICKER") {
        // payload["profile"] = request
        payload["prompt"] = request
        payload["style_preset"] = "photographic"
    }
    else if (data.id == "AGENT_ASSISTANT") {
        // payload["query"] = request;
        payload["question"] = request;
    }
    else if (data.id == "cmpManage") {
        payload["prompt"] = request;
    }
    else if (data.id == "imgGeneration") {
        payload["prompt"] = request;
    }

    return payload
}

const getUniqueSectionType = (data, item) => {
    if (["PREMIUM"].includes(item)) {
        return data?.policyNumber
    }
    else if (["POLICY"].includes(item)) {
        return data?.policyNumber
    }
    else if (["CLAIM"].includes(item)) {
        return data?.claimId
    }
    else {
        return item
    }
}

const getCustomerData = async (payload) => {
    try {
        setLoaderStatus({ loader: true })
        console.log("payload", payload)
        const response = await fetch(import.meta.env.VITE_FETCH_CUSTOMER_DETAILS_API, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        setLoaderStatus({ loader: false })
        const data = await response.json()
        return data.data
        //return data
    } catch (error) {
        setLoaderStatus({ loader: false })
    }
}

// Set Loader Data
const setLoaderData = (data) => {
    console.log(data)
    setLoaderStatus(data)
}

export {
    handleFilterData,
    customerDataApiCall,
    calculateAge,
    searchCustomers,
    getUniqueSectionType,
    genAiChats,
    payloadGeneration,
    getCustomerData
}
