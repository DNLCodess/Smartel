'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `Hello! I'm contacting you through your website.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}`;

    const whatsappNumber = "+1234567890"; // Replace with actual WhatsApp number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      details: ["+1 (555) 123-4567", "Monday - Friday, 9AM - 6PM EST"]
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      details: ["info@solartechpro.com", "support@solartechpro.com"]
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Address",
      details: ["123 Solar Street", "Green City, GC 12345"]
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM", "Sunday: Closed"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="py-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions about our solar products? Need expert advice for your project? 
              We're here to help! Reach out to our friendly team of solar specialists.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us about your solar project or ask any questions..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message via WhatsApp
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    Your message will be sent via WhatsApp for the fastest response time.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-8">
                  We're always happy to help with your solar energy needs. 
                  Contact us through any of the methods below.
                </p>
              </div>

              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-gray-600">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Contact Cards */}
              <div className="space-y-4 mt-8">
                <Card className="border-0 shadow-md bg-gradient-to-r from-primary to-secondary text-white">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Need Immediate Help?</h3>
                    <p className="text-blue-100 mb-4">
                      Our solar experts are available for immediate consultation via WhatsApp.
                    </p>
                    <Button 
                      className="bg-white text-primary hover:bg-gray-100"
                      onClick={() => window.open('https://wa.me/+1234567890?text=Hi! I need immediate help with solar products.', '_blank')}
                    >
                      Chat on WhatsApp
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md bg-green-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2 text-green-800">Free Consultation</h3>
                    <p className="text-green-700 mb-4">
                      Get a free consultation for your solar project. No obligations, just expert advice.
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-green-500 text-green-700 hover:bg-green-100"
                      onClick={() => window.open('https://wa.me/+1234567890?text=Hi! I would like to schedule a free consultation for my solar project.', '_blank')}
                    >
                      Schedule Consultation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}