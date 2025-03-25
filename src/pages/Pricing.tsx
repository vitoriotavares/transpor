import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Definindo tipos para maior segurança
type BillingCycle = 'monthly' | 'annual';

interface PriceStructure {
  monthly: string;
  annual: string;
  annualPerMonth?: string;
  discount?: string;
}

interface PlanLimits {
  transcriptionHours: number;
  translationHours: number;
  languages: string[];
  storageTime: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: PriceStructure;
  features: string[];
  limits: PlanLimits;
  popular?: boolean;
}

// Planos de assinatura com modelo híbrido
const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: {
      monthly: '$0',
      annual: '$0',
    },
    features: [
      '3 hours of transcription per month',
      'English language only',
      'No translation support',
      'Basic audio quality',
      'TXT export only',
      '7-day storage',
    ],
    limits: {
      transcriptionHours: 3,
      translationHours: 0,
      languages: ['English'],
      storageTime: '7 days',
    },
  },
  {
    id: 'basic',
    name: 'Basic',
    price: {
      monthly: '$14.99/month',
      annual: '$149.90/year',
      annualPerMonth: '$12.49/month',
      discount: '17%',
    },
    features: [
      '10 hours of transcription per month',
      '5 languages for transcription',
      '3 hours of translation per month',
      'Enhanced audio quality',
      'TXT and SRT export',
      '3-month storage',
    ],
    limits: {
      transcriptionHours: 10,
      translationHours: 3,
      languages: ['English', 'Spanish', 'French', 'German', 'Portuguese'],
      storageTime: '3 months',
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: {
      monthly: '$29.99/month',
      annual: '$287.90/year',
      annualPerMonth: '$23.99/month',
      discount: '20%',
    },
    features: [
      '30 hours of transcription per month',
      '10 languages for transcription',
      '15 hours of translation per month',
      'Premium audio quality',
      'Basic speaker identification',
      'All export formats',
      '1-year storage',
    ],
    limits: {
      transcriptionHours: 30,
      translationHours: 15,
      languages: ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Japanese', 'Chinese', 'Russian', 'Arabic'],
      storageTime: '1 year',
    },
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: {
      monthly: '$79.99/month',
      annual: '$719.90/year',
      annualPerMonth: '$59.99/month',
      discount: '25%',
    },
    features: [
      '100 hours of transcription per month',
      'All available languages',
      '50 hours of translation per month',
      'Advanced speaker identification',
      'Custom vocabulary support',
      'API access',
      'Unlimited storage',
    ],
    limits: {
      transcriptionHours: 100,
      translationHours: 50,
      languages: ['All supported languages'],
      storageTime: 'Unlimited',
    },
  },
];

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Choose the perfect plan for your podcast transcription needs
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-12">
          <div className="relative flex items-center bg-gray-100 rounded-lg p-1 w-72">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
                billingCycle === 'monthly'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
                billingCycle === 'annual'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Annual billing
              <span className="ml-1 text-xs font-bold text-green-500">Save up to 25%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-indigo-500 text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                
                {billingCycle === 'monthly' ? (
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {plan.price.monthly.split('/')[0]}
                    </span>
                    <span className="ml-1 text-xl font-semibold text-gray-500">/month</span>
                  </div>
                ) : (
                  <div className="mt-4">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-extrabold text-gray-900">
                        {plan.price.annual.split('/')[0]}
                      </span>
                      <span className="ml-1 text-xl font-semibold text-gray-500">/year</span>
                    </div>
                    {plan.id !== 'free' && (
                      <div className="mt-1">
                        <p className="text-sm text-gray-500">{plan.price.annualPerMonth} billed annually</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-1">
                          Save {plan.price.discount}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                <p className="mt-6 text-gray-500 text-sm">
                  {plan.id === 'free' ? 'Perfect for trying out our services' : 
                   plan.id === 'basic' ? 'Great for occasional podcasters' :
                   plan.id === 'pro' ? 'Ideal for regular podcasters' :
                   'For professional podcast studios'}
                </p>
                
                <Link
                  to="/signup"
                  className={`mt-8 block w-full px-4 py-3 text-center rounded-md shadow ${
                    plan.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                  } font-medium`}
                >
                  {plan.id === 'free' ? 'Start for free' : 'Start free trial'}
                </Link>
              </div>
              
              <div className="px-6 pt-6 pb-8 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Usage Pricing */}
        <div className="mt-16 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Usage Pricing</h3>
            <p className="text-sm text-gray-500 mb-6">If you exceed your plan limits, the following rates will apply:</p>
            
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">Service</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rate</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="py-4 pl-6 pr-3 text-sm text-gray-500">Additional Transcription</td>
                    <td className="px-3 py-4 text-sm font-medium text-gray-900">$1.50 per hour</td>
                    <td className="px-3 py-4 text-sm text-gray-500">Charged only for what you use</td>
                  </tr>
                  <tr>
                    <td className="py-4 pl-6 pr-3 text-sm text-gray-500">Additional Translation</td>
                    <td className="px-3 py-4 text-sm font-medium text-gray-900">$2.50 per hour per language</td>
                    <td className="px-3 py-4 text-sm text-gray-500">High-quality machine translation</td>
                  </tr>
                  <tr>
                    <td className="py-4 pl-6 pr-3 text-sm text-gray-500">Additional Storage</td>
                    <td className="px-3 py-4 text-sm font-medium text-gray-900">$0.05 per GB per month</td>
                    <td className="px-3 py-4 text-sm text-gray-500">Secure cloud storage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">What happens when I exceed my plan limits?</h3>
              <p className="text-gray-500">When you exceed your plan's included hours, you'll be charged at the additional usage rates. We'll always notify you before charging any overages.</p>
            </div>
            
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Can I change my plan at any time?</h3>
              <p className="text-gray-500">Yes, you can upgrade or downgrade your plan at any time. When upgrading, changes take effect immediately. When downgrading, changes take effect at the end of your billing cycle.</p>
            </div>
            
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">How does the free trial work?</h3>
              <p className="text-gray-500">All paid plans come with a 14-day free trial. You won't be charged until the trial ends, and you can cancel anytime before then with no obligation.</p>
            </div>
            
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-500">We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with our service, contact our support team within 30 days of your purchase for a full refund.</p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Ready to transform your podcast workflow?</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Join thousands of podcasters who are saving time and reaching global audiences with Dicta's transcription and translation services.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/signup"
              className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get started for free
            </Link>
            <Link
              to="/contact"
              className="ml-4 px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
            >
              Contact sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
