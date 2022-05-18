import type { NextPage } from "next";
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { ContactData } from "../../@types/contact";
import ContactForm from "../../components/ContactForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { currentContact, getByIdAsync } from "../../store/slices/contactSlice";

const NewContact: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const data = useAppSelector(currentContact);

  useEffect(() => {
    if (router.query.id) {
      dispatch(getByIdAsync(router.query.id));
    }
  }, []);

  return <ContactForm data={data} />
};

export default NewContact;
