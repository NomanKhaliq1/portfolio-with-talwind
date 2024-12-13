"use client";

import { FC, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaRegCopy,
} from "react-icons/fa";

const FooterContact: FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <footer id="contact" className="text-center">
      <div className="px-6 py-20">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
            Get in touch
          </span>
        </div>
        <p className="text-gray-600 mb-6">
          What&apos;s next? Feel free to reach out to me if you&apos;re looking for a
          developer, have a query, or simply want to connect.
        </p>

        <div className="flex flex-col items-center space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-lg">
            <FaEnvelope className="text-gray-600" />
            <span className="text-gray-800 font-medium">nomanghouri.dev@gmail.com</span>
            <FaRegCopy
              className="text-gray-500 cursor-pointer hover:text-gray-800"
              onClick={() => copyToClipboard("nomanghouri.dev@gmail.com")}
            />
          </div>
          {copied === "youremail@example.com" && (
            <span className="text-sm text-green-500">Email copied!</span>
          )}
          <div className="flex items-center space-x-3 text-lg">
            <FaPhone className="text-gray-600" />
            <span className="text-gray-800 font-medium">+92 308 2452547</span>
            <FaRegCopy
              className="text-gray-500 cursor-pointer hover:text-gray-800"
              onClick={() => copyToClipboard("+92 308 2452547")}
            />
          </div>
          {copied === "+123 456 7890" && (
            <span className="text-sm text-green-500">Phone number copied!</span>
          )}
        </div>

        <p className="text-gray-600 mb-4">You may also find me on these platforms!</p>
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://github.com/NomanKhaliq1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-indigo-600"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/nomanghouri-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-indigo-600"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://www.instagram.com/nomanghouri2/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-indigo-600"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-indigo-600"
          >
            <FaTwitter size={24} />
          </a>
        </div>
      </div>

      <div className="text-sm text-gray-500 bg-gray-50 py-6">
        <p>
          © 2024 | Designed and coded with ❤️ by Noman Khaliq
        </p>
      </div>
    </footer>
  );
};

export default FooterContact;
