import React, { useState } from 'react';
import { 
  Lock, 
  Unlock,
  Calendar,
  Target,
  Users,
  Smartphone,
  CreditCard,
  Gift,
  Fingerprint,
  AlertTriangle,
  Shield,
  TrendingUp,
  Check,
  X,
  ChevronRight,
  Phone,
  BookOpen,
  Building,
  Landmark,
  Map
} from 'lucide-react';

const AdvancedFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [showDemo, setShowDemo] = useState(false);

  // Smart Contract Templates
  const smartUnlockConditions = [
    {
      id: 'education',
      title: 'Education Smart Release',
      description: 'Automatically releases funds to specific school account numbers on fee payment dates',
      conditions: [
        'School fee payment dates verification',
        'Direct school account transfer',
        'Term-based scheduling',
        'Emergency education needs override'
      ]
    },
    {
      id: 'business',
      title: 'Business Milestone Release',
      description: 'Links fund release to verified business milestones and achievements',
      conditions: [
        'KRA payment verification',
        'Business license renewal',
        'Inventory purchase verification',
        'Employee salary disbursement'
      ]
    },
    {
      id: 'chama',
      title: 'Chama Group Controls',
      description: 'Multi-signature requirements based on group constitution and rules',
      conditions: [
        'Member voting system',
        'Emergency fund access',
        'Investment milestone tracking',
        'Member contribution verification'
      ]
    }
  ];

  const features = [
    {
      category: 'Smart Unlock Conditions',
      items: [
        {
          icon: <Calendar className="w-6 h-6" />,
          title: 'Date-Based Triggers',
          description: 'Schedule releases based on specific dates or recurring periods',
          examples: [
            'School fee payment dates',
            'Rent due dates',
            'Business loan repayments',
            'Investment maturity dates'
          ]
        },
        {
          icon: <Target className="w-6 h-6" />,
          title: 'Goal-Based Unlocking',
          description: 'Release funds when specific savings or investment goals are met',
          examples: [
            'Savings target achievement',
            'Investment return thresholds',
            'Business revenue milestones',
            'Group contribution goals'
          ]
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: 'Multi-Party Approval',
          description: 'Require multiple stakeholders to approve fund release',
          examples: [
            'Chama committee approval',
            'Family consensus',
            'Business partner agreement',
            'Group investment decisions'
          ]
        }
      ]
    },
    {
      category: 'Integration Features',
      items: [
        {
          icon: <Smartphone className="w-6 h-6" />,
          title: 'M-PESA Integration',
          description: 'Seamless connection with M-PESA for deposits and withdrawals',
          features: [
            'Direct M-PESA deposits',
            'Scheduled auto-deposits',
            'M-PESA business payments',
            'Till number integration'
          ]
        },
        {
          icon: <Building className="w-6 h-6" />,
          title: 'Bank Integration',
          description: 'Connect with major Kenyan banks for automated transactions',
          features: [
            'Direct bank deposits',
            'Standing orders',
            'Bank transfer on unlock',
            'Account verification'
          ]
        },
        {
          icon: <Landmark className="w-6 h-6" />,
          title: 'Institution Integration',
          description: 'Direct connections with schools, businesses, and organizations',
          features: [
            'School fee direct payment',
            'Business supplier payments',
            'Government service payments',
            'Utility bill payments'
          ]
        }
      ]
    },
    {
      category: 'Smart Features',
      items: [
        {
          icon: <Map className="w-6 h-6" />,
          title: 'Location-Based Controls',
          description: 'Add location verification for certain transactions',
          features: [
            'School location verification',
            'Business premise confirmation',
            'Group meeting location check',
            'Agricultural land verification'
          ]
        },
        {
          icon: <Phone className="w-6 h-6" />,
          title: 'USSD Integration',
          description: 'Manage your wallet without smartphone or internet',
          features: [
            '*XXX# quick balance check',
            'USSD-based approvals',
            'Feature phone compatibility',
            'SMS notifications'
          ]
        },
        {
          icon: <BookOpen className="w-6 h-6" />,
          title: 'Smart Contracts',
          description: 'Automated contract execution based on conditions',
          features: [
            'Business agreements',
            'Payment schedules',
            'Group constitutions',
            'Investment terms'
          ]
        }
      ]
    }
  ];

  const emergencyFeatures = [
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Emergency Access',
      description: 'Verified emergency unlock procedures',
      conditions: [
        'Hospital bill verification',
        'Emergency committee approval',
        'Documentation requirements',
        'Partial release options'
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Backup Access',
      description: 'Secure backup access methods',
      conditions: [
        'Trusted backup contacts',
        'Multi-factor authentication',
        'Legal representative access',
        'Emergency contact verification'
      ]
    }
  ];

  const advancedControls = [
    {
      title: 'Partial Release Controls',
      description: 'Configure staged fund releases based on milestones or dates',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: 'Smart Beneficiary System',
      description: 'Set up automatic transfers to beneficiaries under specific conditions',
      icon: <Gift className="w-6 h-6" />
    },
    {
      title: 'Biometric Authentication',
      description: 'Add fingerprint or face ID verification for critical actions',
      icon: <Fingerprint className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-6">Advanced Time-Lock Features</h1>
            <p className="text-xl text-green-100 mb-8">
              Discover innovative ways to secure and grow your wealth with our smart features
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => setShowDemo(true)}
                className="px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300"
              >
                Try Demo
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Smart Unlock Conditions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Smart Unlock Conditions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {smartUnlockConditions.map((condition) => (
              <div 
                key={condition.id}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-4">{condition.title}</h3>
                <p className="text-gray-600 mb-6">{condition.description}</p>
                <ul className="space-y-3">
                  {condition.conditions.map((item, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Categories */}
        {features.map((category) => (
          <section key={category.category} className="mb-16">
            <h2 className="text-3xl font-bold mb-8">{category.category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setActiveFeature(item)}
                >
                  <div className="text-green-600 mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {(item.features || item.examples)?.slice(0, 2).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-4 text-green-600 text-sm font-medium flex items-center">
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Emergency Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Emergency Access Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {emergencyFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-red-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.conditions.map((condition, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Advanced Controls */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Advanced Controls</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {advancedControls.map((control, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-green-600 mb-4">{control.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{control.title}</h3>
                <p className="text-gray-600">{control.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of Kenyans securing their financial future with smart time-locked wallets
            </p>
            <button className="px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300">
              Create Your Smart Wallet Now
            </button>
          </div>
        </section>
      </div>

      {/* Feature Detail Modal */}
      {activeFeature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="text-green-600 mr-4">{activeFeature.icon}</div>
                <h3 className="text-2xl font-bold">{activeFeature.title}</h3>
              </div>
              <button 
                onClick={() => setActiveFeature(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">{activeFeature.description}</p>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Key Features</h4>
                <ul className="space-y-3">
                  {(activeFeature.features || activeFeature.examples)?.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration
