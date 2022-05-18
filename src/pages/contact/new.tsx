import type { NextPage } from "next";
import { ContactData } from "../../@types/contact";
import ContactForm from "../../components/ContactForm";

const NewContact: NextPage = () => {
  const defaultData: ContactData = {
    firstName: "",
    lastName: "",
    phone: "",
    email: ""
  };

  return <ContactForm data={defaultData} />
};

export default NewContact;
