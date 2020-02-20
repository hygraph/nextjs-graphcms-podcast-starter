import React, { useContext, useState, useEffect } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { NewsletterContext } from "../context/NewsletterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationTriangle,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

const Newsletter = () => {
  const { subscriberBoxOpen, toggleSubscriberBox } = useContext(
    NewsletterContext
  );
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { register, handleSubmit, errors, setValue, formState } = useForm({
    mode: "onBlur"
  });
  const [agreedTOC, toggleTOC] = useState(false);

  const handleClick = e => {
    e.stopPropagation();
    toggleSubscriberBox(false);
  };

  const handleTOC = () => {
    toggleTOC(state => (state ? false : true));
    setValue("subscriber", agreedTOC ? false : true, true);
  };

  const onSubmit = async values => {
    setIsError(false);
    setIsLoading(true);

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify(values)
    };

    const result = await fetch("/api/submit", options);

    if (result.status === 201) {
      const data = await result.json();
      setResponse(data);
      setIsLoading(false);
    } else {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 ${
        subscriberBoxOpen ? "w-screen h-screen" : ""
      }`}
      style={{ background: subscriberBoxOpen ? "rgba(0, 0, 0, 0.5)" : "none" }}
    >
      <div
        className={`fixed top-0 z-50 w-11/12 px-4 py-8 transform rounded-lg shadow-xl lg:w-half -translate-x-half left-1/2 ${
          subscriberBoxOpen ? "top-1/2 -translate-y-half" : " -translate-y-full"
        } main-gradient animate`}
      >
        <div className="relative flex flex-col items-start w-full h-full text-gray-100">
          <button
            onClick={handleClick}
            className="absolute top-0 right-0 text-inherit"
          >
            Close
          </button>
          {response ? (
            <div>
              <p className="text-5xl text-gray-100 font-display">
                Thanks{response && " " + response.upsertPeople.fullName}!
              </p>
              <p className="text-lg text-darkgray-800">
                Please check your email for a confirmation link.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
              <div className="flex flex-wrap mb-6">
                <div className="w-full pr-4 md:w-1/2">
                  <label
                    className="block mb-2 text-lg font-bold text-darkgray-900"
                    htmlFor="Full Name"
                  >
                    Full Name
                  </label>
                  <input
                    className="w-full px-6 py-4 mb-2 rounded-md bg-darkgray-800"
                    type="text"
                    placeholder="Full Name"
                    name="fullName"
                    ref={register({ required: true, maxLength: 80 })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="fullName"
                    message="This is required"
                  >
                    {({ message }) => (
                      <p className="text-darkgray-900">{message}</p>
                    )}
                  </ErrorMessage>
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    className="block mb-2 text-lg font-bold text-darkgray-900"
                    htmlFor="Email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-6 py-4 mb-2 rounded-md bg-darkgray-800"
                    type="text"
                    placeholder="Email"
                    name="email"
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    message="This is required"
                  >
                    {({ message }) => (
                      <p className="text-darkgray-900">{message}</p>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 mr-4 text-lg font-bold text-darkgray-900"
                  htmlFor="Agree to the Terms"
                >
                  This example is built by GraphCMS.
                  <br /> By checking the box you agree to our{" "}
                  <a href="https://graphcms.com/terms/">TOS</a> and{" "}
                  <a href="https://graphcms.com/privacy/">Privacy Policy</a>
                </label>
                <input
                  className="hidden opacity-0"
                  type="checkbox"
                  placeholder="Agree to the Terms"
                  name="subscriber"
                  ref={register({ required: true })}
                />
                <div
                  className="flex justify-center w-8 h-8 rounded-md bg-darkgray-900"
                  onClick={handleTOC}
                >
                  {agreedTOC ? (
                    <FontAwesomeIcon
                      width="14"
                      icon={faCheck}
                      className="text-white"
                    />
                  ) : null}
                </div>
                <ErrorMessage
                  errors={errors}
                  name="subscriber"
                  message="This is required"
                  className="text-darkgray-900"
                >
                  {({ message }) => (
                    <p className="text-darkgray-900">{message}</p>
                  )}
                </ErrorMessage>
              </div>
              {isLoading ? (
                <FontAwesomeIcon
                  width="24"
                  icon={faSpinner}
                  className="mr-2 text-white rotate"
                />
              ) : (
                <input
                  type="submit"
                  value="Subscribe Now"
                  disabled={!formState.isValid}
                  className={`inline px-6 py-4 mt-auto rounded-full shadow-lg text-current ${
                    formState.isValid ? "opacity-100" : "opacity-50"
                  } bg-darkgray-900 hover:shadow-xl text-inherit`}
                />
              )}

              {isError ? (
                <p className="flex px-4 py-2 mt-4 text-gray-100 rounded-md bg-darkgray-900">
                  <FontAwesomeIcon
                    width="14"
                    icon={faExclamationTriangle}
                    className="mr-2 text-white"
                  />
                  Something went wrong, please try again later.
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
