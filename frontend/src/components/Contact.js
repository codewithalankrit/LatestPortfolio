import React, { useState, useEffect, useRef } from 'react';
import { mockPersonalInfo } from '../utils/mockData';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Mock form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={contactRef} className="opacity-0 translate-y-10 transition-all duration-1000">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? I'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-cyan-400 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      📧
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-medium">{mockPersonalInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-cyan-400 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                      📱
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white font-medium">{mockPersonalInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-cyan-400 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                      📍
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-medium">{mockPersonalInfo.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Follow Me</h3>
                <div className="flex space-x-4">
                  {Object.entries(mockPersonalInfo.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-500 transition-all duration-300 transform hover:scale-110 border border-gray-700 hover:border-cyan-400"
                    >
                      {platform === 'linkedin' && '💼'}
                      {platform === 'github' && '🐙'}
                      {platform === 'dribbble' && '🏀'}
                      {platform === 'instagram' && '📸'}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
                    placeholder="Project Subject"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-green-400 text-center">Message sent successfully! I'll get back to you soon.</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-center">Failed to send message. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Background 3D Elements */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg transform rotate-45 hover:rotate-90 transition-transform duration-500 animate-pulse opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full transform hover:scale-125 transition-transform duration-500 animate-bounce opacity-20"></div>
    </section>
  );
};

export default Contact;