'use client';

import Link from 'next/link';
import { HandHeart, LogIn, UserPlus, Mail, Shield, Smartphone, Users, CheckCircle, AlertTriangle, Eye, Lock, Database, Navigation, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AuthDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-primary-50 to-secondary-50 py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <Link href="/" className="inline-flex items-center gap-3 group mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-white transition-transform group-hover:scale-105">
              <HandHeart className="h-8 w-8" />
            </div>
            <span className="font-display text-3xl font-bold text-gray-800">
              Surplus<span className="text-primary-600">Connect</span>
            </span>
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔐 Complete Authentication & Dashboard System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our fully integrated authentication system with intelligent role detection, secure middleware protection, and role-specific dashboards for all user types.
          </p>
        </div>

        {/* System Overview */}
        <div className="bg-white rounded-2xl shadow-soft-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            🏗️ Complete System Architecture
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Authentication
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Smart login without role selection</li>
                <li>• Multi-step registration</li>
                <li>• Real-time email validation</li>
                <li>• Password strength enforcement</li>
                <li>• Demo account quick-fill</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Navigation className="h-5 w-5 text-blue-600" />
                Middleware Protection
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Route-based access control</li>
                <li>• Role-specific redirects</li>
                <li>• Session validation</li>
                <li>• Automatic dashboard routing</li>
                <li>• Public route allowance</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-600" />
                Role-Based Dashboards
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Consumer dashboard</li>
                <li>• Vendor management panel</li>
                <li>• NGO coordination center</li>
                <li>• Role-specific features</li>
                <li>• Personalized content</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-orange-600" />
                User Management
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Profile management</li>
                <li>• Account settings</li>
                <li>• Cross-role navigation</li>
                <li>• Secure logout</li>
                <li>• Session persistence</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Demo Accounts */}
        <div className="bg-white rounded-2xl shadow-soft-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            🎮 Test Accounts & User Flows
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">Consumer Account</h3>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <p><strong>Email:</strong> consumer@example.com</p>
                <p><strong>Password:</strong> password123</p>
                <p><strong>Dashboard:</strong> /dashboard</p>
              </div>
              <div className="space-y-2 text-xs text-gray-600">
                <p>• Browse available food listings</p>
                <p>• Track rescued items and savings</p>
                <p>• View nearby vendors on map</p>
                <p>• Manage profile and preferences</p>
              </div>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900">Vendor Account</h3>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <p><strong>Email:</strong> vendor@example.com</p>
                <p><strong>Password:</strong> password123</p>
                <p><strong>Dashboard:</strong> /dashboard/vendor</p>
              </div>
              <div className="space-y-2 text-xs text-gray-600">
                <p>• Manage surplus food listings</p>
                <p>• Track sales and revenue</p>
                <p>• View customer interactions</p>
                <p>• Analytics and performance</p>
              </div>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <HandHeart className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900">NGO Account</h3>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <p><strong>Email:</strong> ngo@example.com</p>
                <p><strong>Password:</strong> password123</p>
                <p><strong>Dashboard:</strong> /dashboard/ngo</p>
              </div>
              <div className="space-y-2 text-xs text-gray-600">
                <p>• Request food donations</p>
                <p>• Coordinate distributions</p>
                <p>• Manage volunteers</p>
                <p>• Track community impact</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-soft-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6 text-green-600" />
              Security & Protection
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Middleware Protection</h4>
                  <p className="text-sm text-gray-600">Route-level access control with role validation</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Session Management</h4>
                  <p className="text-sm text-gray-600">Secure cookie-based authentication with persistence</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Role-Based Access</h4>
                  <p className="text-sm text-gray-600">Automatic redirection to appropriate dashboards</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Error Handling</h4>
                  <p className="text-sm text-gray-600">Comprehensive error scenarios with recovery</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Navigation className="h-6 w-6 text-blue-600" />
              Smart Routing System
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Intelligent Redirects</h4>
                  <p className="text-sm text-gray-600">Users automatically go to their role-specific areas</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Public Route Access</h4>
                  <p className="text-sm text-gray-600">Landing pages accessible without authentication</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Cross-Role Navigation</h4>
                  <p className="text-sm text-gray-600">Seamless movement between different sections</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Session Validation</h4>
                  <p className="text-sm text-gray-600">Continuous authentication state checking</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Flow Testing */}
        <div className="bg-white rounded-2xl shadow-soft-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            🧪 Test User Flows
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Authentication Flow</h3>
              <ol className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>Visit login page and use demo credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>System detects role and redirects to appropriate dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span>Try accessing other role dashboards (automatic redirect)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <span>Visit profile page (accessible to all roles)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                  <span>Logout and try accessing protected routes</span>
                </li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Registration Flow</h3>
              <ol className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>Start registration with existing email (see error)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>Try weak password (see validation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span>Complete multi-step form with valid data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <span>Review account summary before submission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                  <span>Account created and redirected to dashboard</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Demo Links */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            🚀 Try the Complete System
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Login Demo */}
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <LogIn className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Login</h3>
              <p className="text-sm text-gray-600 mb-4">Intelligent role detection with demo accounts</p>
              <Link href="/auth/login">
                <Button className="w-full" size="sm">
                  Test Login
                </Button>
              </Link>
            </div>

            {/* Register Demo */}
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <UserPlus className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Registration</h3>
              <p className="text-sm text-gray-600 mb-4">Multi-step form with validation</p>
              <Link href="/auth/register">
                <Button variant="secondary" className="w-full" size="sm">
                  Test Register
                </Button>
              </Link>
            </div>

            {/* Dashboard Demo */}
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Dashboards</h3>
              <p className="text-sm text-gray-600 mb-4">Role-specific interfaces</p>
              <Link href="/dashboard">
                <Button variant="soft" className="w-full" size="sm">
                  View Dashboard
                </Button>
              </Link>
            </div>

            {/* Profile Demo */}
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Profile</h3>
              <p className="text-sm text-gray-600 mb-4">Account management</p>
              <Link href="/profile">
                <Button variant="outline" className="w-full" size="sm">
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="mt-16 card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🛠️ Technical Architecture
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Middleware Layer:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Route protection</code></li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Role validation</code></li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Session checking</code></li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Auto redirects</code></li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Cookie management</code></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Authentication:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">AuthContext</code> - Global state</li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Custom errors</code> - Specific handling</li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Real-time validation</code></li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Session persistence</code></li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Demo accounts</code></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">User Interface:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Role dashboards</code></li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Profile management</code></li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Responsive design</code></li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Loading states</code></li>
                <li>• <code className="bg-gray-100 px-2 py-1 rounded">Error boundaries</code></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="outline" size="lg">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}