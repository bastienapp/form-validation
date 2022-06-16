/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Your password must be a minimum of eight characters and include at least one uppercase letter, one lowercase letter, one number and one special character."
      )
      .required(),
    firstName: yup
      .string()
      .matches(/^([^0-9]*)$/)
      .required(),
    lastName: yup
      .string()
      .matches(/^([^0-9]*)$/)
      .required(),
    phone: yup
      .string()
      .matches(
        /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/,
        "The phone number must be in a valid format"
      )
      .required(),
  })
  .required();

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "tacso@test.fr",
      password: "Tacos!1234",
      firstName: "Michel",
      lastName: "Durand",
      phone: "+33623875644",
    },
  });

  const onSubmit = async (data) => {
    console.warn(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>
      <label htmlFor="email">
        Email:&nbsp;
        <input id="email" type="email" {...register("email")} />
      </label>
      {errors.email && <p role="alert">{errors.email.message}</p>}
      <br />

      <label htmlFor="password">
        Password:&nbsp;
        <input id="password" type="password" {...register("password")} />
      </label>
      {errors.password && <p role="alert">{errors.password.message}</p>}
      <br />

      <label htmlFor="firstName">
        First name:&nbsp;
        <input id="firstName" type="text" {...register("firstName")} />
      </label>
      {errors.firstName && <p role="alert">{errors.firstName.message}</p>}
      <br />

      <label htmlFor="lastName">
        Last name:&nbsp;
        <input id="lastName" type="text" {...register("lastName")} />
      </label>
      {errors.lastName && <p role="alert">{errors.lastName.message}</p>}
      <br />

      <label htmlFor="phone">
        Phone:&nbsp;
        <input id="phone" type="text" {...register("phone")} />
      </label>
      {errors.phone && <p role="alert">{errors.phone.message}</p>}
      <br />

      <input type="submit" value="Register" />
    </form>
  );
}

export default Register;
