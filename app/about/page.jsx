import { CheckCircle, Award, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
  const stats = [
    {
      number: "10+",
      label: "Years Experience",
      icon: <Award className="h-6 w-6" />,
    },
    {
      number: "10,000+",
      label: "Happy Customers",
      icon: <Users className="h-6 w-6" />,
    },
    {
      number: "25MW+",
      label: "Solar Installed",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      number: "99%",
      label: "Customer Satisfaction",
      icon: <CheckCircle className="h-6 w-6" />,
    },
  ];

  const values = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Innovation",
      description:
        "Pioneering solar technology for maximum efficiency and sustainability.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "Uncompromising quality in every product and interaction.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Integrity",
      description: "Transparent, honest relationships built on trust.",
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Reliability",
      description: "Dependable solutions that stand the test of time.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/60 z-10"></div>
            <Image
              src="/images/solar-panels-field.jpg"
              alt="Solar panels in field"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="container mx-auto px-6 relative z-20">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Powering the Future{" "}
                <span className="text-primary">Responsibly</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                For over a decade, we've been at the forefront of renewable
                energy solutions, delivering premium solar technology with
                uncompromising integrity.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 uppercase text-sm tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="text-sm font-medium text-primary tracking-wider">
                    OUR JOURNEY
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Building Sustainable Legacies
                  </h2>
                </div>
                <div className="space-y-6 text-gray-700">
                  <p>
                    Founded in 2014 by renewable energy pioneers, SolarTech Pro
                    emerged from a shared vision to democratize access to clean
                    energy. What began as a modest operation has flourished into
                    an industry leader through relentless innovation and
                    customer-first values.
                  </p>
                  <p>
                    Our growth mirrors the solar industry's evolution, yet we've
                    maintained the agility and personal touch of our startup
                    days. Each installation represents not just kilowatts
                    generated, but relationships built and futures transformed.
                  </p>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/team-installation.jpg"
                  alt="Solar installation team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-primary tracking-wider">
                OUR PHILOSOPHY
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                Principles That Illuminate Our Path
              </h2>
              <p className="text-gray-600">
                These core tenets guide every decision, product selection, and
                customer interaction.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white overflow-hidden relative">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-white/10"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our Enduring Promise
                </h2>
                <p className="text-lg text-white/90 leading-relaxed mb-8">
                  To accelerate the global transition to renewable energy
                  through innovative solutions, educational empowerment, and
                  partnerships that redefine sustainable living.
                </p>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <p className="italic text-white/90">
                    "We measure success not just in megawatts installed, but in
                    communities transformed and environmental impact achieved
                    through collective action."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
