import React, { useContext, useState } from "react";
import { Web3Context } from "../helpers/Web3Context";
import { CommissionForm } from "../components";
import { Row, Col, Card, Image, Avatar, Button, Modal } from "antd";
import { getNFTsFromAccount } from "../helpers/nftPortAPI";
import utilStyles from "../styles/utils.module.css";

// TODO: get artist address from previous page of list of artists
const tempArtistAddress = "";

// TODO: get artisit ENS avatar and name if available
const artisitAvatarURL =
  "https://storage.googleapis.com/sentinel-nft/raw-assets/c_0x72b6dc1003e154ac71c76d3795a3829cfd5e33b9_t_3270_raw_asset.jpeg";

const artistName = "Marc";

function artistProfile() {
  const web3 = useContext(Web3Context);

  console.log(`🗄 web3 context:`, web3);

  // options to get the artist's NFTs
  // TODO: change hardcoded chain from "polygon" to network received from web3
  const [nfts, setNfts] = useState([]);

  const { Meta } = Card;

  React.useEffect(async () => {
    const response = await getNFTsFromAccount("polygon", tempArtistAddress);
    setNfts(response.nfts);
  }, []);

      const nftCards = nfts.map(nft => {
        if (nft.cached_file_url) {
          return (
            <Col span={8} key={nft.token_id}>
          <Card key={nft.token_id} style={{ width: "25rem", height: "20" }} cover={<Image src={nft.cached_file_url} />}>
                <Meta title={nft.name} description={nft.description} />
              </Card>
            </Col>
          );
        }
      });

  // comssion request info modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex flex-1 flex-col h-screen w-full items-center">
      <div className="text-center" style={{ margin: 64 }}>
        <Avatar src={<Image src={artisitAvatarURL} />} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} />
        <h1 className={utilStyles.headingXl}>{artistName}</h1>
        <p>{tempArtistAddress}</p>
        <Button onClick={showModal}>Comission</Button>
        <Modal
          title={`Commission ${artistName}`}
          visible={isModalVisible}
          onCancel={handleCancel}
          okButtonProps={{ disabled: true }}
        >
          <CommissionForm />
        </Modal>
      </div>
      <Row gutter={16}>{nftCards}</Row>
      <div className="text-center"></div>
    </div>
  );
}

export default artistProfile;
