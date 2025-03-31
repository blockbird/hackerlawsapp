import React, { useState, useEffect } from 'react';

const HackerLawsApp = () => {
  const [currentLaw, setCurrentLaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showingMore, setShowingMore] = useState(false);

  // Collection of hacker laws from hacker-laws.com
  const hackerLaws = [
    {
      name: "Brooks's Law",
      description: "Adding manpower to a late software project makes it later.",
      details: "Adding more people to a project that's already behind schedule will only delay it further due to increased communication overhead and onboarding time.",
      link: "https://en.wikipedia.org/wiki/Brooks%27s_law"
    },
    {
      name: "Conway's Law",
      description: "Organizations design systems that mirror their own communication structure.",
      details: "The software architecture of a system will resemble the organizational structure of the company that built it.",
      link: "https://en.wikipedia.org/wiki/Conway%27s_law"
    },
    {
      name: "Hofstadter's Law",
      description: "It always takes longer than you expect, even when you take into account Hofstadter's Law.",
      details: "This recursive law acknowledges the universal difficulty in accurately estimating how long tasks will take.",
      link: "https://en.wikipedia.org/wiki/Hofstadter%27s_law"
    },
    {
      name: "Moore's Law",
      description: "The number of transistors in an integrated circuit doubles approximately every two years.",
      details: "This observation by Gordon Moore has proven remarkably accurate for decades and has driven the remarkable pace of technological advancement.",
      link: "https://en.wikipedia.org/wiki/Moore%27s_law"
    },
    {
      name: "Parkinson's Law",
      description: "Work expands so as to fill the time available for its completion.",
      details: "If you allocate a month for a task, it will take a month - even if it could have been completed in a week.",
      link: "https://en.wikipedia.org/wiki/Parkinson%27s_law"
    },
    {
      name: "The Peter Principle",
      description: "People in a hierarchy tend to rise to their level of incompetence.",
      details: "Employees are promoted based on their success in previous roles until they reach a level at which they are no longer competent.",
      link: "https://en.wikipedia.org/wiki/Peter_principle"
    },
    {
      name: "The Law of Leaky Abstractions",
      description: "All non-trivial abstractions, to some degree, are leaky.",
      details: "Abstractions in programming will always 'leak' some of the underlying complexity they're trying to hide.",
      link: "https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/"
    },
    {
      name: "Dunbar's Number",
      description: "A theoretical cognitive limit to the number of people with whom one can maintain stable social relationships (usually cited as 150).",
      details: "This concept has implications for team sizing, community building, and social network dynamics in technology platforms.",
      link: "https://en.wikipedia.org/wiki/Dunbar%27s_number"
    },
    {
      name: "The DRY Principle",
      description: "Don't Repeat Yourself: Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.",
      details: "This principle aims to reduce repetition of code and information, making systems easier to maintain and less prone to errors.",
      link: "https://en.wikipedia.org/wiki/Don%27t_repeat_yourself"
    },
    {
      name: "KISS Principle",
      description: "Keep It Simple, Stupid: Most systems work best if they are kept simple rather than made complicated.",
      details: "Simplicity should be a key goal in design, and unnecessary complexity should be avoided.",
      link: "https://en.wikipedia.org/wiki/KISS_principle"
    },
    {
      name: "Occam's Razor",
      description: "Among competing hypotheses, the one with the fewest assumptions should be selected.",
      details: "When debugging, the simplest explanation is usually the most likely. Don't assume complex reasons for failures when simple ones will suffice.",
      link: "https://en.wikipedia.org/wiki/Occam%27s_razor"
    },
    {
      name: "The 90-9-1 Rule",
      description: "In online communities, 90% of users are lurkers, 9% contribute occasionally, and 1% account for almost all the content.",
      details: "This participation inequality affects everything from open source projects to social networks and must be accounted for in community design.",
      link: "https://en.wikipedia.org/wiki/1%25_rule"
    },
    {
      name: "Pareto Principle (80/20 Rule)",
      description: "Roughly 80% of consequences come from 20% of the causes.",
      details: "In software, this often manifests as 80% of the value coming from 20% of the features, or 80% of bugs coming from 20% of the code.",
      link: "https://en.wikipedia.org/wiki/Pareto_principle"
    },
    {
      name: "Murphy's Law",
      description: "Anything that can go wrong will go wrong.",
      details: "This mindset encourages defensive programming, robust error handling, and thorough testing to prepare for unexpected failures.",
      link: "https://en.wikipedia.org/wiki/Murphy%27s_law"
    },
    {
      name: "Linus's Law",
      description: "Given enough eyeballs, all bugs are shallow.",
      details: "With a large enough number of users and testers, almost every problem will be quickly identified and solved by someone.",
      link: "https://en.wikipedia.org/wiki/Linus%27s_law"
    },
    {
      name: "Hanlon's Razor",
      description: "Never attribute to malice that which is adequately explained by stupidity.",
      details: "When confronted with an error or issue, first assume it's due to a simple mistake rather than malicious intent.",
      link: "https://en.wikipedia.org/wiki/Hanlon%27s_razor"
    },
    {
      name: "The Dilbert Principle",
      description: "Companies tend to systematically promote incompetent employees to management to get them out of the workflow.",
      details: "Unlike the Peter Principle, this suggests that the least competent people are deliberately moved to positions where they can do the least harm to the actual work.",
      link: "https://en.wikipedia.org/wiki/Dilbert_principle"
    },
    {
      name: "The Boy Scout Rule",
      description: "Leave the code better than you found it.",
      details: "Make small improvements to code whenever you work with it - fix a comment, rename a variable, break up a function - to gradually improve code quality.",
      link: "https://www.oreilly.com/library/view/97-things-every/9780596809515/ch08.html"
    },
    {
      name: "Kerchkhoff's Principle",
      description: "A cryptographic system should be secure even if everything about the system, except the key, is public knowledge.",
      details: "Security through obscurity is not real security. Systems should be secure by design, not because their implementation details are hidden.",
      link: "https://en.wikipedia.org/wiki/Kerckhoffs%27s_principle"
    },
    {
      name: "Goodhart's Law",
      description: "When a measure becomes a target, it ceases to be a good measure.",
      details: "As soon as a metric is used as a performance indicator, it will be gamed and manipulated, losing its effectiveness as a measure.",
      link: "https://en.wikipedia.org/wiki/Goodhart%27s_law"
    }
  ];

  // Function to get a random law
  const getRandomLaw = () => {
    const randomIndex = Math.floor(Math.random() * hackerLaws.length);
    return hackerLaws[randomIndex];
  };

  // Update the current law on refresh or button click
  const refreshLaw = () => {
    setLoading(true);
    setShowingMore(false);
    setTimeout(() => {
      setCurrentLaw(getRandomLaw());
      setLoading(false);
    }, 300); // Small delay for visual effect
  };

  // Initialize With a Random Law
  useEffect(() => {
    refreshLaw();
  }, []);

  // Toggle showing more details
  const toggleDetails = () => {
    setShowingMore(!showingMore);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full backdrop-blur-sm bg-white/10 rounded-xl shadow-2xl overflow-hidden border border-white/20">
        <div className="relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={i}
                className="absolute text-white/10 text-9xl font-mono"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              >
                {'{'}
              </div>
            ))}
          </div>
          
          {/* Header */}
          <div className="relative px-8 py-6 border-b border-white/20">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <svg className="h-20 w-full" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" /> {/* cyan-500 */}
                      <stop offset="100%" stopColor="#a855f7" /> {/* purple-500 */}
                    </linearGradient>
                    <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" /> {/* cyan with opacity */}
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" /> {/* purple with opacity */}
                    </linearGradient>
                    {/* Filter for the glow effect */}
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                      <feComposite in="blur" operator="over" in2="SourceGraphic" />
                    </filter>
                  </defs>
                  
                  {/* Background with subtle code pattern */}
                  <rect width="300" height="100" fill="transparent" rx="10" ry="10" />
                  
                  {/* Code pattern background */}
                  <g fill="#ffffff" opacity="0.05">
                    {/* Code symbols scattered in the background */}
                    <text x="20" y="30" fontFamily="monospace" fontSize="24">{"{"}</text>
                    <text x="40" y="70" fontFamily="monospace" fontSize="18">{"}"}</text>
                    <text x="150" y="40" fontFamily="monospace" fontSize="14">{"{"}</text>
                    <text x="200" y="20" fontFamily="monospace" fontSize="22">{"}"}</text>
                    <text x="230" y="60" fontFamily="monospace" fontSize="16">{"{"}</text>
                    <text x="260" y="90" fontFamily="monospace" fontSize="20">{"}"}</text>
                    <text x="80" y="85" fontFamily="monospace" fontSize="16">;</text>
                    <text x="170" y="75" fontFamily="monospace" fontSize="18">;</text>
                  </g>
                  
                  {/* Main Logo - Code Brackets with HL inside */}
                  <g filter="url(#glow)">
                    {/* Left Bracket */}
                    <path d="M70 30 L50 30 L50 70 L70 70" fill="none" stroke="url(#headerGradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    
                    {/* Right Bracket */}
                    <path d="M230 30 L250 30 L250 70 L230 70" fill="none" stroke="url(#headerGradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    
                    {/* H */}
                    <path d="M90 35 L90 65 M90 50 L115 50 M115 35 L115 65" fill="none" stroke="url(#headerGradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    
                    {/* L */}
                    <path d="M135 35 L135 65 M135 65 L165 65" fill="none" stroke="url(#headerGradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                    
                    {/* Dot connecting H and L for a tech feel */}
                    <circle cx="125" cy="50" r="3" fill="#ffffff" />
                    
                    {/* Terminal cursor blink */}
                    <rect x="180" y="48" width="4" height="16" fill="#ffffff">
                      <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
                    </rect>
                  </g>
                  
                  {/* Terminal prompt symbol */}
                  <text x="200" y="58" fontFamily="monospace" fontSize="16" fill="#ffffff" opacity="0.8">$_</text>
                </svg>
                <p className="text-gray-300 text-center mt-1">
                  Wisdom from the programming trenches
                </p>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 min-h-64 relative">
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <div className="h-12 w-12 relative">
                  <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-cyan-400 animate-spin"></div>
                  <div className="absolute inset-0 rounded-full border-b-2 border-l-2 border-purple-500 animate-ping opacity-50"></div>
                </div>
              </div>
            ) : (
              <div className="mb-8">
                {/* Terminal-like header for the law */}
                <div className="flex items-center mb-4 font-mono text-sm text-gray-400">
                  <span className="text-green-400">$</span>
                  <span className="ml-2">get-random-law</span>
                  <div className="ml-2 h-4 w-1 bg-white/70 animate-pulse"></div>
                </div>
                
                {/* Law content */}
                <div className="transform transition-all duration-500">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="text-cyan-400 mr-2">#</span>
                    {currentLaw?.name}
                  </h2>
                  
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                      "{currentLaw?.description}"
                    </p>
                    
                    {showingMore && (
                      <div className="text-gray-300 mb-4 bg-white/5 p-4 rounded-md border-l-4 border-cyan-400 animate-fadeIn">
                        {currentLaw?.details}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={toggleDetails}
                        className="text-cyan-400 hover:text-cyan-300 text-sm font-mono flex items-center"
                      >
                        {showingMore ? '[ - ] Less details' : '[ + ] More details'}
                      </button>
                      
                      <a 
                        href={currentLaw?.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 text-sm font-mono flex items-center"
                      >
                        Learn more {'>'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Button */}
            <div className="mt-6">
              <button 
                onClick={refreshLaw}
                className="w-full group relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 py-4 px-4 font-mono text-white shadow-lg transition-all duration-200 hover:shadow-cyan-500/20"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative font-bold">{'> '}SHOW ANOTHER LAW</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-white/20 px-8 py-4 text-center">
          <p className="text-gray-400 text-sm">
            Inspired by{' '}
            <a 
              href="https://hacker-laws.com/"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
            >
              hacker-laws.com
            </a>
            {' '}| Refresh for wisdom
          </p>
        </div>
      </div>
    </div>
  );
};

export default HackerLawsApp;