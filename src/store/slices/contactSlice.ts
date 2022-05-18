import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState, AppThunk } from "../index";
import {
  createContact,
  updateContact,
  fetchContacts,
  deleteContact,
  getByIdContact,
} from "../../services/contacts";
import {
  ContactListResponse,
  ContactData,
  ParamsGetContactList,
} from "../../@types/contact";

export interface contactState {
  perPage: number;
  page: number;
  contactList: ContactListResponse[];
  current: any;
  deleted: boolean;
}

const initialState: contactState = {
  perPage: 10,
  page: 1,
  current: {},
  deleted: false,
  contactList: [],
};

export const fetchAsync = createAsyncThunk(
  "@@contact/fetchContacts",
  async (params: ParamsGetContactList) => {
    const response = await fetchContacts(params);

    return response;
  }
);

export const createAsync = createAsyncThunk(
  "@@contact/createContact",
  async (payload: ContactData) => {
    const response = await createContact(payload);

    return response;
  }
);

export const updateAsync = createAsyncThunk(
  "@@contact/updateContact",
  async (payload: ContactData) => {
    const response = await updateContact(payload);

    return response;
  }
);

export const deleteAsync = createAsyncThunk(
  "@@contact/deleteContact",
  async (payload: string) => {
    const response = await deleteContact(payload);

    return response;
  }
);

export const getByIdAsync = createAsyncThunk(
  "@@contact/getById",
  async (payload: string) => {
    const response = await getByIdContact(payload);

    return response;
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.contactList = action.payload;
      })
      .addCase(getByIdAsync.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(deleteAsync.pending, (state) => {
        state.deleted = false;
      })
      .addCase(deleteAsync.fulfilled, (state) => {
        state.deleted = true;
      });
  },
});

export const { setPerPage, setPage } = contactSlice.actions;

export const contactList = (state: AppState) => state.contact.contactList;
export const page = (state: AppState) => state.contact.page;
export const perPage = (state: AppState) => state.contact.perPage;
export const currentContact = (state: AppState) => state.contact.current;
export const deleted = (state: AppState) => state.contact.deleted;

export default contactSlice.reducer;
