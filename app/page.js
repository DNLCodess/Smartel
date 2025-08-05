"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Zap,
  Shield,
  Truck,
  HeadphonesIcon,
  Star,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import useStore from "@/store/useStore";

export default function HomePage() {
  const { getFeaturedProducts } = useStore();
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Power Your Future with
                <span className="text-yellow-300"> Solar Energy</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Discover premium solar panels, batteries, and complete energy
                solutions. Join thousands of satisfied customers in the
                renewable energy revolution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
                  >
                    Shop Now
                    {/* <ArrowRight className="ml-2 h-5 w-5" /> */}
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="relative z-10">
                <Image
                  src="https://images.pexels.com/photos/9875442/pexels-photo-9875442.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Solar panels installation"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-300 rounded-full opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-white rounded-full opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Why Choose SolarTech Pro?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide industry-leading solar solutions with unmatched quality
              and support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="h-12 w-12 text-primary" />,
                title: "High Efficiency",
                description:
                  "Premium solar panels with up to 22% efficiency for maximum power generation",
              },
              {
                icon: <Shield className="h-12 w-12 text-primary" />,
                title: "25-Year Warranty",
                description:
                  "Industry-leading warranty coverage for complete peace of mind",
              },
              {
                icon: <Truck className="h-12 w-12 text-primary" />,
                title: "Free Delivery",
                description:
                  "Complimentary shipping on all orders over $500 nationwide",
              },
              {
                icon: <HeadphonesIcon className="h-12 w-12 text-primary" />,
                title: "Expert Support",
                description:
                  "24/7 technical support from certified solar professionals",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow p-6 border-0 shadow-md"
              >
                <CardContent className="space-y-4">
                  <div className="mx-auto w-fit p-3 bg-primary/10 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular solar products, trusted by thousands of
              customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4"
              >
                View All Products
                {/* <ArrowRight className="ml-2 h-5 w-5" /> */}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Happy Customers" },
              { number: "25MW+", label: "Solar Installed" },
              { number: "500+", label: "Projects Completed" },
              { number: "99%", label: "Customer Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Read reviews from satisfied customers who've made the switch to
              solar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                location: "California",
                text: "Excellent products and amazing customer service. My solar system has been working flawlessly for over a year!",
                rating: 5,
              },
              {
                name: "Mike Chen",
                location: "Texas",
                text: "Great quality solar panels at competitive prices. The installation guide was very helpful and detailed.",
                rating: 5,
              },
              {
                name: "Emily Davis",
                location: "Florida",
                text: "Fast shipping and professional support. Highly recommend SolarTech Pro for anyone going solar!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 border-0 shadow-md">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">Ready to Go Solar?</h2>
            <p className="text-xl text-blue-100">
              Join thousands of satisfied customers and start saving with
              renewable energy today. Get expert advice and premium products
              delivered to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
                >
                  Shop Solar Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
                >
                  Get Free Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
