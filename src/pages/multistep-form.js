import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";

import Layout from "../components/layout";
import Wizard from "../components/wizard";

const required = value => (value ? undefined : "Required!");

const PageOne = () => (
  <Wizard.Page>
    <div className="mb-4">
      <label className="block mb-1 text-semibold">Name</label>
      <Field
        name="name"
        component="input"
        type="text"
        placeholder="Name"
        validate={required}
        className="input border bg-white px-3 py-2 w-full"
      />
      <ErrorMessage name="name" component="div" className="text-red-500" />
    </div>
    <div className="mb-4">
      <label className="block mb-1 text-semibold">Email</label>
      <Field
        name="email"
        component="input"
        type="email"
        placeholder="Email"
        validate={required}
        className="input border bg-white px-3 py-2 w-full"
      />
      <ErrorMessage name="email" component="div" className="text-red-500" />
    </div>
  </Wizard.Page>
);

const PageTwo = () => (
  <Wizard.Page
    validate={values => {
      const errors = {};
      if (!values.password) {
        errors.password = "Required";
      }
      // TODO: Update validations
      if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
      }
      return errors;
    }}
  >
    <div className="mb-4">
      <label className="block mb-1 text-semibold">Password</label>
      <Field
        name="password"
        component="input"
        type="password"
        placeholder="Password"
        className="input border bg-white px-3 py-2 w-full"
      />
      <ErrorMessage name="password" component="div" className="text-red-500" />
    </div>
    <div className="mb-4">
      <label className="block mb-1 text-semibold">Confirm Password</label>
      <Field
        name="confirmPassword"
        component="input"
        type="confirmPassword"
        placeholder="Confirm Password"
        className="input border bg-white px-3 py-2 w-full"
      />
      <ErrorMessage
        name="confirmPassword"
        component="div"
        className="field-error"
      />
    </div>
  </Wizard.Page>
);

const MultiStepForm = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl text-bold mb-4">Multi Step Form</h1>

        <Wizard
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
          }}
          onSubmit={(values, actions) => {
            // stuff
          }}
        >
          <PageOne />
          <PageTwo />
        </Wizard>
      </div>
    </Layout>
  );
};

export default MultiStepForm;
