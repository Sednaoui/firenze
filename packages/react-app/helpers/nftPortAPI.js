const FormData = require("form-data");

const nftPortAPI = "https://api.nftport.xyz/v0";
const NFT_PORT_AUTH = "7603c99b-c997-4bb4-b723-9715c3b25d55";

export const easyMintingWithFileUpload = async (chain, name, description, mint_to_address, file) => {
  const form = new FormData();
  form.append("file", file);

  // easy minting with file upload
  const options = {
    method: "POST",
    body: form,
    headers: {
      Authorization: NFT_PORT_AUTH,
    },
  };

  const response = await fetch(
    `${nftPortAPI}/mints/easy/files?` +
      new URLSearchParams({
        chain,
        name,
        description,
        mint_to_address,
      }),
    options,
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (responseJson) {
      // Handle the response
      console.log(responseJson);
      return responseJson;
    });

  return response;
};

export const getNFTsFromAccount = async (chain, account) => {
  const response = await fetch(`${nftPortAPI}/accounts/${account}?chain=${chain}&include=metadata`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: NFT_PORT_AUTH,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      // Handle the response
      console.log(res, "response!!");
      return res;
    });

  return response;
};

export const uploadFileIPFS = async file => {
  const form = new FormData();
  form.append("file", file);

  const options = {
    method: "POST",
    body: form,
    headers: {
      Authorization: NFT_PORT_AUTH,
    },
  };

  const response = await fetch(`${nftPortAPI}/files`, options)
    .then(res => {
      return res.json();
    })
    .then(responseJson => {
      // Handle the response
      return responseJson;
    });

  return response;
};

export const uploadMetaDataIPFS = async (name, description, file_url) => {
  const data = {
    name,
    description,
    file_url,
  };
  const options = {
    method: "POST",
    headers: {
      Authorization: NFT_PORT_AUTH,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch("https://api.nftport.xyz/v0/metadata", options)
    .then(res => {
      return res.json();
    })
    .then(responseJson => {
      // Handle the response
      return responseJson;
    })
    .catch(err => {
      console.error(err);
    });

  return response;
};
