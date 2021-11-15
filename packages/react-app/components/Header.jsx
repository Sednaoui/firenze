import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="/" rel="noopener noreferrer">
      <PageHeader title="Firenze" subTitle="commission art from master artists" style={{ cursor: "pointer" }} />
    </a>
  );
}
