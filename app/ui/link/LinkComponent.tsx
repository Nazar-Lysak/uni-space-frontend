"use client"

import Link from "next/link";

interface LinkComponentProps {
    url: string;
    title: string;
  }
  
  const LinkComponent: React.FC<LinkComponentProps> = ({ url, title }) => {
    return (
      <Link href={url}>
        {title}
      </Link>
    );
  }
  
  export default LinkComponent;
  
