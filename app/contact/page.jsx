"use client";
import React from "react";
import Link from "next/link";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Github, Twitter, Linkedin, MapPin, Phone, Send, MessageCircle, Users, HelpCircle, Star, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start Chat",
      href: "#"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      action: "Send Email",
      href: "mailto:support@astra-ai.com"
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Get help from our community",
      action: "Visit Forum",
      href: "https://community.astra-ai.com"
    },
    {
      icon: HelpCircle,
      title: "Help Center",
      description: "Find answers in our documentation",
      action: "Browse Docs",
      href: "/docs"
    }
  ];

  const faqs = [
    {
      question: "How do I get started with Astra AI?",
      answer: "Simply sign up for a free account and start describing your project idea. Our AI will help you build it step by step."
    },
    {
      question: "What programming languages are supported?",
      answer: "Astra AI supports all major programming languages including JavaScript, Python, Java, C++, and more."
    },
    {
      question: "Can I export my code?",
      answer: "Yes, you can export your projects as ZIP files or push them directly to GitHub."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use industry-standard encryption and security measures to protect your data."
    }
  ];

  return (
    <>
      <Header />
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
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6">
              <Mail className="h-4 w-4" />
              <span>Contact Us</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
              Get in <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We're here to help you succeed with Astra AI. Reach out with any questions or feedback.
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactOptions.map((option, index) => (
              <div key={index} className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 text-center hover:border-blue-500 transition-all duration-300 hover:scale-105 group">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                    <option.icon className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{option.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{option.description}</p>
                <Link href={option.href}>
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-300 hover:scale-105 transition-all">
                    {option.action}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                
                {submitStatus === "success" ? (
                  <div className="bg-green-500/20 border border-green-500 rounded-xl p-4 text-center">
                    <div className="text-green-400 font-medium mb-2">Message Sent Successfully!</div>
                    <p className="text-gray-300 text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
                        placeholder="Tell us more about your question or feedback..."
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/30"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 group">
                    <div className="p-2 bg-blue-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white">Email</p>
                      <p className="text-gray-400 text-sm">support@astra-ai.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="p-2 bg-green-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Phone className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white">Phone</p>
                      <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="p-2 bg-purple-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white">Address</p>
                      <p className="text-gray-400 text-sm">123 AI Street, Tech City, TC 12345</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Saturday</span>
                    <span className="text-white">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday</span>
                    <span className="text-white">Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="https://github.com/astra-ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-transform">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="https://twitter.com/astra-ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-transform">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="https://linkedin.com/company/astra-ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-transform">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-l-2 border-gray-700 pl-6 group">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/docs/faq">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-300 hover:scale-105 transition-all">
                  View All FAQs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
