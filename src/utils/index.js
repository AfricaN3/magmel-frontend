import FileSaver from "file-saver";
import { sc, u } from "@cityofzion/neon-js";
import { surpriseMePrompts } from "../constants";
import { toast } from "react-toastify";

export function toastMessage(type, message, timing) {
  switch (type) {
    case "error":
      toast.error(`🤦 ${message}!!!`, {
        position: "bottom-right",
        autoClose: timing,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      break;
    case "success":
      toast.success(`😊 ${message}!!!`, {
        position: "bottom-right",
        autoClose: timing,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      break;
    case "info":
      toast.info(`📢 ${message}!!!`, {
        position: "bottom-right",
        autoClose: timing,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      break;
    case "warning":
      toast.warning(`⚠️ ${message}!!!`, {
        position: "bottom-right",
        autoClose: timing,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      break;
    default:
      toast.info(`📢 ${message}!!!`, {
        position: "bottom-right",
        autoClose: timing,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
  }
}

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}

export function toInvocationArgument(type, value) {
  const arg = { type, value };

  switch (type) {
    case "Any":
      arg.value = null;
      break;
    case "Boolean":
      // Does basic checks to convert value into a boolean. Value field will be a boolean.
      let _value = value;
      if (typeof _value === "string") {
        _value = _value === "true" || _value === "1";
      }
      arg.value = sc.ContractParam.boolean(_value).toJson().value;
      break;
    case "Integer":
      // A value that can be parsed to a BigInteger. Numbers or numeric strings are accepted.
      arg.value = sc.ContractParam.integer(value).toJson().value;
      break;
    case "ByteArray":
      // A string or HexString.
      arg.value = sc.ContractParam.byteArray(value).toJson().value;
      break;
    case "String":
      // UTF8 string.
      arg.value = sc.ContractParam.string(value).toJson().value;
      break;
    case "Hash160":
      // A 40 character (20 bytes) hexstring. Automatically converts an address to scripthash if provided.
      arg.value = sc.ContractParam.hash160(value).toJson().value;
      break;
    case "Hash256":
      // A 64 character (32 bytes) hexstring.
      arg.value = sc.ContractParam.hash256(value).toJson().value;
      break;
    case "PublicKey":
      // A public key (both encoding formats accepted)
      arg.value = sc.ContractParam.publicKey(value).toJson().value;
      break;
    case "Signature":
      // TODO: NOT SUPPORTED
      break;
    case "Array":
      // Pass an array as JSON [{type: 'String': value: 'blabla'}]
      arg.value = sc.ContractParam.fromJson(value).toJson().value;
      break;
    case "Map":
      // TODO: NOT SUPPORTED
      break;
    case "InteropInterface":
      // TODO: NOT SUPPORTED
      break;
    case "Void":
      // Value field will be set to null.
      arg.value = null;
      break;
  }

  return arg;
}

export const convertBytestring = (value) => {
  if (value !== undefined) {
    return u.hexstring2str(u.base642hex(value));
  }
};

export const convertBytestringtoNumber = (value) => {
  if (value !== undefined) {
    let parsedValue = u.HexString.fromHex(
      u.reverseHex(u.base642hex(value))
    ).toNumber();
    return parsedValue;
  }
};

export const truncate = (str, maxlength) => {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
};
