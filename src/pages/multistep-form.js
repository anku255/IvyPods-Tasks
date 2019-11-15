import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";

import Layout from "../components/layout";
import Wizard from "../components/wizard";

const required = value => (value ? undefined : "Required!");

const validatePageTwo = values => {
  const errors = {};
  const { password, confirmPassword } = values;
  if (!password) {
    errors.password = "Required";
  }
  if (!confirmPassword) {
    errors.confirmPassword = "Required";
  }
  if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords don't match!";
  }
  return errors;
};

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
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal"
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
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal"
      />
      <ErrorMessage name="email" component="div" className="text-red-500" />
    </div>
  </Wizard.Page>
);

const PageTwo = () => (
  <Wizard.Page>
    <div className="mb-4">
      <label className="block mb-1 text-semibold">Password</label>
      <Field
        name="password"
        component="input"
        type="password"
        placeholder="Password"
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normall"
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
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normall"
      />
      <ErrorMessage
        name="confirmPassword"
        component="div"
        className="text-red-500"
      />
    </div>
  </Wizard.Page>
);

const FinalPage = ({ values }) => (
  <div>
    <div className="flex items-center pb-2 mb-2">
      <div className="text-lg font-semibold mr-2">Name: </div>
      <div>{values.name}</div>
    </div>
    <div className="flex items-center pb-2 mb-2">
      <div className="text-lg font-semibold mr-2">Email: </div>
      <div>{values.email}</div>
    </div>
    <div className="flex items-center pb-2 mb-2">
      <div className="text-lg font-semibold mr-2">Password: </div>
      <div>{values.password}</div>
    </div>
  </div>
);

const MultiStepForm = () => {
  const [formValues, setFormValues] = useState({});

  const [submitted, setSubmitted] = useState(false);
  return (
    <Layout>
      <div className="container mx-auto max-w-2xl bg-white px-8 py-4 shadow">
        <h1 className="text-2xl mb-4">Multi Step Form</h1>
        {!submitted ? (
          <Wizard
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: ""
            }}
            onSubmit={(values, actions) => {
              setFormValues(values);
              setSubmitted(true);
            }}
          >
            <PageOne />
            <PageTwo validate={validatePageTwo} />
          </Wizard>
        ) : (
          <FinalPage values={formValues} />
        )}
      </div>
    </Layout>
  );
};

export default MultiStepForm;
