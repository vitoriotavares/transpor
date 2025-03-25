import React, { useState } from 'react';

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
  current: boolean;
}

// Mock user data
const mockUser = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
  plan: 'pro',
  billingCycle: 'monthly' as BillingCycle,
  joinDate: 'January 15, 2025',
};

// Mock subscription plans with hybrid model
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
    current: false,
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
    current: false,
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
    current: true,
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
    current: false,
  },
];

// Usage statistics
const usageStats = {
  transcriptionHoursUsed: 12.5,
  transcriptionHoursLimit: 30,
  translationHoursUsed: 4.2,
  translationHoursLimit: 15,
  storageUsed: '245 MB',
  storageLimit: '10 GB',
};

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'subscription' | 'usage'>('profile');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  
  // Função para obter o plano atual
  const getCurrentPlan = (): SubscriptionPlan | undefined => {
    return subscriptionPlans.find(plan => plan.current);
  };
  
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-light text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-500">Manage your account and subscription</p>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'subscription'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Subscription
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'usage'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Usage
          </button>
        </nav>
      </div>
      
      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-6">
              <img
                src={mockUser.avatar}
                alt="Profile"
                className="h-16 w-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-medium text-gray-900">{mockUser.name}</h2>
                <p className="text-sm text-gray-500">Member since {mockUser.joinDate}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={mockUser.email}
                    readOnly
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue={mockUser.name}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Subscription Tab */}
      {activeTab === 'subscription' && (
        <div>
          <div className="bg-white shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Current Plan</h2>
              
              <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-indigo-800">
                      {getCurrentPlan()?.name} Plan
                    </span>
                    <p className="text-sm text-indigo-600 mt-1">
                      {getCurrentPlan()?.price[billingCycle]}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Active
                  </span>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Available Plans</h2>
            
            {/* Billing Cycle Toggle */}
            <div className="flex justify-center mb-6">
              <div className="relative flex items-center bg-gray-100 rounded-lg p-1 w-64">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
                    billingCycle === 'monthly'
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
                    billingCycle === 'annual'
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Annual
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {subscriptionPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white shadow rounded-lg overflow-hidden ${
                  plan.current ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                  
                  {billingCycle === 'monthly' ? (
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{plan.price.monthly}</p>
                  ) : (
                    <div>
                      <p className="mt-1 text-2xl font-semibold text-gray-900">{plan.price.annual}</p>
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
                  
                  <ul className="mt-4 space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="flex-shrink-0 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="ml-2 text-sm text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6">
                    {plan.current ? (
                      <button
                        type="button"
                        disabled
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100"
                      >
                        Current Plan
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {plan.id === 'free' ? 'Downgrade to Free' : `Upgrade to ${plan.name}`}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Additional Usage Pricing</h3>
              <p className="text-sm text-gray-500 mb-4">If you exceed your plan limits, the following rates will apply:</p>
              
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Service</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">Additional Transcription</td>
                      <td className="px-3 py-4 text-sm text-gray-500">$1.50 per hour</td>
                    </tr>
                    <tr>
                      <td className="py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">Additional Translation</td>
                      <td className="px-3 py-4 text-sm text-gray-500">$2.50 per hour per language</td>
                    </tr>
                    <tr>
                      <td className="py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">Additional Storage</td>
                      <td className="px-3 py-4 text-sm text-gray-500">$0.05 per GB per month</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Usage Tab */}
      {activeTab === 'usage' && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Usage Statistics</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Transcription Hours Used</span>
                  <span className="text-sm text-gray-500">
                    {usageStats.transcriptionHoursUsed} / {usageStats.transcriptionHoursLimit} hours
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${(usageStats.transcriptionHoursUsed / usageStats.transcriptionHoursLimit) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Translation Hours Used</span>
                  <span className="text-sm text-gray-500">
                    {usageStats.translationHoursUsed} / {usageStats.translationHoursLimit} hours
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${(usageStats.translationHoursUsed / usageStats.translationHoursLimit) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Storage Used</span>
                  <span className="text-sm text-gray-500">
                    {usageStats.storageUsed} / {usageStats.storageLimit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: '2.45%' }} // 245MB of 10GB = 2.45%
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-md font-medium text-gray-900 mb-4">Billing History</h3>
              
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">Mar 1, 2025</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Pro Plan Subscription</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$29.99</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">Feb 1, 2025</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Pro Plan Subscription</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$29.99</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">Feb 15, 2025</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Additional Translation (2.5 hours)</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$6.25</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">Jan 1, 2025</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Basic Plan Subscription</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$14.99</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
