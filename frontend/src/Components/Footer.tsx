import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import Container from "./container/Container";

const Footer = () => {
  return (
    <footer className="bg-[#101010] text-white py-4  ">
      <Container>
        <div className="flex gap-x-64">
          <div className=" border-red w-1/2 ">
            <div></div>
            <div className=" border-yellow w-1/2 text-left m-4">
              <p className="cursor-pointer">
                Experience the future of interview preparation. Bid farewell to
                outdated methods and embrace a smart, effective approach to
                interview preparations.
              </p>
            </div>
            <div className="flex align-left">
              <div
                className="rounded-full my-3 mx-3 icon border border-solid flex items-center justify-center cursor-pointer"
                style={{ width: "40px", height: "40px", borderRadius: "20px" }}
              >
                <CiLinkedin />
              </div>
              <div
                className="rounded-full my-3 mx-3 icon border border-solid flex items-center justify-center cursor-pointer"
                style={{ width: "40px", height: "40px", borderRadius: "20px" }}
              >
                <FaInstagram />
              </div>
              <div
                className="rounded-full my-3 mx-3 icon border border-solid flex items-center justify-center cursor-pointer"
                style={{ width: "40px", height: "40px", borderRadius: "20px" }}
              >
                <FaYoutube />
              </div>
            </div>
          </div>
          <div className="flex gap-x-8 ">
            <div className="text-left mb-3 leading-5 cursor-pointer">
              <p className="footer-font text-accent">COMPANY</p>
              <p className="footer-inner-font">For Businesses</p>
              <p className="footer-inner-font">About Us</p>
              <p className="footer-inner-font">Pricing</p>
              <p className="footer-inner-font">Product Demo</p>
            </div>
            <div className="text-left leading-5 cursor-pointer">
              <p className="footer-font text-accent">SUPPORT</p>
              <p className="footer-inner-font">Contact Us</p>
              <p className="footer-inner-font">FAQs</p>
            </div>
            <div className="text-left leading-5 cursor-pointer">
              <p className="footer-font text-accent">LEGAL</p>
              <p className="footer-inner-font">Terms & Conditions</p>
              <p className="footer-inner-font">Privacy Policy</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
