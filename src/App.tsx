import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Users, Briefcase, BarChart, 
  Search, Mail, Phone, MapPin, ArrowRight, Star, 
  Calendar, CheckCircle, Quote, Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';

// --- Types ---
interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  image: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
}

interface CaseStudy {
  id: string;
  client: string;
  challenge: string;
  solution: string;
  before: string;
  after: string;
}

// --- Data ---
const IMAGES = {
  hero: "https://storage.googleapis.com/dala-staging-public-data-storage/generated-images/692e25a5-17d1-40f2-a204-9773ad77e53c/hero-bg-f8636a8a-1770825261087.webp",
  about: "https://storage.googleapis.com/dala-staging-public-data-storage/generated-images/692e25a5-17d1-40f2-a204-9773ad77e53c/about-us-team-9d4ce70f-1770825261175.webp",
  team: [
    "https://storage.googleapis.com/dala-staging-public-data-storage/generated-images/692e25a5-17d1-40f2-a204-9773ad77e53c/team-1-9efabc51-1770825266129.webp",
    "https://storage.googleapis.com/dala-staging-public-data-storage/generated-images/692e25a5-17d1-40f2-a204-9773ad77e53c/team-2-545cefbc-1770825261373.webp",
    "https://storage.googleapis.com/dala-staging-public-data-storage/generated-images/692e25a5-17d1-40f2-a204-9773ad77e53c/team-3-e2ff3494-1770825261414.webp"
  ],
  services: [
    "https://storage.googleapis.com/dala-staging-public-data-storage/generated-images/692e25a5-17d1-40f2-a204-9773ad77e53c/service-consulting-f8ce78b5-1770825260863.webp",
    "https://storage.googleapis.com/dala-staging-public-data-storage/generated-images/692e25a5-17d1-40f2-a204-9773ad77e53c/service-analytics-b5865982-1770825267549.webp",
    "https://storage.googleapis.com/dala-staging-public-data-storage/generated-images/692e25a5-17d1-40f2-a204-9773ad77e53c/service-digital-cfa52986-1770825260770.webp"
  ]
};

const SERVICES: Service[] = [
  {
    id: 'consulting',
    title: "Strategic Consulting",
    description: "Expert guidance to navigate complex market dynamics and drive sustainable growth.",
    icon: <Briefcase className="w-6 h-6" />,
    features: ["Market Analysis", "Risk Assessment", "Operational Efficiency"],
    image: IMAGES.services[0]
  },
  {
    id: 'analytics',
    title: "Data Analytics",
    description: "Transform raw data into actionable insights with our advanced analytical tools.",
    icon: <BarChart className="w-6 h-6" />,
    features: ["Predictive Modeling", "Real-time Dashboards", "Big Data Architecture"],
    image: IMAGES.services[1]
  },
  {
    id: 'digital',
    title: "Digital Transformation",
    description: "Modernize your operations with cutting-edge technology and cloud solutions.",
    icon: <Layout className="w-6 h-6" />,
    features: ["Cloud Migration", "AI Integration", "Legacy System Updates"],
    image: IMAGES.services[2]
  }
];

const TEAM: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Chief Strategy Officer",
    image: IMAGES.team[0],
    bio: "With 15 years of experience in Fortune 500 consulting, Sarah leads our strategic vision."
  },
  {
    name: "Marcus Thorne",
    role: "Head of Innovation",
    image: IMAGES.team[1],
    bio: "Former tech founder with a passion for disruptive technology and digital growth."
  },
  {
    name: "David Miller",
    role: "Principal Advisor",
    image: IMAGES.team[2],
    bio: "Expert in corporate governance and global market expansion strategies."
  }
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "The Future of AI in Enterprise Strategy",
    excerpt: "How generative AI is reshaping the way corporate leaders approach long-term planning.",
    category: "Technology",
    date: "Oct 12, 2023",
    author: "Sarah Chen"
  },
  {
    id: '2',
    title: "Sustainable Business Practices in 2024",
    excerpt: "Why ESG reporting is no longer optional for modern corporations.",
    category: "Corporate",
    date: "Nov 05, 2023",
    author: "David Miller"
  },
  {
    id: '3',
    title: "Remote Work and Team Cohesion",
    excerpt: "Strategies for maintaining culture in a hybrid and global workspace.",
    category: "Leadership",
    date: "Dec 01, 2023",
    author: "Marcus Thorne"
  }
];

const TIMELINE = [
  { year: "2010", title: "Inception", desc: "Founded in San Francisco with a vision to modernize consulting." },
  { year: "2015", title: "Global Expansion", desc: "Opened offices in London and Singapore to serve international clients." },
  { year: "2019", title: "Tech Integration", desc: "Launched our proprietary data analytics platform." },
  { year: "2023", title: "Sustainability Leader", desc: "Certified as a carbon-neutral consulting firm." }
];

const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    client: "Global Logistics Corp",
    challenge: "Inefficient supply chain leading to 15% revenue leakage annually.",
    solution: "Implemented IoT-based tracking and predictive maintenance algorithms.",
    before: "Manual tracking, 72h delay",
    after: "Real-time data, <2h delay"
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Team', href: '#team' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className={`text-2xl font-bold tracking-tighter ${isScrolled ? 'text-blue-900' : 'text-white'}`}>
              NEXUS<span className="text-blue-500">CORP</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${isScrolled ? 'text-slate-700' : 'text-white/90'}`}
              >
                {link.name}
              </a>
            ))}
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={isScrolled ? 'text-slate-900' : 'text-white'}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="block text-lg font-medium text-slate-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={IMAGES.hero} 
          alt="Modern Architecture" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
            Pioneering Corporate Excellence
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Transforming vision into <span className="text-blue-400">measurable impact</span>
          </h1>
          <p className="text-xl text-blue-100/80 mb-10 leading-relaxed">
            NexusCorp provides the strategic backbone for global enterprises seeking to lead in a rapidly evolving digital landscape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 group">
              Consult with us <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
              View Case Studies
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={IMAGES.about} alt="Our Team" className="w-full h-[600px] object-cover" />
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-blue-600 p-10 rounded-2xl text-white hidden md:block">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-sm font-medium opacity-80">Years of Industry<br />Excellence</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">About NexusCorp</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">
              We build the bridge between corporate ambition and technological reality.
            </h3>
            <p className="text-lg text-slate-600 mb-8">
              NexusCorp was founded on the principle that strategy without execution is just a daydream. We partner with leaders to solve their most complex challenges and seize their greatest opportunities.
            </p>
            
            <div className="space-y-4 mb-10">
              {['Data-driven decision making', 'Human-centric design', 'Agile implementation methodologies'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="bg-blue-100 p-1 rounded-full">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-10">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-slate-900">500+</div>
                  <div className="text-sm text-slate-500">Global Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">98%</div>
                  <div className="text-sm text-slate-500">Retention Rate</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Our Expertise</h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-6">Comprehensive solutions for modern business</h3>
          <p className="text-slate-600 text-lg">
            We provide specialized services across three core pillars to ensure holistic growth and efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="h-48 overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Timeline = () => {
  return (
    <section className="py-24 bg-blue-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4">Our History</h2>
          <h3 className="text-4xl font-bold mb-6">A decade of driving change</h3>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-800" />
          <div className="grid lg:grid-cols-4 gap-8">
            {TIMELINE.map((item, idx) => (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative"
              >
                <div className="hidden lg:block absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-blue-900 z-10" />
                <div className="bg-blue-800/50 p-8 rounded-2xl border border-blue-700 hover:bg-blue-800 transition-colors">
                  <span className="text-3xl font-black text-blue-400 mb-4 block">{item.year}</span>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-blue-100/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Executive Leadership</h2>
            <h3 className="text-4xl font-bold text-slate-900">Guided by visionaries, fueled by experts</h3>
          </div>
          <button className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            Join our team <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {TEAM.map((member, idx) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden mb-6">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">{member.name}</h4>
              <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
              <p className="text-slate-600 leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudies = () => {
  const [activeCase, setActiveCase] = useState(0);

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4">Success Stories</h2>
          <h3 className="text-4xl font-bold">Tangible results for global leaders</h3>
        </div>

        {CASE_STUDIES.map((cs) => (
          <div key={cs.id} className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-blue-800/30 p-8 rounded-2xl border border-blue-700">
                <span className="text-blue-400 font-bold text-xs uppercase tracking-widest">The Challenge</span>
                <p className="mt-2 text-xl">{cs.challenge}</p>
              </div>
              <div className="bg-blue-500/10 p-8 rounded-2xl border border-blue-500/20">
                <span className="text-blue-400 font-bold text-xs uppercase tracking-widest">The Solution</span>
                <p className="mt-2 text-xl">{cs.solution}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 p-8 rounded-2xl text-center">
                <span className="text-slate-400 text-xs uppercase font-bold">Before</span>
                <div className="mt-4 text-2xl font-bold text-slate-300">{cs.before}</div>
              </div>
              <div className="bg-blue-600 p-8 rounded-2xl text-center">
                <span className="text-blue-200 text-xs uppercase font-bold">After</span>
                <div className="mt-4 text-2xl font-bold text-white">{cs.after}</div>
              </div>
              <div className="col-span-2 bg-slate-800/50 p-12 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-400 mb-2">32%</div>
                  <div className="text-slate-400 font-medium">Efficiency Increase</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const BlogSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Insights & News</h2>
            <h3 className="text-4xl font-bold text-slate-900">Thoughts on the future of business</h3>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="mb-6 overflow-hidden rounded-2xl bg-slate-100 aspect-[16/10] relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                    {post.category}
                  </span>
                </div>
                <div className="w-full h-full group-hover:scale-105 transition-transform duration-500 bg-gradient-to-br from-blue-500 to-blue-900" />
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                <span>•</span>
                <span>{post.author}</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! Our team will contact you shortly.");
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Contact Us</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-8">Ready to elevate your business?</h3>
            <p className="text-slate-600 mb-12 text-lg">
              Get in touch with our expert advisors to discuss how NexusCorp can help your organization reach its full potential.
            </p>

            <div className="space-y-6">
              {[
                { icon: <Phone className="w-6 h-6" />, title: "Call Us", val: "+1 (555) NEXUS-01" },
                { icon: <Mail className="w-6 h-6" />, title: "Email Us", val: "solutions@nexuscorp.com" },
                { icon: <MapPin className="w-6 h-6" />, title: "Visit Us", val: "100 Innovation Way, San Francisco, CA" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{item.title}</div>
                    <div className="text-lg font-bold text-slate-900">{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">First Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Last Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Work Email</label>
                <input required type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Message</label>
                <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-bold tracking-tighter mb-6 block">
              NEXUS<span className="text-blue-500">CORP</span>
            </span>
            <p className="text-slate-400 text-sm leading-relaxed">
              Global leaders in corporate strategy and digital transformation. Empowering businesses to thrive in the modern age.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-6">Services</h5>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-blue-400">Strategy Consulting</a></li>
              <li><a href="#" className="hover:text-blue-400">Digital Transformation</a></li>
              <li><a href="#" className="hover:text-blue-400">Data Analytics</a></li>
              <li><a href="#" className="hover:text-blue-400">Cybersecurity</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">Company</h5>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400">Newsroom</a></li>
              <li><a href="#" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6">Newsletter</h5>
            <p className="text-slate-400 text-sm mb-4">Stay updated with our latest industry insights.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full" />
              <button className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700"><ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:row-reverse md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Settings</a>
          </div>
          <p>© 2023 NexusCorp Global Holdings. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Toaster position="top-center" />
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <ServicesSection />
      <CaseStudies />
      <TeamSection />
      <BlogSection />
      <Contact />
      <Footer />
    </div>
  );
}