"use client";

import { motion } from "framer-motion";
import { Github, Mail, Twitter, Linkedin, Heart, ExternalLink } from "lucide-react";
import Image from "next/image";
import Logo from "~/assets/logo-mutate.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Analyze", href: "/analyze" },
      { name: "Features", href: "#features" },
      { name: "Workflow", href: "#workflow" },
      { name: "API Documentation", href: "https://github.com/ArcInstitute/evo2" }
    ],
    company: [
      { name: "About Us", href: "/" },
      { name: "Team", href: "/" },
      { name: "Careers", href: "/" },
      { name: "Contact", href: "/" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/" },
      { name: "Terms of Service", href: "/" },
      { name: "Cookie Policy", href: "/" },
      { name: "Data Security", href: "/" }
    ]
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/GenomicsAI", color: "#333" },
    { name: "Twitter", icon: Twitter, href: "https://x.com/sehajmakkarr", color: "#1DA1F2" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/sehajmakkar/", color: "#0077B5" },
    { name: "Email", icon: Mail, href: "mailto:sehajmakkar007@gmail.com", color: "#EA4335" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="bg-black text-white">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <Image src={Logo} alt="GenomicsAI Logo" height={40} width={40} className="rounded-lg" />
              <span className="font-bold text-2xl bg-gradient-to-r from-[#ff734d] to-[#d64000] text-transparent bg-clip-text">
                GenomicsAI
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Revolutionizing genomics research with AI-powered mutation detection and disease prediction. 
              Built on Stanford's Evo 2 for next-generation insights.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-5 w-5 text-gray-400 group-hover:text-[#ff734d] transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4 text-white">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-[#ff734d] transition-colors duration-300 flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>


          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-[#ff734d] transition-colors duration-300 flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4 text-white">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-[#ff734d] transition-colors duration-300 flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div 
          className="mt-16 pt-8 border-t border-gray-800"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-semibold text-xl mb-2 text-white">Stay Updated</h3>
              <p className="text-gray-400">Get the latest updates on genomics research and AI breakthroughs.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#ff734d] transition-colors duration-300"
              />
              <motion.button
                className="bg-gradient-to-r from-[#ff734d] to-[#d64000] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400">
            <p>&copy; {currentYear} GenomicsAI. All rights reserved.</p>
            <div className="hidden md:block w-px h-4 bg-gray-700"></div>
            <p className="text-sm">Powered by Stanford's Evo 2 Architecture</p>
          </div>
          
          {/* Made with Love */}
          <motion.div 
            className="flex items-center gap-2 text-gray-400"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm">Made with</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            </motion.div>
            <span className="text-sm">by</span>
            <span className="font-semibold text-[#ff734d]">SEHAJ</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
}