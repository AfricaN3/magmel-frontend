import React, { useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactSwitch from "react-switch";
import { useWallet } from "@rentfuse-labs/neo-wallet-adapter-react";
import { CirclesWithBar } from "react-loader-spinner";
import { sc, wallet } from "@cityofzion/neon-js";
import { WitnessScope } from "@rentfuse-labs/neo-wallet-adapter-base";
import { helpers } from "@cityofzion/props";

import { NftCard, TextToImage, Summarize } from "../../components";
import axiosInstance from "../../api";
import useReadNeo from "../../hooks/useReadNeo";
import {
  gasContractAddress,
  magmelContractAddress,
  rpcAddress,
} from "../../constants";
import { toastMessage } from "../../utils";

import img from "../../assets/images/ainft.jpeg";

import "./mint.css";

const Mint = () => {
  const { address, connected, invoke } = useWallet();

  const { gasBalance, amountPayable } = useReadNeo();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
    uri: "",
    imageData: null,
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [useSummarizer, setUseSummarizer] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUseSummarizerBtn = (val) => {
    setUseSummarizer(val);
  };

  const generateImage = async () => {
    if (!address || !connected) {
      toastMessage(
        "error",
        "You need to connect a wallet to generate Image",
        5000
      );
      return;
    }
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        setMessage(`Generating Image!!!`);
        const response = await axiosInstance.post(
          `ai/`,
          JSON.stringify({
            prompt: form.prompt,
          })
        );

        toastMessage(
          "success",
          "Image was successfully generated! Upload Image to IPFS for decentralized storage",
          8500
        );
        setForm({
          ...form,
          photo: `${response.data.photo}`,
          imageData: response.data.data,
        });
      } catch (err) {
        toastMessage(
          "error",
          "There was an error while generating Image. Please check your console for details",
          5000
        );

        console.log(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      toastMessage("error", "Please provide proper prompt", 5000);
    }
  };

  const regenerateImage = async () => {
    if (!address || !connected) {
      toastMessage(
        "error",
        "You need to connect a wallet to generate Image",
        5000
      );

      return;
    }
    if (form.prompt) {
      try {
        setForm({ ...form, photo: `` });
        setGeneratingImg(true);
        setMessage(`Generating Image!!!`);
        const response = await axiosInstance.post(
          `ai/`,
          JSON.stringify({
            prompt: form.prompt,
          })
        );

        toastMessage(
          "success",
          "Image was succesffully generated! Upload Image to IPFS for decentralized storage",
          5000
        );
        setForm({
          ...form,
          photo: `${response.data.photo}`,
          imageData: response.data.data,
        });
      } catch (err) {
        toastMessage(
          "error",
          "There was an error while generating Image. Please check your console for details",
          5000
        );

        console.log(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      toastMessage("error", "Please provide proper prompt", 5000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address || !connected) {
      toastMessage("error", "You need to connect a wallet to mint Image", 5000);

      return;
    }
    if (!form.uri) {
      toastMessage("error", "You need to upload image to IPFS", 5000);

      return;
    }
    if (parseInt(amountPayable) > parseInt(gasBalance)) {
      toastMessage("error", "You have insufficient GAS", 5000);

      return;
    }
    setLoading(true);
    try {
      setMessage(`Getting metadata from IPFS`);

      const response = await axiosInstance.post(
        `post/mint/`,
        JSON.stringify({ uri: form.uri })
      );

      const jsonMetadata = response.data.data;

      let param = {
        scriptHash: gasContractAddress,
        operation: "transfer",
        args: [
          {
            type: "Hash160",
            value: sc.ContractParam.hash160(address).toJson().value,
          },
          {
            type: "Hash160",
            value: sc.ContractParam.hash160(magmelContractAddress).toJson()
              .value,
          },
          {
            type: "Integer",
            value: sc.ContractParam.integer(amountPayable).toJson().value,
          },
          {
            type: "ByteArray",
            value: sc.ContractParam.byteArray(jsonMetadata).toJson().value,
          },
        ],
        signers: [
          {
            account: wallet.getScriptHashFromAddress(address),
            scopes: WitnessScope.CalledByEntry,
          },
        ],
      };
      setMessage(`Waiting for your Signature!!!`);
      let result = await invoke(param);
      setMessage(`Confirming Transaction!!!`);
      if (result.data?.txId) {
        toastMessage("info", "Confirming Transaction", 20000);

        await helpers.sleep(20000);
        let new_result;
        new_result = await helpers.txDidComplete(
          rpcAddress,
          result.data?.txId,
          true
        );
        console.log(new_result);
        const sent = new_result[0];
        if (sent) {
          toastMessage("success", "Transaction was successful", 5000);
          navigate("/");
        } else {
          toastMessage("error", "Transaction was not successful", 5000);
        }
      }
    } catch (error) {
      console.log(error);
      toastMessage("error", `${error.description}`, 5000);
    } finally {
      setLoading(false);
    }
  };

  const uploadToIpfs = async () => {
    if (form.prompt && form.photo && form.name) {
      if (!address || !connected) {
        toastMessage(
          "error",
          `You need to connect a wallet to upload Image`,
          5000
        );
        return;
      }
      setLoading(true);
      try {
        setMessage(`Uploading to IPFS...`);
        const response = await axiosInstance.post(
          `post/`,
          JSON.stringify({ ...form, owner: address })
        );
        toastMessage(
          "success",
          `Image was succesfully uploaded to IPFS! Mint image`,
          5000
        );
        setForm({ ...form, uri: `${response.data.data}` });
      } catch (err) {
        toastMessage(
          "error",
          `There was an error while uploading image. Please check your console for details`,
          5000
        );
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      toastMessage("error", `Please upload an image with proper details`, 5000);
    }
  };

  return (
    <section className="mint">
      <Container>
        <Row>
          <Col lg="3" md="4" sm="6">
            <h5 className="mb-4 text-light">
              {generatingImg || loading
                ? message
                : form.photo
                ? `Generated NFT`
                : `Preview NFT`}
            </h5>
            {form.photo ? (
              <NftCard image={form.photo} alt={form.prompt} />
            ) : generatingImg || loading ? (
              <CirclesWithBar
                height="100"
                width="100"
                color="#fa5f00"
                wrapperStyle={{}}
                wrapperClass="loader"
                visible={generatingImg || loading}
                outerCircleColor=""
                innerCircleColor=""
                barColor=""
                ariaLabel="circles-with-bar-loading"
              />
            ) : (
              <NftCard image={img} alt={"Preview"} />
            )}
          </Col>

          <Col lg="9" md="8" sm="6">
            <label className={`summary-btn-label`}>
              <span>Use Summarizer</span>
              <ReactSwitch
                checked={useSummarizer}
                onChange={handleUseSummarizerBtn}
                className={`summary-btn`}
                onColor="#fa5f00"
              />
            </label>

            {!connected ? (
              <h4>Please connect your wallet to create NFT</h4>
            ) : !useSummarizer ? (
              <TextToImage
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                setForm={setForm}
                setGeneratingImg={setGeneratingImg}
                generatingImg={generatingImg}
                generateImage={generateImage}
                uploadToIpfs={uploadToIpfs}
                regenerateImage={regenerateImage}
                setMessage={setMessage}
                loading={loading}
              />
            ) : (
              <Summarize
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                setForm={setForm}
                setGeneratingImg={setGeneratingImg}
                generatingImg={generatingImg}
                generateImage={generateImage}
                uploadToIpfs={uploadToIpfs}
                regenerateImage={regenerateImage}
                setMessage={setMessage}
                loading={loading}
              />
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Mint;
