import { Footer } from "flowbite-react";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function FooterCom() {
  return (
    <Footer id="footer" container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to={"/"}
              className="self-center whitespace-nowrap text-lg sm:text-xl dark:text-white font-semibold my-2"
            >
              <span className="px-2 py-1 pb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                MernStack
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About"></Footer.Title>
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.linkedin.com/in/gurkirat-singh-25b024289/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Footer.Link>
                <Footer.Link
                  href="https://www.linkedin.com/in/gurkirat-singh-25b024289/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us"></Footer.Title>
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.linkedin.com/in/gurkirat-singh-25b024289/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal"></Footer.Title>
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider></Footer.Divider>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Mern Blogs"
            year={new Date().getFullYear()}
          ></Footer.Copyright>
          <div className="flex flex-row sm:justify-center gap-10 mt-5 sm:mt-0">
            <Footer.Icon href="#" icon={FaFacebook}></Footer.Icon>
            <Footer.Icon href="#" icon={FaInstagram}></Footer.Icon>
            <Footer.Icon href="#" icon={FaTwitter}></Footer.Icon>
            <Footer.Icon href="#" icon={FaGithub}></Footer.Icon>
          </div>
        </div>
      </div>
    </Footer>
  );
}
