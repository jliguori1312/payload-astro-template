"use client";

import type { PayloadAdminBarProps, PayloadMeUser } from "payload-admin-bar";

import { cn } from "src/utilties/ui";
//import { useSelectedLayoutSegments } from 'next/navigation'
import { PayloadAdminBar } from "payload-admin-bar";
import React, { useState } from "react";
//import { useRouter } from 'next/navigation'

import "./index.scss";

import { getClientSideURL } from "src/utilties/getURL";

const baseClass = "admin-bar";

const collectionLabels = {
  pages: {
    plural: "Pages",
    singular: "Page",
  },
  posts: {
    plural: "Posts",
    singular: "Post",
  },
  projects: {
    plural: "Projects",
    singular: "Project",
  },
};

const Title: React.FC = () => <span>Dashboard</span>;

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps;
  path: string;
}> = (props) => {
  const { adminBarProps, path } = props || {};
  //const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false);

  const firstSegment = path?.split("/").filter(Boolean)[0] || "pages";

  const collection = collectionLabels[
    firstSegment as keyof typeof collectionLabels
  ]
    ? firstSegment
    : "pages";
  //const router = useRouter()

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id));
  }, []);

  return (
    <div
      className={cn(baseClass, "py-2 bg-black text-white", {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: "font-medium text-white",
            logo: "text-white",
            user: "text-white",
          }}
          cmsURL={getClientSideURL()}
          collection={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || "Pages",
            singular: collectionLabels[collection]?.singular || "Page",
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            // TODO: Re-implement this without next
            //  - Won't work in astro SSG mode. Eventual implementation could be a client componenent that renders the entire page locally from the rest API, if draft mode is enabled.
            fetch("/next/exit-preview").then(() => {
              //router.push('/')
              //router.refresh()
            });
          }}
          style={{
            backgroundColor: "transparent",
            padding: 0,
            position: "relative",
            zIndex: "unset",
          }}
        />
      </div>
    </div>
  );
};
