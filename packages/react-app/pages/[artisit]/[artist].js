import React, { useContext, useState, useEffect } from "react";
import { Web3Context } from "../../helpers/Web3Context";
import { CommissionForm } from "../../components";
import { Row, Col, Card, Image, Avatar, Button, Modal } from "antd";
import { getNFTsFromAccount } from "../../helpers/nftPortAPI";
import utilStyles from "../../styles/utils.module.css";
import { useRouter } from "next/router";
import NFTTransferModule from "../../components/NFTTransferModule";

function artistProfile() {
  const web3 = useContext(Web3Context);
  const router = useRouter();
  const { artist } = router.query;
  const [isArtist, setIsArtist] = useState(false);

  // TODO: get artisit ENS avatar and name if available
  let artisitAvatarURL = "https://www.larvalabs.com/cryptopunks/cryptopunk0499.png?customColor=638596";
  let artistName = "";

  if (artist === "0x53be3420d2F2EC0C68cA0ec65FF6dc004Cc551f9") {
    artisitAvatarURL =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Michelangelo_Daniele_da_Volterra_%28dettaglio%29.jpg/800px-Michelangelo_Daniele_da_Volterra_%28dettaglio%29.jpg";

    artistName = "michelangelobuonarroti.eth";
  }

  // options to get the artist's NFTs
  // TODO: change hardcoded chain from "polygon" to network received from web3
  const [nfts, setNfts] = useState([]);

  const { Meta } = Card;

  React.useEffect(async () => {
    const response = await getNFTsFromAccount("polygon", artist);
    setNfts(response.nfts);
    if (web3.address && artist && web3.address === artist) {
      setIsArtist(true);
    }
  }, [artist, web3.address]);

  const nftCards = nfts
    ? nfts.map(nft => {
        if (nft.cached_file_url) {
          return (
            <Col span={8} key={nft.token_id}>
              <Card
                key={nft.token_id}
                style={{ width: "25rem", height: "20" }}
                cover={<Image src={nft.cached_file_url} />}
              >
                <Meta title={nft.name} description={nft.description} />

                <br></br>
                <NFTTransferModule isArtist={isArtist} nftId={nft.token_id} />
              </Card>
            </Col>
          );
        }
      })
    : "Artisit has no NFTs to display";

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
        <Button onClick={showModal}>Comission</Button>
        <Modal title={`Commission ${artistName}`} visible={isModalVisible} onCancel={handleCancel} footer={null}>
          <CommissionForm />
        </Modal>
      </div>
      <Row gutter={16}>{nftCards}</Row>
      <div className="text-center"></div>
    </div>
  );
}

export default artistProfile;
