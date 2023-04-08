import React from "react";

import FormField from "../form/FormField";
import axiosInstance from "../../api";
import { toastMessage } from "../../utils";

const Summarize = (props) => {
  const {
    form,
    handleChange,
    handleSubmit,
    setForm,
    setGeneratingImg,
    generatingImg,
    generateImage,
    uploadToIpfs,
    regenerateImage,
    setMessage,
    loading,
  } = props;

  const handleSummarizer = async () => {
    try {
      setGeneratingImg(true);
      setMessage(`Generating Prompt...`);
      const response = await axiosInstance.post(
        `ai/prompt/summarize/`,
        JSON.stringify({
          prompt: form.prompt,
        })
      );
      toastMessage(
        "success",
        "Prompt was successfully generated! Generate image",
        8500
      );

      setForm({
        ...form,
        prompt: `${response.data.generated}`,
        imageData: null,
        photo: "",
      });
    } catch (err) {
      toastMessage(
        "error",
        "There was an error while generating Prompt. Please check your console for details",
        5000
      );
      console.log(err);
    } finally {
      setGeneratingImg(false);
    }
  };

  return (
    <div className="create__item">
      <form onSubmit={handleSubmit}>
        <FormField
          labelName="NFT Name"
          type="text"
          name="name"
          placeholder="Ex., sunflowers"
          value={form.name}
          handleChange={handleChange}
        />
        <FormField
          labelName="Prompt"
          type="textarea"
          name="prompt"
          placeholder="Paste in the text you want summarized"
          value={form.prompt}
          handleChange={handleChange}
          handleSummarizer={handleSummarizer}
          isSummarizer
        />

        {form.uri ? (
          <>
            <button type="submit" className="submit__btn">
              {loading ? "Minting..." : "Mint Image"}
            </button>
          </>
        ) : form.photo ? (
          <>
            <button
              type="button"
              className="submit__btn"
              onClick={uploadToIpfs}
            >
              {loading ? "Uploading..." : "Upload Image"}
            </button>
            <button
              type="button"
              className="submit__btn"
              onClick={regenerateImage}
            >
              {generatingImg ? "Generating..." : "Regenerate"}
            </button>
          </>
        ) : (
          <button type="button" onClick={generateImage} className="submit__btn">
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        )}
      </form>
    </div>
  );
};

export default Summarize;
