import { Button } from "@/components/ui/Button";
import { CheckCircle, Users, Target, Heart, Leaf, TrendingUp, Globe, ArrowRight, Award, Lightbulb, Shield } from "lucide-react";
import Link from "next/link";

const stats = [
  { number: "50,000+", label: "Meals Rescued", icon: Heart },
  { number: "1,200+", label: "Active Users", icon: Users },
  { number: "350+", label: "Partner Vendors", icon: TrendingUp },
  { number: "75+", label: "NGO Partners", icon: Globe },
];

const values = [
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We're committed to reducing food waste and creating a more sustainable food system for future generations.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Heart,
    title: "Community",
    description: "Building stronger communities by connecting people and organizations around a shared mission to fight hunger.",
    color: "bg-red-100 text-red-600"
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Ensuring safe, reliable transactions and maintaining the highest standards of food safety and quality.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Using technology to solve real-world problems and continuously improving our platform based on user feedback.",
    color: "bg-yellow-100 text-yellow-600"
  }
];

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former sustainability consultant with 10+ years experience in food systems and environmental policy.",
    image: "/images/team/sarah-chen.jpg"
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO & Co-Founder",
    bio: "Tech entrepreneur and full-stack developer passionate about using technology for social good.",
    image: "/images/team/marcus-rodriguez.jpg"
  },
  {
    name: "Dr. Emily Watson",
    role: "Head of Partnerships",
    bio: "PhD in Food Science with extensive experience working with NGOs and food rescue organizations.",
    image: "/images/team/emily-watson.jpg"
  },
  {
    name: "David Kim",
    role: "Head of Product",
    bio: "UX designer and product manager focused on creating intuitive experiences for social impact platforms.",
    image: "/images/team/david-kim.jpg"
  }
];

const milestones = [
  {
    year: "2022",
    title: "The Beginning",
    description: "SurplusConnect was founded with a simple mission: connect surplus food with those who need it most."
  },
  {
    year: "2023",
    title: "First 1,000 Users",
    description: "Reached our first major milestone with 1,000 active users and 50 partner vendors across 5 cities."
  },
  {
    year: "2024",
    title: "National Expansion",
    description: "Expanded to 25 cities nationwide and partnered with major food chains and NGO networks."
  },
  {
    year: "2024",
    title: "50,000 Meals Rescued",
    description: "Celebrated rescuing our 50,000th meal, preventing tons of food waste and feeding thousands."
  }
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent via-primary-50 to-secondary-50 pt-24 sm:pt-32 lg:pt-40 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-bold mb-6">
              <Heart className="h-4 w-4" />
              Our Story
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Turning Food Waste into
              <br />
              <span className="text-primary-600">Community Impact</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
              We believe that good food belongs in bellies, not bins. SurplusConnect is bridging the gap between food waste and food insecurity, one meal at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-600 mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-accent py-20 sm:py-28">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-base font-semibold leading-7 text-primary-600">Our Mission</h2>
              <p className="mt-2 font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Building a Sustainable Food Future
              </p>
              <p className="mt-6 text-lg text-gray-600">
                Every day, millions of pounds of perfectly good food go to waste while people in the same communities struggle with food insecurity. This paradox inspired us to create SurplusConnect.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Our platform empowers local communities to fight food waste by connecting food vendors, consumers, and NGOs. We&apos;re not just reducing waste – we&apos;re building stronger, more sustainable communities.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Reduce Food Waste</h3>
                    <p className="text-gray-600">Divert surplus food from landfills to people who need it</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Fight Hunger</h3>
                    <p className="text-gray-600">Make nutritious food accessible to everyone in our communities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Support Local Business</h3>
                    <p className="text-gray-600">Help vendors recover costs and build customer relationships</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="card p-8 bg-white shadow-soft-xl">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 text-white mb-6">
                    <Target className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600 mb-6">
                    A world where no good food goes to waste and every community has access to nutritious, affordable meals.
                  </p>
                  <div className="bg-primary-50 rounded-xl p-4">
                    <p className="text-primary-800 font-medium">
                    &quot;Every meal rescued is a step towards a healthier planet and a stronger community.&quot;
                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Our Values</h2>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              What Drives Us Forward
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our core values guide every decision we make and every feature we build.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card p-6 text-center card-hover">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${value.color} mb-4`}>
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="bg-accent py-20 sm:py-28">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Our Journey</h2>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              From Idea to Impact
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="card p-6 bg-white flex-1">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Our Team</h2>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Meet the People Behind the Mission
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We&apos;re a diverse team of passionate individuals united by our commitment to fighting food waste and building stronger communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card p-6 text-center card-hover">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 py-20 sm:py-28">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
              Making a Real Difference
            </h2>
            <p className="text-xl text-primary-100 mb-12">
              Every day, our platform creates positive impact across three key areas: environmental sustainability, community support, and economic opportunity.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">2,500 lbs</div>
                <div className="text-primary-100">Food Waste Prevented</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">$125K</div>
                <div className="text-primary-100">Saved by Consumers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">$85K</div>
                <div className="text-primary-100">Revenue Recovered by Vendors</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Join Our Mission
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Recognition</h2>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Awards & Partnerships
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-100 text-yellow-600 mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">2024 Green Tech Award</h3>
              <p className="text-gray-600">Recognized for innovative approach to environmental sustainability</p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Community Impact Partner</h3>
              <p className="text-gray-600">Official partner with National Food Recovery Network</p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-600 mb-4">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">B Corp Certified</h3>
              <p className="text-gray-600">Certified for meeting highest standards of social and environmental performance</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}