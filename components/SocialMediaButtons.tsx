"use client";
import { IconContext } from "react-icons";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import { useMemo } from "react";
import { EXT_FACEBOOK_LINK, EXT_INSTAGRAM_LINK, EXT_TIKTOK_LINK, EXT_YOUTUBE_LINK } from "constants/routes";

const SocialMediaButtons = ({ align = "left" }: { align: string }) => {
  return (
    <div>
      <IconContext.Provider value={useMemo(() => ({ size: "22" }), [])}>
        <div className={`flex justify-${align}`}>
          <Link className="border-0" href={EXT_FACEBOOK_LINK}>
            <FaFacebook />
          </Link>
          <Link className="border-0" href={EXT_INSTAGRAM_LINK}>
            <FaInstagram />
          </Link>
          <Link className="border-0" href={EXT_YOUTUBE_LINK}>
            <FaYoutube />
          </Link>
          <Link className="border-0" href={EXT_TIKTOK_LINK}>
            <FaTiktok />
          </Link>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default SocialMediaButtons;
