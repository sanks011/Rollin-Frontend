import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<{success?: boolean; message?: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        success: false,
        message: 'Please fill out all required fields.'
      });
      return;
    }
    
    // Simulate form submission success
    // In a real application, you would send this data to your backend
    setSubmitStatus({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setSubmitStatus(null);
    }, 5000);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h1 className="text-[#321a12] text-5xl font-black mb-8 leading-tight tracking-tighter">
          CONTACT <span className="text-yellow-500">US</span>
        </h1>
        
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-2/5">
            <div className="bg-yellow-100 rounded-2xl p-6 shadow-sm h-full">
              <h2 className="text-2xl font-bold text-[#321a12] mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#321a12] mb-2">Location</h3>
                  <p className="text-gray-700 flex items-start">
                    <span className="mr-2">📍</span>
                    123 Bakery Lane, Sweetville, CA 90210
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-[#321a12] mb-2">Hours</h3>
                  <div className="text-gray-700 space-y-1">
                    <p><span className="font-medium">Monday - Friday:</span> 7:00 AM - 7:00 PM</p>
                    <p><span className="font-medium">Saturday:</span> 8:00 AM - 6:00 PM</p>
                    <p><span className="font-medium">Sunday:</span> 8:00 AM - 4:00 PM</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-[#321a12] mb-2">Contact</h3>
                  <div className="text-gray-700 space-y-1">
                    <p className="flex items-center">
                      <span className="mr-2">📞</span>
                      <span>(555) 123-4567</span>
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">✉️</span>
                      <span>hello@rollinbakery.com</span>
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-[#321a12] mb-2">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <img 
                  src="/Screenshot 2025-04-14 205935.png" 
                  alt="Bakery storefront" 
                  className="w-full h-auto rounded-xl shadow-sm transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-3/5">
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#321a12] mb-6">Send Us a Message</h2>
              
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-[#321a12] font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            
            <div className="mt-8">
              <div className="bg-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#321a12] mb-4">Frequently Asked Questions</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-[#321a12]">Do you offer catering services?</h4>
                    <p className="text-gray-700 text-sm">Yes, we offer catering for events of all sizes. Please contact us at least 48 hours in advance to discuss your needs.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-[#321a12]">Can I place a custom order?</h4>
                    <p className="text-gray-700 text-sm">Absolutely! We love creating custom-designed cakes and pastries. Please give us at least 72 hours notice for custom orders.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-[#321a12]">Do you offer gluten-free options?</h4>
                    <p className="text-gray-700 text-sm">Yes, we have a selection of gluten-free items available daily. Please note that while we take precautions, our bakery is not a gluten-free facility.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#321a12] mb-6">Find Us</h2>
          
          <div className="rounded-2xl overflow-hidden shadow-sm h-96">
            {/* Replace with an actual map component if available */}
            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
              <p className="text-gray-500">Map goes here (Google Maps or similar integration)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;