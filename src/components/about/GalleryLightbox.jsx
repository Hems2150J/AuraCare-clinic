import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Maximize2, Sparkles, Building } from 'lucide-react';

export const GalleryLightbox = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImage, setActiveImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: 'Luxury Main Reception & Concierge Lounge',
      category: 'Reception & Suites',
      url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      desc: 'Spacious, calm waiting environment with private intake bays and complimentary refreshment bar.'
    },
    {
      id: 2,
      title: '3T Ultra-High Field MRI Diagnostic Suite',
      category: 'Diagnostic Wing',
      url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
      desc: 'Quiet, fast neuro and musculoskeletal MR imaging suite.'
    },
    {
      id: 3,
      title: 'Robotic Surgery & Laminar Airflow Operating Theatre',
      category: 'Operating Rooms',
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      desc: 'Ultra-sterile surgical environment equipped with computer-assisted robotic arms.'
    },
    {
      id: 4,
      title: 'Pediatric Care & Playful Consultation Room',
      category: 'Pediatric Lounge',
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      desc: 'Welcoming, interactive room designed to soothe young patients.'
    },
    {
      id: 5,
      title: 'Private Inpatient Recovery Suite',
      category: 'Reception & Suites',
      url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
      desc: 'Hotel-grade suite with private bathroom, smart TV, and 24/7 dedicated nursing monitoring.'
    },
    {
      id: 6,
      title: 'Level-1 Emergency & Trauma Bay',
      category: 'Operating Rooms',
      url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
      desc: 'Instant cardiac resuscitation and acute trauma intervention bay.'
    }
  ];

  const categories = ['All', 'Reception & Suites', 'Diagnostic Wing', 'Operating Rooms', 'Pediatric Lounge'];

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-8 pt-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="font-heading font-extrabold text-2xl text-slate-900">
            AuraCare Facility Gallery
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Explore our state-of-the-art medical suites and calming patient environments.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-medical-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((img) => (
          <div
            key={img.id}
            onClick={() => setActiveImage(img)}
            className="group relative rounded-3xl overflow-hidden bg-slate-900 aspect-[4/3] cursor-pointer border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-300"
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-90 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-slate-200">
                  {img.category}
                </span>
                <h4 className="font-heading font-bold text-sm text-white mt-1 line-clamp-1">
                  {img.title}
                </h4>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <Modal
          isOpen={!!activeImage}
          onClose={() => setActiveImage(null)}
          title={activeImage.title}
          subtitle={activeImage.category}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-4">
            <img
              src={activeImage.url}
              alt={activeImage.title}
              className="w-full max-h-[60vh] object-cover rounded-2xl border border-slate-200"
            />
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {activeImage.desc}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};
