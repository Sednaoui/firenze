import { PageHeader } from "antd";
import React, { useMemo } from "react";
import Link from "next/link";
import styles from "../styles/layout.module.css";
import { resolve } from "url";

export const BaseLink = ({ href, as, ...rest }) => {
  const newAs = useMemo(() => {
    let baseURI_as = as || href;

    // make absolute url relative
    // when displayed in url bar
    if (baseURI_as.startsWith("/")) {
      //  for static html compilation
      baseURI_as = "." + href;
      // <IPFSLink href="/about"> => <a class="jsx-2055897931" href="./about">About</a>

      // on the client
      if (typeof document !== "undefined") {
        baseURI_as = resolve(document.baseURI, baseURI_as).href;
        // => <a href="https://gateway.ipfs.io/ipfs/Qm<hash>/about">About</a>
      }
    }
    return baseURI_as;
  }, [as, href]);

  return <Link {...rest} href={href} as={newAs} />;
};

export default function Header({ children, home }) {
  return (
    <div>
      <div>
        <BaseLink href="/">
          <a rel="noopener noreferrer">
            <PageHeader title="Firenze" subTitle="commission art from master artists" style={{ cursor: "pointer" }} />
          </a>
        </BaseLink>
        <BaseLink href="/disegnoNFT">
          <a className={styles.backToHomeItem}>Artist Space</a>
        </BaseLink>
      </div>
      <main>{children}</main>
    </div>
  );
}
