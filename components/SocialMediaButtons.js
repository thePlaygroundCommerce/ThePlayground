"use client";
import { IconContext } from "react-icons";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Button from "./Button";
import { useMemo } from "react";

const SocialMediaButtons = ({ align = "left" }) => {
  return (
    <div>
      <IconContext.Provider value={useMemo(() => ({ size: 22 }), [])}>
        <div className={`flex justify-${align}`}>
          <Button className="border-0">
            <FaFacebook />
          </Button>
          {/* <Button className="border-0">
            <FaTwitter />
          </Button> */}
          <Button className="border-0">
            <FaInstagram />
          </Button>
          <Button className="border-0">
            <FaYoutube />
          </Button>
          <Button className="border-0">
            <FaTiktok />
          </Button>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default SocialMediaButtons;
