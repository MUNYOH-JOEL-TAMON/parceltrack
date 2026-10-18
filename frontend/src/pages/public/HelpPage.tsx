import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, Button } from '@/components/ui';
import { ChevronDown, ChevronUp, Headphones, ArrowRight } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How do I track my package?',
    answer: 'Enter your tracking number in the search box on our homepage. You can optionally select your courier, or let us auto-detect it. Click "Track Package" to view your shipment\'s current status and history.',
  },
  {
    question: 'Where can I find my tracking number?',
    answer: 'Your tracking number is provided by the sender in your shipping confirmation email or on your receipt. It\'s typically a combination of letters and numbers unique to your shipment.',
  },
  {
    question: 'Why isn\'t my tracking number working?',
    answer: 'If your tracking number isn\'t found, it may not yet be in the carrier\'s system. This can happen if the shipment was just created. Wait a few hours and try again. Also verify you\'ve entered the correct number and selected the right courier.',
  },
  {
    question: 'How often is tracking information updated?',
    answer: 'Tracking information is updated in real-time as the courier provides new data. Updates typically occur when the package reaches a new location or when its status changes. Some carriers update more frequently than others.',
  },
  {
    question: 'What do the different shipment statuses mean?',
    answer: 'Information Received: Carrier has received the shipping label. In Transit: Package is moving through the carrier network. Out for Delivery: Package is on the delivery vehicle. Delivered: Package has been successfully delivered. Exception: An unexpected event has occurred (e.g., delay, address issue).',
  },
  {
    question: 'My package shows as delivered but I haven\'t received it. What should I do?',
    answer: 'First, check around your property and with neighbors or household members. Packages are sometimes left in safe locations. If you still can\'t find it, contact the courier directly using the tracking number for more details about the delivery location.',
  },
  {
    question: 'Which courier services do you support?',
    answer: 'We support major international and regional carriers including DHL, FedEx, UPS, USPS, Aramex, and many others. Visit our Supported Couriers page for the complete list.',
  },
  {
    question: 'Do I need to create an account to track packages?',
    answer: 'No, package tracking is completely free and doesn\'t require an account. Simply enter your tracking number and view your shipment status immediately.',
  },
  {
    question: 'Can I track international shipments?',
    answer: 'Yes, you can track international shipments from supported carriers. Tracking coverage may vary depending on the origin and destination countries and the specific courier service.',
  },
  {
    question: 'How do I contact support?',
    answer: 'For technical support or questions about using our platform, you can reach us at support@parceltrack.com. For questions about your specific shipment, please contact the courier directly.',
  },
];

export const HelpPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 bg-background-main">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Help Center
            </h1>
            <p className="text-lg text-text-secondary">
              Find answers to commonly asked questions about tracking your packages
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} padding="none">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-primary-50 transition-colors rounded-2xl"
                >
                  <span className="font-semibold text-text-primary pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-text-secondary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-text-secondary flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-text-secondary">
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Professional Contact Section */}
          <Card className="mt-14 p-8 bg-gradient-to-r from-emerald-50/60 via-white to-slate-50 border border-emerald-100 shadow-soft">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Headphones className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">
                    Still need help with a parcel or API?
                  </h2>
                  <p className="text-sm text-slate-600 max-w-md">
                    Our operations dispatch team is available 24/7 to resolve tracking issues and carrier escalations.
                  </p>
                </div>
              </div>

              <Link to="/contact" className="flex-shrink-0">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-sm gap-2">
                  <span>Contact Support Desk</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};
