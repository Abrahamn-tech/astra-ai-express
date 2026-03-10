"use client";
import React from "react";
import Link from "next/link";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Footer from "@/components/custom/Footer";
import { Button } from "@/components/ui/button";
import { Users, Target, Lightbulb, Globe, Award, Heart, Github, Twitter, Linkedin, Mail, ArrowRight, Zap, Shield, Code2 } from "lucide-react";

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
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">About Astra AI</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize software development by making it accessible to everyone through the power of artificial intelligence.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission Section */}
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8 mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Target className="h-12 w-12 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                To empower every person with the ability to create software, regardless of their technical background. 
                We believe that great ideas shouldn't be limited by coding skills, and AI can bridge that gap.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
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
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-2">2023</div>
                  <div className="text-gray-400">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-2">4+</div>
                  <div className="text-gray-400">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-2">24/7</div>
                  <div className="text-gray-400">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-2">99.9%</div>
                  <div className="text-gray-400">Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-3">
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                      <Github className="h-4 w-4" />
                    </a>
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Section */}
          <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Powered by Modern Technology</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div className="text-center">
                <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-gray-300 text-sm">AI/ML</div>
              </div>
              <div className="text-center">
                <Code2 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-gray-300 text-sm">React</div>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-gray-300 text-sm">Security</div>
              </div>
              <div className="text-center">
                <Globe className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-gray-300 text-sm">Cloud</div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <div className="text-gray-300 text-sm">Community</div>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-gray-300 text-sm">Quality</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Join Our Journey</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              We're always looking for talented people who share our vision. 
              Whether you're a developer, designer, or just passionate about AI, 
              we'd love to hear from you.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/careers">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  View Open Positions
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-300">
                  Get in Touch
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
