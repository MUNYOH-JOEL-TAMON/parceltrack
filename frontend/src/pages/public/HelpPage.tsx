import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui';
import { ChevronDown, ChevronUp } from 'lucide-react';

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

          {/* Contact Section */}
          <Card className="mt-12 text-center">
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Still need help?
            </h2>
            <p className="text-text-secondary mb-4">
              Can't find the answer you're looking for? Contact our support team.
            </p>
            <p className="text-primary-600 font-medium">
              support@parceltrack.com
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};
