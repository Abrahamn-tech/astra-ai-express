"use client";
import React from "react";
import Link from "next/link";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Footer from "@/components/custom/Footer";
import { Shield, Eye, Lock, Mail, Calendar, ChevronRight } from "lucide-react";

export default function PrivacyPage() {
  return (
    <>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(5, 8, 25)"
        gradientBackgroundEnd="rgb(10, 15, 40)"
        firstColor="59, 130, 246"
        secondColor="139, 92, 246"
        thirdColor="34, 211, 238"
        fourthColor="124, 58, 237"
        fifthColor="56, 189, 248"
        pointerColor="103, 232, 249"
        size="80%"
        blendingValue="hard-light"
        interactive={true}
        containerClassName="fixed inset-0 -z-10"
      />

      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400">Last updated: January 10, 2024</p>
          </div>

          <div className="space-y-8">
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                Astra AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, and protect your information when you use our services.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li>Name and email address</li>
                    <li>Profile information (username, bio, profile picture)</li>
                    <li>Authentication credentials (encrypted)</li>
                    <li>Payment information (processed securely by third parties)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Usage Data</h3>
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li>Project files and code you create</li>
                    <li>AI prompts and responses</li>
                    <li>Usage patterns and preferences</li>
                    <li>Device and browser information</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Provide and maintain our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze usage patterns</li>
                <li>Detect and prevent fraud and abuse</li>
                <li>Improve our services and develop new features</li>
              </ul>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We implement appropriate security measures to protect your information, including:
              </p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>End-to-end encryption for sensitive data</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage and transmission</li>
              </ul>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Export your data in a portable format</li>
                <li>Opt out of marketing communications</li>
                <li>Request information about our data practices</li>
              </ul>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2">
                <p className="text-gray-300">Email: privacy@astra-ai.com</p>
                <p className="text-gray-300">Address: 123 AI Street, Tech City, TC 12345</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
