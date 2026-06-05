import React, { useState } from 'react';
import { FaHistory, FaFilePdf, FaDownload, FaBookOpen, FaLandmark, FaShieldAlt, FaImages, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';

// Document files (PDFs for download)
interface DocumentFile {
  id: number;
  title: string;
  description: string;
  year: string;
  fileUrl: string;
  fileType: 'pdf' | 'doc';
}

const documentsData: DocumentFile[] = [
  {
    id: 1,
    title: 'FBI Historical Timeline (1908-2020)',
    description: 'Comprehensive timeline of major events, directors, and milestones.',
    year: '2020',
    fileUrl: '/documents/fbi-timeline.pdf',
    fileType: 'pdf',
  },
  {
    id: 2,
    title: 'The Bureau: 100 Years of Service',
    description: 'Official publication celebrating the FBI centennial.',
    year: '2008',
    fileUrl: '/documents/100-years.pdf',
    fileType: 'pdf',
  },
  {
    id: 3,
    title: 'Famous Cases: From Dillinger to 9/11',
    description: 'Declassified summaries of major investigations.',
    year: '2011',
    fileUrl: '/documents/famous-cases.pdf',
    fileType: 'pdf',
  },
  {
    id: 4,
    title: 'FOIA Reading Room - FBI History',
    description: 'Collection of historical records released under FOIA.',
    year: 'Various',
    fileUrl: '/documents/foia-history.pdf',
    fileType: 'pdf',
  },
];

// Document images (for gallery)
interface DocumentImage {
  id: number;
  title: string;
  description: string;
  year: string;
  imageUrl: string;
}

const documentImages: DocumentImage[] = [
  {
    id: 1,
    title: 'Original Bureau of Investigation Order (1908)',
    description: 'Attorney General Bonaparte’s directive creating the BOI.',
    year: '1908',
    imageUrl: 'https://www.fbi.gov/image-repository/history/agent-application-1909.jpeg/@@images/image/high',
  },
  {
    id: 2,
    title: 'The Bureau’s First Wanted Poster',
    description: 'On December 2, 1919, a 23-year-old soldier named William N. Bishop slipped out of the stockade at Camp A. A. Humphreys—today’s Fort Belvoir—in northern Virginia Shortly after Bishop’s getaway, the Military Intelligence Division of the Army requested the Bureaus’ help in finding him. One early assistant director, Frank Burke, responded by sending a letter to “All Special Agents, Special Employees and Local Officers” asking them to “make every effort” to capture Bishop Little did anyone know at the time, but that letter set in motion a chain of events that would forever change how the FBI and its partners fight crime In the letter, Burke included every scrap of information that would help law enforcement of the day locate and identify Bishop: a complete physical description, down to the pigmented mole near his right armpit; possible addresses he might visit, including his sister’s home in New York; and a “photostat” of a recent portrait taken at “Howard’s studio” on seventh street in Washington, D C  Burke labeled that document—dated December 15, 1919—“Identification Order No. 1.” In essence, it was the Bureau’s first wanted poster, and it put the organization squarely in the fugitive-catching business just eleven years into its history. It has been at it ever since Within a few years, the identification order—or what soon became known throughout law enforcement as an “IO”—had become a staple of crime fighting. By the late 1920s, these wanted flyers were circulating not only throughout the U.S. but also Canada and Europe (and later worldwide) The IO evolved into a standard 8x8 size, and the Bureau soon added to them fingerprints (thanks to its growing national repository), criminal records, and other background information. By the 1930s, IOs were sent to police stations around the nation, enlisting the eyes of the public in the search for fugitives. In 1950, building on the “wanted posters” concept, the FBI created its “Ten Most Wanted Fugitives” list And what of Mr. Bishop? With the help of the identification order, he was captured less than five months later, on April 6, 1920.',
    year: '1924',
    imageUrl: 'https://www.fbi.gov/image-repository/history/first-io-2.jpeg/@@images/bea4dd43-3bcf-4b1c-b945-1e00bfb34d28.jpeg',
  },
  {
    id: 3,
    title: 'The Russian Cossack Turned Special Agent',
    description: 'Emilio Kosterlitzky was one of the most colorful characters to ever serve as a special agent A cultured, Russian-born man of the world, he spent four decades in the Russian and Mexican militaries, rising to the rank of brigadier general in Mexico. To avoid the dangerous tribulations of the ongoing Mexican Revolution, he settled down in Los Angeles in 1914 In 1917, the same year as the Bolshevik revolution in his native land, he joined the FBI. He was 63 Kosterlitzky was appointed a “special employee,” like today’s investigative assistant but with more authority. And with his deep military experience and international flair (including strong connections throughout Mexico and the Southwest U.S. and the ability to speak, read, and write more than eight languages) he excelled at it. His work included not only translations but also undercover work On May 1, 1922, Kosterlitzky was appointed a Bureau special agent at a salary of six dollars a day. Because of his unique qualifications he was assigned to work border cases and to conduct liaison with various Mexican informants and officials. By all accounts, he showed exceptional diplomacy and skill In 1926, Kosterlitzky was ordered to report to the Bureau’s office in Phoenix but could not comply because of a serious heart condition. He resigned on September 4, 1926. Less than two years later this grand old gentleman died and was buried in Los Angeles.',
    year: '1932',
    imageUrl: 'https://www.fbi.gov/image-repository/history/emilio-kosterlitzky.jpeg/@@images/04333879-4467-46c7-9b9d-c7966c62f065.jpeg',
  },
  {
    id: 4,
    title: 'One of the first special agents credentials',
    description: 'Attorney General A. Mitchell Palmer responded with a massive investigation, led by a young Justice Department lawyer named J. Edgar Hoover, who amassed detailed information and intelligence on radicals and their activities. The ensuing “Palmer Raids” were poorly planned and executed and heavily criticized for infringing on the civil liberties of the thousands of people swept up in the raids. The incident provided an important lesson for the young Bureau, and its excesses helped temper the country’s attitudes toward radicalism A new era of lawlessness, though, was just beginning, and the nation would soon need its new federal investigative agency more than ever. As you’ll see in the next chapter, the Bureau first had to get its own house in order.',
    year: '2001',
    imageUrl: 'https://www.fbi.gov/image-repository/history/agent-credentials.jpg/@@images/image/high',
  },
];

// Component for truncated text with "Read more"
const TruncatedText: React.FC<{ text: string; maxLength?: number }> = ({ text, maxLength = 180 }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > maxLength;
  const displayText = expanded ? text : text.slice(0, maxLength) + (isLong ? '…' : '');

  return (
    
    <div>
        
      <p className="text-sm text-gray-600 leading-relaxed">{displayText}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-xs font-semibold text-[#B22234] hover:text-[#8B1A1A] flex items-center gap-1 transition-colors"
        >
          {expanded ? (
            <>Read less <FaChevronUp size={10} /></>
          ) : (
            <>Read more <FaChevronDown size={10} /></>
          )}
        </button>
      )}
    </div>
  );
};

const History: React.FC = () => {
  const [searchDocs, setSearchDocs] = useState('');
  const [showGallery, setShowGallery] = useState(true);

  const filteredDocs = documentsData.filter(doc =>
    doc.title.toLowerCase().includes(searchDocs.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchDocs.toLowerCase()) ||
    doc.year.includes(searchDocs)
  );

  return (
    <div className="bg-white min-h-screen">
        <div>
            <Navbar/>
        </div>
      {/* Hero section – fixed background video with fallback */}
      <div className="relative h-[70vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        {/* Background video – using a reliable, autoplay MP4 from Pexels (free stock video) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          poster="data:image/png;base64,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"
        >
          <source 
            src="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwjEw9nw3O6UAxVEYEEAHczRM1E4DBDvjwx6BAgREAM&url=https%3A%2F%2Fwww.instagram.com%2Freel%2FC0zkUNirBtu%2F&usg=AOvVaw32rdfLIzyDXX4z8E3uQQdQ&opi=89978449" 
            type="video/mp4" 
          />
          {/* Fallback image if video fails to load */}
          <img 
            src="https://images.unsplash.com/photo-1582139315650-09f6d024f67c?w=1200&h=800&fit=crop" 
            alt="FBI historical background"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Hero content – mobile-first typography */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <div className="flex justify-center mb-4">
            <div className="bg-[#B22234] p-3 rounded-full">
              <FaHistory className="text-3xl md:text-4xl" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
            History of the FBI
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            From a small team of investigators in 1908 to a world-class intelligence and law enforcement agency.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Timeline narrative sections – improved spacing on mobile */}
        <div className="space-y-10 md:space-y-12">
          {/* Section 1 */}
          <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
            <div className="md:w-1/4 flex justify-center md:justify-start">
              <div className="bg-[#B22234]/10 p-4 md:p-6 rounded-full">
                <FaLandmark className="text-4xl md:text-5xl text-[#B22234]" />
              </div>
            </div>
            <div className="md:w-3/4">
              <h2 className="text-xl md:text-2xl font-bold text-[#0B3B60] mb-3 border-l-4 border-[#B22234] pl-3">
                1908 – The Beginning
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                The FBI was founded on July 26, 1908, when Attorney General Charles Bonaparte ordered a group of newly hired federal investigators to report to Chief Examiner Stanley W. Finch. Originally called the Bureau of Investigation (BOI), it had no official name for nearly 27 years. The first investigators were hired from the Secret Service and other agencies, focusing on antitrust, land fraud, and banking violations.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
            <div className="md:w-1/4 flex justify-center md:justify-start">
              <div className="bg-[#B22234]/10 p-4 md:p-6 rounded-full">
                <FaShieldAlt className="text-4xl md:text-5xl text-[#B22234]" />
              </div>
            </div>
            <div className="md:w-3/4">
              <h2 className="text-xl md:text-2xl font-bold text-[#0B3B60] mb-3 border-l-4 border-[#B22234] pl-3">
                1924–1972 – J. Edgar Hoover’s Leadership
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                J. Edgar Hoover became director in 1924 and transformed the Bureau into a modern, professional law enforcement agency. He established the FBI Laboratory (1932), the FBI National Academy (1935), and the Uniform Crime Reporting program. Under Hoover, the FBI grew in authority and public recognition, famously pursuing gangsters like John Dillinger and “Machine Gun” Kelly. The Bureau was officially renamed the Federal Bureau of Investigation in 1935.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
            <div className="md:w-1/4 flex justify-center md:justify-start">
              <div className="bg-[#B22234]/10 p-4 md:p-6 rounded-full">
                <FaBookOpen className="text-4xl md:text-5xl text-[#B22234]" />
              </div>
            </div>
            <div className="md:w-3/4">
              <h2 className="text-xl md:text-2xl font-bold text-[#0B3B60] mb-3 border-l-4 border-[#B22234] pl-3">
                Post-9/11 – Intelligence Focus
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                After the September 11, 2001 attacks, the FBI shifted its top priority to counterterrorism and intelligence. The Bureau transformed into an intelligence-driven agency, creating the National Security Branch and increasing information sharing with other agencies. Today, the FBI continues to combat terrorism, cybercrime, public corruption, and violent crime while upholding the Constitution.
              </p>
            </div>
          </div>
        </div>

        {/* Document Images Gallery – consistent card heights */}
        <div className="mt-16 md:mt-20">
          <div className="border-t-2 border-[#B22234]/30 my-8 md:my-10"></div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0B3B60] flex items-center gap-2">
                <FaImages className="text-[#B22234]" />
                Historical Document Images
              </h2>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                Digitized copies of original records, letters, and artifacts.
              </p>
            </div>
            <button
              onClick={() => setShowGallery(!showGallery)}
              className="text-sm text-[#B22234] border border-[#B22234] px-3 py-1.5 rounded-full hover:bg-[#B22234] hover:text-white transition"
            >
              {showGallery ? 'Hide Gallery' : 'Show Gallery'}
            </button>
          </div>

          {showGallery && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {documentImages.map((img) => (
                <div key={img.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col h-full">
                  <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-bold text-[#0B3B60] text-base md:text-lg leading-tight flex-1">
                        {img.title}
                      </h3>
                      <span className="text-xs bg-[#B22234] text-white px-2 py-1 rounded-full shrink-0">
                        {img.year}
                      </span>
                    </div>
                    <TruncatedText text={img.description} maxLength={120} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Downloadable PDF Documents Section – consistent card heights */}
        <div className="mt-16 md:mt-20">
          <div className="border-t-2 border-[#B22234]/30 my-8 md:my-10"></div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0B3B60] flex items-center gap-2">
                <FaFilePdf className="text-[#B22234]" />
                Full Documents (PDF Downloads)
              </h2>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                Explore declassified files, reports, and official publications.
              </p>
            </div>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search documents..."
                value={searchDocs}
                onChange={(e) => setSearchDocs(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B22234] text-sm"
              />
            </div>
          </div>

          {filteredDocs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500">No documents match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredDocs.map((doc) => (
                <div key={doc.id} className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-[#B22234]/10 p-2 rounded-lg">
                      <FaFilePdf className="text-[#B22234] text-xl" />
                    </div>
                    <span className="text-xs bg-[#0B3B60] text-white px-2 py-1 rounded-full">{doc.year}</span>
                  </div>
                  <h3 className="font-bold text-[#0B3B60] text-base md:text-lg mb-2">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">{doc.description}</p>
                  <a
                    href={doc.fileUrl}
                    download
                    className="inline-flex items-center gap-2 text-[#B22234] font-semibold hover:text-[#8B1A1A] transition-colors text-sm mt-auto"
                  >
                    <FaDownload /> Download PDF
                  </a>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 bg-[#0B3B60]/5 p-4 rounded-lg border border-[#B22234]/20 text-center text-sm text-gray-600">
            <p>
              These documents are provided for historical reference. Some records may be redacted in accordance with FOIA exemptions. 
              For more records, visit the <a href="/foia" className="text-[#B22234] font-semibold hover:underline">FBI FOIA Reading Room</a>.
            </p>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default History;