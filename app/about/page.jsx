"use client";
import React from "react";
import Link from "next/link";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Button } from "@/components/ui/button";
import { Users, Target, Lightbulb, Globe, Award, Heart, Github, Twitter, Linkedin, Mail, ArrowRight, Zap, Shield, Code2, ArrowUpRight, CheckCircle, Rocket } from "lucide-react";

export default function AboutPage() {
  const team = [
    {
      name: "Priyanshu Vishwakarma",
      role: "Founder & CEO",
      image: "/team/priyanshu.jpg",
      bio: "Passionate about democratizing software development through AI. Previously worked at Google and Microsoft.",
      social: {
        github: "https://github.com/priyyannshhu",
        twitter: "https://twitter.com/priyanshu",
        linkedin: "https://linkedin.com/in/priyanshu"
      }
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      image: "/team/sarah.jpg",
      bio: "AI researcher and engineer with 10+ years of experience in machine learning and distributed systems.",
      social: {
        github: "https://github.com/sarahchen",
        twitter: "https://twitter.com/sarahchen",
        linkedin: "https://linkedin.com/in/sarahchen"
      }
    },
    {
      name: "Mike Johnson",
      role: "Head of Product",
      image: "/team/mike.jpg",
      bio: "Product visionary focused on creating intuitive developer tools that accelerate innovation.",
      social: {
        github: "https://github.com/mikejohnson",
        twitter: "https://twitter.com/mikejohnson",
        linkedin: "https://linkedin.com/in/mikejohnson"
      }
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "/team/emily.jpg",
      bio: "Design leader crafting beautiful and user-friendly experiences for developers worldwide.",
      social: {
        github: "https://github.com/emilyrodriguez",
        twitter: "https://twitter.com/emilyrodriguez",
        linkedin: "https://linkedin.com/in/emilyrodriguez"
      }
    }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Pushing the boundaries of what's possible with AI and software development."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive community where developers can learn and grow together."
    },
    {
      icon: Shield,
      title: "Trust",
      description: "Committed to transparency, security, and ethical AI development practices."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making software development accessible to everyone, regardless of background."
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Developers" },
    { number: "10K+", label: "Apps Created" },
    { number: "1M+", label: "Lines of Code Generated" },
    { number: "150+", label: "Countries Reached" }
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
        {/* Professional Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
              <Target className="h-4 w-4" />
              <span>About Astra AI</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Building the future of
              <span className="block bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400">
                software development
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize software development by making it accessible to everyone through the power of artificial intelligence.
            </p>
          </div>

          {/* Professional Stats */}
          <div className="flex flex-wrap justify-center gap-12 py-8 border-y border-gray-800">
            <div className="text-center group">
              <div className="text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">50K+</div>
              <div className="text-sm text-gray-400">Active Developers</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">10K+</div>
              <div className="text-sm text-gray-400">Apps Created</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">1M+</div>
              <div className="text-sm text-gray-400">Lines Generated</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">150+</div>
              <div className="text-sm text-gray-400">Countries Reached</div>
            </div>
          </div>

          {/* Professional Mission Section */}
          <div className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-12 mb-20 shadow-2xl">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-8 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                To empower every person with the ability to create software, regardless of their technical background. 
                We believe that great ideas shouldn't be limited by coding skills, and AI can bridge that gap.
              </p>
            </div>
          </div>

          {/* Professional Values Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 text-center hover:border-blue-500/30 transition-all duration-300 hover:scale-105 group">
                  <div className="flex items-center justify-center mb-6">
                    <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="h-8 w-8 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Astra AI was born from a simple observation: while software powers our world, 
                  the ability to create it remains limited to a small fraction of the population.
                </p>
                <p>
                  Founded in 2023 by Priyanshu Vishwakarma, we set out to change that. 
                  After years of working at major tech companies, he saw firsthand how AI could 
                  transform the development process.
                </p>
                <p>
                  Today, we're a team of passionate developers, designers, and AI researchers 
                  working to make software development accessible to everyone. Our platform has 
                  helped thousands of people bring their ideas to life, from simple websites to 
                  complex applications.
                </p>
                <p>
                  We're just getting started. Join us as we continue to push the boundaries 
                  of what's possible with AI and software development.
                </p>
              </div>
            </div>
            <div className="bg-black/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">2023</div>
                  <div className="text-gray-400">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">4+</div>
                  <div className="text-gray-400">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                  <div className="text-gray-400">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
                  <div className="text-gray-400">Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-black/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 text-center hover:border-blue-500/30 transition-all duration-300 hover:scale-105 group">
                  <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-12 w-12 text-white group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{member.name}</h3>
                  <p className="text-blue-400 mb-4 font-medium">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{member.bio}</p>
                  <div className="flex justify-center gap-4">
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Section */}
          <div className="bg-black/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-12 mb-20 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Powered by Modern Technology</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              <div className="text-center group">
                <div className="p-4 bg-blue-500/20 rounded-xl border border-blue-500/30 group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                </div>
                <div className="text-gray-300 text-sm font-medium">AI/ML</div>
              </div>
              <div className="text-center group">
                <div className="p-4 bg-purple-500/20 rounded-xl border border-purple-500/30 group-hover:scale-110 transition-transform">
                  <Code2 className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                </div>
                <div className="text-gray-300 text-sm font-medium">React</div>
              </div>
              <div className="text-center group">
                <div className="p-4 bg-emerald-500/20 rounded-xl border border-emerald-500/30 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
                </div>
                <div className="text-gray-300 text-sm font-medium">Security</div>
              </div>
              <div className="text-center group">
                <div className="p-4 bg-orange-500/20 rounded-xl border border-orange-500/30 group-hover:scale-110 transition-transform">
                  <Globe className="h-8 w-8 text-orange-400 mx-auto mb-3" />
                </div>
                <div className="text-gray-300 text-sm font-medium">Cloud</div>
              </div>
              <div className="text-center group">
                <div className="p-4 bg-red-500/20 rounded-xl border border-red-500/30 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-red-400 mx-auto mb-3" />
                </div>
                <div className="text-gray-300 text-sm font-medium">Community</div>
              </div>
              <div className="text-center group">
                <div className="p-4 bg-yellow-500/20 rounded-xl border border-yellow-500/30 group-hover:scale-110 transition-transform">
                  <Award className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                </div>
                <div className="text-gray-300 text-sm font-medium">Quality</div>
              </div>
            </div>
          </div>

          {/* Professional CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Join Our Journey</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              We're always looking for talented people who share our vision. 
              Whether you're a developer, designer, or just passionate about AI, 
              we'd love to hear from you.
            </p>
            <div className="flex justify-center gap-6">
              <Link href="/careers">
                <Button className="bg-linear-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-medium shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 group">
                  <Rocket className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  View Open Positions
                  <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-300 px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 group">
                  <Mail className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}