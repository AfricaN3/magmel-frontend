import React from "react";

import "./form-field.css";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
  isSummarizer,
  handleSummarizer,
  handlePromptGenerator,
}) => (
  <div className="form__input">
    <div>
      <label htmlFor={name}>{labelName}</label>
      {!isSurpriseMe ? null : value.length > 15 ? (
        <button
          type="button"
          onClick={handlePromptGenerator}
          className="suprise__btn"
        >
          Transform prompt
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="suprise__btn"
        >
          Surprise me
        </button>
      )}
      {!isSummarizer ? null : (
        <button
          type="button"
          onClick={handleSummarizer}
          className="suprise__btn"
        >
          Summarize Text
        </button>
      )}
    </div>
    {type === "text" ? (
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    ) : (
      <textarea
        name={name}
        id={name}
        rows="7"
        placeholder={placeholder}
        className="w-100"
        value={value}
        onChange={handleChange}
      ></textarea>
    )}
  </div>
);

export default FormField;
