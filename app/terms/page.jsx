"use client";
import React from "react";
import Link from "next/link";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Footer from "@/components/custom/Footer";
import { FileText, Shield, Users, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function TermsPage() {
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
              <FileText className="h-12 w-12 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-gray-400">Last updated: January 10, 2024</p>
          </div>

          <div className="space-y-8">
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using Astra AI, you accept and agree to be bound by the terms and 
                conditions outlined in this Terms of Service. If you do not agree to these terms, 
                please do not use our services.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Service Description</h2>
              <p className="text-gray-300 leading-relaxed">
                Astra AI is an AI-powered platform that enables users to generate and develop software 
                applications through natural language prompts. Our services include code generation, 
                project management, and collaborative features.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">User Responsibilities</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Provide accurate and complete information</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Use the services for lawful purposes only</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Respect intellectual property rights</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Maintain the security of your account</p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Prohibited Activities</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Generating malicious or harmful code</p>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Violating applicable laws or regulations</p>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Infringing on intellectual property rights</p>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Distributing spam or malicious content</p>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You retain ownership of the code and applications you create using Astra AI. 
                However, you grant us a license to use your content to improve our services 
                and provide technical support.
              </p>
              <p className="text-gray-300 leading-relaxed">
                The Astra AI platform, including its design, features, and technology, 
                is protected by intellectual property laws and remains our property.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Payment and Subscription</h2>
              <p className="text-gray-300 leading-relaxed">
                We offer both free and paid subscription plans. Paid subscriptions are billed 
                on a recurring basis and can be canceled at any time. Refunds are provided 
                according to our refund policy.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                Astra AI is provided "as is" without warranties of any kind. We shall not be 
                liable for any indirect, incidental, or consequential damages arising from 
                your use of our services.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
              <p className="text-gray-300 leading-relaxed">
                We may terminate or suspend your account at any time for violations of these 
                terms. You may also terminate your account at any time through your account settings.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be 
                effective immediately upon posting. Your continued use of our services 
                constitutes acceptance of the modified terms.
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2">
                <p className="text-gray-300">Email: legal@astra-ai.com</p>
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
