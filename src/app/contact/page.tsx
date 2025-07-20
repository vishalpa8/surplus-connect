import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mail, Phone, MapPin, Clock, MessageCircle, Headphones } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white">
      <main className="py-20 sm:py-28">
        <div className="container-custom">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600">
              Have a question, feedback, or need support? We&apos;re here to help. Get in touch with our team and we&apos;ll respond as quickly as possible.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      id="firstName"
                      label="First Name"
                      placeholder="John"
                      required
                    />
                    <Input
                      id="lastName"
                      label="Last Name"
                      placeholder="Doe"
                      required
                    />
                  </div>
                  
                  <Input
                    id="email"
                    label="Email Address"
                    type="email"
                    placeholder="john.doe@example.com"
                    required
                  />
                  
                  <div>
                    <label htmlFor="userType" className="form-label">I am a...</label>
                    <select id="userType" className="form-select">
                      <option value="">Select your role</option>
                      <option value="consumer">Consumer</option>
                      <option value="vendor">Vendor</option>
                      <option value="ngo">NGO Representative</option>
                      <option value="partner">Potential Partner</option>
                      <option value="media">Media/Press</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <select id="subject" className="form-select">
                      <option value="">Select a topic</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="media">Media Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      rows={6}
                      className="form-input"
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Contact Methods */}
                <div className="card p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                        <Mail className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Email Support</h3>
                        <p className="text-gray-600 mb-2">support@surplusconnect.com</p>
                        <p className="text-sm text-gray-500">Response within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                        <Phone className="h-6 w-6 text-secondary-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Phone Support</h3>
                        <p className="text-gray-600 mb-2">1-800-SURPLUS</p>
                        <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 6 PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Headphones className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Live Chat</h3>
                        <p className="text-gray-600 mb-2">Available on website</p>
                        <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 6 PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Office Address</h3>
                        <p className="text-gray-600 mb-2">
                          123 Innovation Drive<br />
                          Tech City, TC 12345<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="card p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary-600" />
                    Business Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium text-gray-900">9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium text-gray-900">10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium text-gray-900">Closed</span>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="card p-6 bg-red-50 border-red-200">
                  <h3 className="text-lg font-bold text-red-900 mb-2">Emergency Support</h3>
                  <p className="text-red-700 text-sm mb-3">
                    For urgent food safety concerns or platform emergencies
                  </p>
                  <p className="font-bold text-red-900">1-800-URGENT-1</p>
                  <p className="text-red-600 text-sm">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="max-w-4xl mx-auto mt-16 text-center">
            <div className="card p-8 bg-primary-50">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Looking for quick answers?</h2>
              <p className="text-gray-600 mb-6">
                Check out our FAQ section for immediate answers to common questions.
              </p>
              <a href="/faq" className="btn btn-primary">
                Visit FAQ
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}