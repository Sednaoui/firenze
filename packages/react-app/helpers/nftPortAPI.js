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
