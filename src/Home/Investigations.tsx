import React, { useState } from 'react';
import { 
  FaSearch, FaFilter, FaClock, FaChartLine, FaShieldAlt, 
  FaExclamationTriangle, FaUserSecret, FaDatabase, FaBug,
  FaBalanceScale, FaExternalLinkAlt, FaNewspaper
} from 'react-icons/fa';

// Investigation types
type InvestigationCategory = 'counterterrorism' | 'counterintelligence' | 'cyber' | 'publicCorruption' | 'organizedCrime' | 'violentCrime';

interface Investigation {
  id: string;
  title: string;
  category: InvestigationCategory;
  status: 'active' | 'ongoing' | 'new' | 'update';
  location: string;
  summary: string;
  lastUpdate: string;
  imageUrl: string;
  priority: 'high' | 'medium' | 'low';
}

// Sample data
const investigationsData: Investigation[] = [
  {
    id: 'inv1',
    title: 'Operation Ghost Wind',
    category: 'counterterrorism',
    status: 'active',
    location: 'Domestic / Multi-state',
    summary: 'Joint task force investigating potential domestic extremist plots targeting government facilities. Multiple suspects under surveillance.',
    lastUpdate: '2025-06-03',
    imageUrl: 'https://images.unsplash.com/photo-1582139315650-09f6d024f67c?w=400&h=250&fit=crop',
    priority: 'high',
  },
  {
    id: 'inv2',
    title: 'Cyberspy Ring',
    category: 'counterintelligence',
    status: 'ongoing',
    location: 'East Coast',
    summary: 'Foreign intelligence operatives attempting to infiltrate defense contractors. Countermeasures deployed.',
    lastUpdate: '2025-06-01',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
    priority: 'high',
  },
  {
    id: 'inv3',
    title: 'Ransomware Collective "DarkVault"',
    category: 'cyber',
    status: 'active',
    location: 'International',
    summary: 'FBI leading multi-agency effort to dismantle ransomware group responsible for hospital attacks. Rewards offered for information.',
    lastUpdate: '2025-06-04',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop',
    priority: 'high',
  },
  {
    id: 'inv4',
    title: 'Public Integrity – City Hall',
    category: 'publicCorruption',
    status: 'new',
    location: 'Midwest',
    summary: 'Investigation into bribery and kickback schemes involving public contracts. Subpoenas issued.',
    lastUpdate: '2025-06-02',
    imageUrl: 'https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=400&h=250&fit=crop',
    priority: 'medium',
  },
  {
    id: 'inv5',
    title: 'Transnational Drug Cartel "Norteño"',
    category: 'organizedCrime',
    status: 'ongoing',
    location: 'Southwest border',
    summary: 'Wiretaps and undercover operations targeting drug trafficking and money laundering. Multiple arrests expected.',
    lastUpdate: '2025-05-30',
    imageUrl: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=250&fit=crop',
    priority: 'high',
  },
  {
    id: 'inv6',
    title: 'Serial Bank Robberies',
    category: 'violentCrime',
    status: 'update',
    location: 'Pacific Northwest',
    summary: 'Pattern identification leads to suspect vehicle. FBI seeking public assistance.',
    lastUpdate: '2025-06-05',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    priority: 'medium',
  },
];

const categoryLabels: Record<InvestigationCategory, string> = {
  counterterrorism: 'Counterterrorism',
  counterintelligence: 'Counterintelligence',
  cyber: 'Cybercrime',
  publicCorruption: 'Public Corruption',
  organizedCrime: 'Organized Crime',
  violentCrime: 'Violent Crime',
};

const statusBadgeColors = {
  active: 'bg-red-600',
  ongoing: 'bg-orange-600',
  new: 'bg-blue-600',
  update: 'bg-green-600',
};

const priorityColors = {
  high: 'text-red-700 bg-red-100',
  medium: 'text-yellow-700 bg-yellow-100',
  low: 'text-green-700 bg-green-100',
};

// Helper: format date
const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const Investigations: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filter investigations
  const filteredInvestigations = investigationsData.filter(inv => {
    const matchesCategory = activeCategory === 'all' || inv.category === activeCategory;
    const matchesSearch = inv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inv.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inv.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || inv.status === filterStatus;
    return matchesCategory && matchesSearch && matchesStatus;
  });

  // Separate active/ongoing from case updates
  const activeInvestigations = filteredInvestigations.filter(inv => inv.status === 'active' || inv.status === 'ongoing' || inv.status === 'new');
  const caseUpdates = filteredInvestigations.filter(inv => inv.status === 'update');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-[#0B3B60] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="bg-[#B22234] p-3 rounded-full">
              <FaShieldAlt className="text-3xl" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">Investigations</h1>
          <p className="text-center text-gray-200 max-w-2xl mx-auto">
            Official updates on current FBI investigations, case progress, and priority areas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Search and Filters */}
        <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, summary, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22234] focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22234] appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="new">New</option>
                  <option value="update">Case Update</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Investigation Categories (filter pills) */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#0B3B60] mb-4 flex items-center gap-2">
            <FaChartLine /> Investigation Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === 'all'
                  ? 'bg-[#B22234] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setActiveCategory(value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === value
                    ? 'bg-[#B22234] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Investigations Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#0B3B60] border-l-4 border-[#B22234] pl-3 mb-6 flex items-center gap-2">
            <FaExclamationTriangle /> Active Investigations
          </h2>
          {activeInvestigations.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-xl">
              <p className="text-gray-500">No active investigations match your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeInvestigations.map(inv => (
                <div key={inv.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col h-full">
                  <div className="relative h-40 overflow-hidden">
                    <img src={inv.imageUrl} alt={inv.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusBadgeColors[inv.status]} text-white`}>
                        {inv.status.toUpperCase()}
                      </span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${priorityColors[inv.priority]}`}>
                        {inv.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-[#0B3B60] mb-1">{inv.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">📍 {inv.location}</p>
                    <p className="text-sm text-gray-600 mb-3 flex-grow">{inv.summary}</p>
                    <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                      <span className="flex items-center gap-1"><FaClock /> Last update: {formatDate(inv.lastUpdate)}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{categoryLabels[inv.category]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Case Updates Section */}
        {caseUpdates.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0B3B60] border-l-4 border-[#B22234] pl-3 mb-6 flex items-center gap-2">
              <FaNewspaper /> Case Updates
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {caseUpdates.map(update => (
                <div key={update.id} className="bg-gray-50 rounded-xl p-5 border-l-4 border-[#FFD700] shadow-sm hover:shadow-md transition">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#B22234]/10 p-2 rounded-full">
                      <FaExternalLinkAlt className="text-[#B22234]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#0B3B60] text-lg">{update.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">📍 {update.location}</p>
                      <p className="text-gray-700 text-sm mt-2">{update.summary}</p>
                      <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><FaClock /> {formatDate(update.lastUpdate)}</span>
                        <span className="text-green-600 font-semibold">New development →</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No results message */}
        {filteredInvestigations.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No investigations match your search or filter criteria.</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 text-center text-xs text-gray-400 border-t pt-6">
          <p>The information provided is for official use and public awareness. Some details may be withheld to protect ongoing operations.</p>
        </div>
      </div>
    </div>
  );
};

export default Investigations;