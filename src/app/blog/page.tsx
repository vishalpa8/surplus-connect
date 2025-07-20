import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="bg-white">
      <main className="py-20 sm:py-28">
        <div className="container-custom">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">SurplusConnect Blog</h1>
            <p className="text-xl text-gray-600">
              Stories, insights, and updates from our mission to reduce food waste and build stronger communities.
            </p>
          </div>

          {/* Featured Post */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="card p-8 bg-gradient-to-br from-primary-50 to-secondary-50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mb-4">
                    Featured Post
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    The Hidden Cost of Food Waste: More Than Just Money
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Exploring the environmental, social, and economic impacts of food waste, and how technology platforms like SurplusConnect are making a difference in communities across the country.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span>December 15, 2024</span>
                    <span>•</span>
                    <span>5 min read</span>
                    <span>•</span>
                    <span>Sustainability</span>
                  </div>
                  <button className="btn btn-primary">
                    Read Full Article
                  </button>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-soft-md">
                  <div className="h-48 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600">Featured Image</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Categories */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-4 py-2 rounded-full bg-primary-600 text-white font-medium">
                All Posts
              </button>
              <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200">
                Sustainability
              </button>
              <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200">
                Community Impact
              </button>
              <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200">
                Technology
              </button>
              <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200">
                Food Rescue
              </button>
              <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200">
                Company News
              </button>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Blog Post 1 */}
              <article className="card p-6 card-hover">
                <div className="h-48 bg-gradient-to-br from-green-200 to-green-300 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-green-700">Article Image</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">Sustainability</span>
                  <span>Dec 10, 2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  5 Simple Ways Restaurants Can Reduce Food Waste
                </h3>
                <p className="text-gray-600 mb-4">
                  Practical tips for restaurant owners to minimize waste, save money, and contribute to environmental sustainability.
                </p>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  Read More →
                </button>
              </article>

              {/* Blog Post 2 */}
              <article className="card p-6 card-hover">
                <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-blue-700">Article Image</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Community Impact</span>
                  <span>Dec 5, 2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  How NGOs Are Using Technology to Fight Hunger
                </h3>
                <p className="text-gray-600 mb-4">
                  Stories from our NGO partners about how digital platforms are transforming food rescue operations.
                </p>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  Read More →
                </button>
              </article>

              {/* Blog Post 3 */}
              <article className="card p-6 card-hover">
                <div className="h-48 bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-purple-700">Article Image</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">Technology</span>
                  <span>Nov 28, 2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Building a Platform for Social Good: Our Tech Stack
                </h3>
                <p className="text-gray-600 mb-4">
                  A behind-the-scenes look at the technology powering SurplusConnect and our commitment to open source.
                </p>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  Read More →
                </button>
              </article>

              {/* Blog Post 4 */}
              <article className="card p-6 card-hover">
                <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-orange-700">Article Image</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full">Food Rescue</span>
                  <span>Nov 20, 2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  The Consumer&apos;s Guide to Surplus Food Shopping
                </h3>
                <p className="text-gray-600 mb-4">
                  Everything you need to know about finding, purchasing, and enjoying surplus food safely and sustainably.
                </p>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  Read More →
                </button>
              </article>

              {/* Blog Post 5 */}
              <article className="card p-6 card-hover">
                <div className="h-48 bg-gradient-to-br from-red-200 to-red-300 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-red-700">Article Image</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full">Company News</span>
                  <span>Nov 15, 2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Celebrating Our First Year: 2024 Impact Report
                </h3>
                <p className="text-gray-600 mb-4">
                  Looking back at our achievements in 2024 and the communities we&apos;ve served together.
                </p>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  Read More →
                </button>
              </article>

              {/* Blog Post 6 */}
              <article className="card p-6 card-hover">
                <div className="h-48 bg-gradient-to-br from-teal-200 to-teal-300 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-teal-700">Article Image</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full">Sustainability</span>
                  <span>Nov 8, 2024</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  The Environmental Impact of Food Waste: By the Numbers
                </h3>
                <p className="text-gray-600 mb-4">
                  Understanding the carbon footprint of food waste and how small actions can make a big difference.
                </p>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  Read More →
                </button>
              </article>
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="btn btn-outline">
                Load More Articles
              </button>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-4xl mx-auto mt-20">
            <div className="card p-8 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="text-primary-100 mb-6">
                Get the latest stories and insights delivered to your inbox. Join our community of changemakers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="btn btn-secondary">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}