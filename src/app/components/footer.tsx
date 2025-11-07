"use client";

import { FC, useEffect, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaRegCopy,
} from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import { supabase } from "@/app/lib/supabaseClient";

type SocialLink = {
  platform: string;
  url: string;
  icon: string;
  order: number;
};

const FooterContact: FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  // ✅ Fetch + Realtime
  useEffect(() => {
    const fetchLinks = async () => {
      const { data, error } = await supabase
        .from("socialLinks")
        .select("platform, url, icon, order")
        .order("order", { ascending: true });

      if (error) {
        console.warn("❌ Failed to load social links:", error.message);
        return;
      }

      const filtered = (data || []).filter(
        (item) => item.url && item.icon && FaIcons[item.icon as keyof typeof FaIcons]
      );

      setSocialLinks(filtered);
    };

    fetchLinks();

    const subscription = supabase
      .channel("realtime:socialLinks")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "socialLinks",
      }, fetchLinks)
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <footer id="contact" className="text-center relative">
      {copied && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md z-50">
          {copied} copied to clipboard!
        </div>
      )}

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
          <div className="flex items-center space-x-3 text-lg">
            <FaPhone className="text-gray-600" />
            <span className="text-gray-800 font-medium">+92 308 2452547</span>
            <FaRegCopy
              className="text-gray-500 cursor-pointer hover:text-gray-800"
              onClick={() => copyToClipboard("+92 308 2452547")}
            />
          </div>
        </div>

        <p className="text-gray-600 mb-4">You may also find me on these platforms!</p>
        <div className="flex justify-center space-x-6 mb-6">
          {socialLinks.map((item) => {
            const Icon = FaIcons[item.icon as keyof typeof FaIcons];
            return (
              <a
                key={item.platform}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600"
                aria-label={item.platform}
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>
      </div>

      <div className="text-sm text-gray-500 bg-gray-50 py-6 px-4 text-center sm:text-base">
        <p>
          © {new Date().getFullYear()} | Designed and coded with ❤️ by Noman Khaliq
        </p>
      </div>
    </footer>
  );
};

export default FooterContact;
