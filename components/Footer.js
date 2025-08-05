import Link from 'next/link';
import { Sun, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sun className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">SolarTech Pro</span>
            </div>
            <p className="text-gray-300 text-sm">
              Leading provider of premium solar products and renewable energy solutions. 
              Powering a sustainable future with quality and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=Solar Panels" className="text-gray-300 hover:text-primary transition-colors">
                  Solar Panels
                </Link>
              </li>
              <li>
                <Link href="/products?category=Batteries" className="text-gray-300 hover:text-primary transition-colors">
                  Batteries
                </Link>
              </li>
              <li>
                <Link href="/products?category=Inverters" className="text-gray-300 hover:text-primary transition-colors">
                  Inverters
                </Link>
              </li>
              <li>
                <Link href="/products?category=Controllers" className="text-gray-300 hover:text-primary transition-colors">
                  Controllers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-gray-300">info@solartechpro.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-gray-300">
                  123 Solar Street<br />
                  Green City, GC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-600 text-center text-sm text-gray-300">
          <p>&copy; 2024 SolarTech Pro. All rights reserved. Built with sustainable technology.</p>
        </div>
      </div>
    </footer>
  );
}