import axios from "axios";
import Router from "next/router"
import { HOST_API } from "../config/endpoints";
import { toast } from "react-toastify";
import { ContactData, ContactListResponse, ParamsGetContactList } from "../@types/contact";

const config = {
    headers: {
        Accept: "application/json"
    }
};

export async function fetchContacts(params: ParamsGetContactList) {
    try {
        const { data } = await axios.get<ContactListResponse>(`${HOST_API}/contacts`, {...config, params})
      
        return data
    } catch(error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response.data.message);
            return error.message;
        } else {
            const errorMessage = "An unexpected error occurred";
            toast.error(errorMessage);

            return errorMessage;
        }
    }
}

export async function createContact(payload: ContactData) {
    try {
        const { data } = await axios.post<ContactData>(`${HOST_API}/contacts`, payload, config)
        toast.success("Contact crated!");
        
        setTimeout(() => {
            Router.back();
        }, 5000);

        return data
    } catch(error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response.data.message);
            return error.message;
        } else {
            const errorMessage = "An unexpected error occurred";
            toast.error(errorMessage);

            return errorMessage;
        }
    }
}

export async function updateContact(payload: ContactData) {
    try {
        const { data } = await axios.put<ContactData>(`${HOST_API}/contacts/${payload.id}`, payload, config)
        toast.success("Contact updated!");
        
        setTimeout(() => {
            Router.back();
        }, 5000);
        
        return data
    } catch(error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response.data.message);
            return error.message;
        } else {
            const errorMessage = "An unexpected error occurred";
            toast.error(errorMessage);

            return errorMessage;
        }
    }
}

export async function getByIdContact(payload: string) {
    try {
        const { data } = await axios.get<ContactData>(`${HOST_API}/contacts/${payload}`, config)
      
        return data
    } catch(error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response.data.message);
            return error.message;
        } else {
            const errorMessage = "An unexpected error occurred";
            toast.error(errorMessage);

            return errorMessage;
        }
    }
}

export async function deleteContact(payload: string) {
    try {
        const { data } = await axios.delete<string>(`${HOST_API}/contacts/${payload}`, config)
      
        return data
    } catch(error) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response.data.message);
            return error.message;
        } else {
            const errorMessage = "An unexpected error occurred";
            toast.error(errorMessage);

            return errorMessage;
        }
    }
}
