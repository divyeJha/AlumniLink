import { Heart, Sparkles, ArrowRight, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 mt-auto overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500 to-purple-500 rounded-full -translate-y-48 translate-x-48 floating"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-full translate-y-32 -translate-x-32 floating" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://mocha-cdn.com/019a6f3d-4b97-7d75-8cca-93c91e6d8099/WhatsApp-Image-2025-11-11-at-02.56.59_a5ef63ea.jpg" 
                    alt="AlumniLink Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">AlumniLink</span>
                <p className="text-xs text-slate-400 font-medium tracking-wider uppercase">Connect • Grow • Succeed</p>
              </div>
            </div>
            
            <p className="text-slate-300 text-base mb-6 leading-relaxed max-w-md">
              Connecting alumni worldwide to build meaningful professional relationships and foster lifelong connections that drive success and innovation.
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-slate-300">
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span className="text-sm font-medium">Made with passion for our alumni community</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <span>Quick Links</span>
              <ArrowRight className="w-4 h-4 ml-2 text-blue-400" />
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Alumni Directory', href: '/directory' },
                { label: 'Events & Meetups', href: '/events' },
                { label: 'Interest Groups', href: '/groups' },
                { label: 'Career Center', href: '#' },
                { label: 'Mentorship', href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a 
                    href={href} 
                    className="text-slate-300 hover:text-white transition-colors duration-300 text-sm font-medium flex items-center group"
                  >
                    <span>{label}</span>
                    <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <span>Support</span>
              <Sparkles className="w-4 h-4 ml-2 text-purple-400" />
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Help Center', href: '#', icon: null },
                { label: 'Privacy Policy', href: '#', icon: null },
                { label: 'Terms of Service', href: '#', icon: null },
                { label: 'Contact Us', href: '#', icon: Mail },
              ].map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a 
                    href={href} 
                    className="text-slate-300 hover:text-white transition-colors duration-300 text-sm font-medium flex items-center group"
                  >
                    {Icon && <Icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />}
                    <span>{label}</span>
                    <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>jhadivye77@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>+91-8851670050</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-sm text-slate-400">
                © 2025 AlumniLink. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800 rounded-xl border border-slate-700">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-300 font-medium">All systems operational</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-slate-400 text-xs">
                <span>Trusted by</span>
                <span className="font-bold text-white">50,000+</span>
                <span>alumni worldwide</span>
              </div>
              
              {/* Social links placeholder */}
              <div className="flex items-center space-x-3">
                {['LinkedIn', 'Twitter', 'Facebook'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center transition-colors duration-300 group border border-slate-700 hover:border-slate-600"
                  >
                    <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors duration-300">
                      {platform[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
