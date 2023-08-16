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

const SocialMediaButttons = () => {
  return (
    <div>
      <IconContext.Provider value={{ size: 22 }}>
        <div className="flex justify-center">
          <Button className="border-0">
            <FaFacebook />
          </Button>
          <Button className="border-0">
            <FaTwitter />
          </Button>
          <Button className="border-0">
            <FaInstagram />
          </Button>
        </div>
        <div className="flex mt-2 justify-center">
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

export default SocialMediaButttons;
