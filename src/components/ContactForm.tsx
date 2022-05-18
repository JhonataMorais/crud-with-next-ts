import { useEffect } from "react";
import Link from "next/link";
import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { ContactData } from "../@types/contact";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAppDispatch } from "../hooks/redux"
import { createAsync, updateAsync } from "../store/slices/contactSlice";

export type ContactFormProps = {
  data: ContactData
};

const ContactForm = ({ data }: ContactFormProps) => {
  const dispatch = useAppDispatch();

  const isEdit = !!data?.id;

  const onSubmit = (values: ContactData) => {
    if(!isEdit) {
      dispatch(createAsync(values))
    } else {
      dispatch(updateAsync({...values, id: data.id}))
    }
  };


  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required"),
    lastName: Yup.string()
      .required("Last Name is required"),
    phone: Yup.string()
      .max(10, "Must be less than 11 characters")
      .required("Phone is required"),
    email: Yup.string()
      .email("Email is invalid")
      .required("Email is required"),
  })

  const { handleSubmit, register, setValue } = useForm<ContactData>({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    if(data.id) {
      const fields = ["firstName", "lastName", "phone", "email"];
      fields.forEach(field => setValue(field, data[field]));
    }
  }, [data]);

  return (
    <Grid container justifyContent="center">
      <Typography variant="h1" align="center">
        Contact info
      </Typography>

      <Grid item sm={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item sm={8} sx={{ margin: "2rem auto" }}>
                <TextField
                    id="firstName"
                    type="text"
                    sx={{width: "50%", padding: "10px"}}
                    placeholder="First Name"
                    {...register("firstName")}
                />
                <TextField
                    id="lastName"
                    type="text"
                    sx={{width: "50%", padding: "10px"}}
                    placeholder="Last Name"
                    {...register("lastName")}
                />
                <TextField
                    id="email"
                    type="email"
                    sx={{width: "50%", padding: "10px"}}
                    placeholder="email@youremail.com"
                    {...register("email")}
                />
                <TextField
                    id="phone"
                    type="text"
                    sx={{width: "50%", padding: "10px"}}
                    placeholder="+9 9999 9999"
                    {...register("phone")}
                />

                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                  <Link href="/">
                    <Button color="inherit" variant="contained" type="button" sx={{ marginRight: 1 }}>return</Button>
                  </Link>
                  <Button color="success" variant="contained" type="submit">Send</Button>
                </Box>
            </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ContactForm;
