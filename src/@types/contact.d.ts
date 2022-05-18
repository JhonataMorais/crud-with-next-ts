export interface ContactData {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface ContactListResponse {
    results: ContactData[],
    perPage: number,
    currentPage: number,
    count: number,
    totalPages: number
}

export interface ParamsGetContactList {
    page: number,
    perPage: number
}