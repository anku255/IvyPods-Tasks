import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";

const Page = ({ children }) => children;

const Wizard = props => {
  // state
  const [values, setValues] = useState(props.initialValues);
  const [page, setPage] = useState(0);

  // handlers
  const goToPrevPage = values => {
    setPage(Math.max(page - 1, 0));
    setValues(values);
  };

  const goToNextPage = values => {
    setPage(Math.min(page + 1, props.children.length - 1));
    // TODO: Remove it and check
    setValues(values);
  };

  const validate = values => {
    const activePage = React.Children.toArray(props.children)[page];

    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  const handleSubmit = (values, bag) => {
    const { children, onSubmit } = props;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      bag.setSubmitting(false);
      goToNextPage(values);
    }
  };

  const { children } = props;
  const activePage = React.Children.toArray(children)[page];
  const isLastPage = page === React.Children.count(children) - 1;
  return (
    <div>
      <div className="container">
        <div className="flex justify-around items-center px-4 py-2 mb-4 border border-gray-200">
          <div
            className={` ${page === 0 &&
              "border-b border-blue-500 font-semibold"}`}
          >
            STEP 1
          </div>
          <div
            className={` ${page === 1 &&
              "border-b border-blue-500 font-semibold"}`}
          >
            STEP 2
          </div>
        </div>
      </div>
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
            <div className="flex justify-between items-center">
              {page > 0 && (
                <button
                  type="button"
                  className="focus:outline-none bg-grey-500 hover:bg-grey-700 border border-grey-dark px-6 py-2 rounded"
                  onClick={goToPrevPage}
                >
                  « Previous
                </button>
              )}

              {!isLastPage && (
                <button
                  type="submit"
                  className="focus:outline-none bg-teal-500 hover:bg-teal-700 text-white border border-teal-dark px-6 py-2 rounded"
                >
                  Next »
                </button>
              )}
              {isLastPage && (
                <button
                  type="submit"
                  className="focus:outline-none bg-teal-500 hover:bg-teal-700 text-white border border-teal-dark px-6 py-2 rounded"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

Wizard.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};

Wizard.defaultProps = {
  initialValues: {}
};

Wizard.Page = Page;

export default Wizard;
