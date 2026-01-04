"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

interface SizeGuideProps {
  className?: string;
}

const SIZE_GUIDE_DATA = {
  apparel: {
    title: 'Apparel Size Guide',
    columns: ['Size', 'Chest (in)', 'Length (in)', 'Sleeve (in)'],
    rows: [
      { size: 'XS', chest: '34-36', length: '26', sleeve: '33' },
      { size: 'S', chest: '36-38', length: '27', sleeve: '34' },
      { size: 'M', chest: '38-40', length: '28', sleeve: '35' },
      { size: 'L', chest: '40-42', length: '29', sleeve: '36' },
      { size: 'XL', chest: '42-44', length: '30', sleeve: '37' },
      { size: '2XL', chest: '44-46', length: '31', sleeve: '38' },
    ],
  },
  hats: {
    title: 'Hats & Accessories',
    info: 'All caps and beanies are one size fits most with adjustable features.',
  },
};

export function SizeGuide({ className = '' }: SizeGuideProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <section className={`py-20 ${className}`}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="h2 text-gradient-gold mb-4">
              Need Help Finding Your Size?
            </h2>
            <p className="lead text-white/80 mb-8">
              Check our comprehensive size guide to ensure the perfect fit.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary btn-lg"
            >
              View Size Guide
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-[9999] overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="card-premium w-full max-w-4xl p-8 sm:p-12 relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-6 right-6 p-2 text-white/70 hover:text-gold-vibrant transition-colors rounded-lg hover:bg-white/5"
                    aria-label="Close size guide"
                  >
                    <FiX size={24} />
                  </button>

                  {/* Header */}
                  <div className="mb-8">
                    <h2 className="h2 text-gradient-gold mb-2">
                      Size Guide
                    </h2>
                    <p className="text-white/70">
                      Find the perfect fit for your BGT apparel
                    </p>
                  </div>

                  {/* Apparel Table */}
                  <div className="mb-10">
                    <h3 className="text-xl font-bold text-white mb-4">
                      {SIZE_GUIDE_DATA.apparel.title}
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gold-vibrant/30">
                            {SIZE_GUIDE_DATA.apparel.columns.map((col) => (
                              <th
                                key={col}
                                className="py-3 px-4 text-sm font-bold uppercase tracking-wider text-gold-vibrant"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {SIZE_GUIDE_DATA.apparel.rows.map((row, idx) => (
                            <tr
                              key={row.size}
                              className={`border-b border-white/10 ${
                                idx % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
                              } hover:bg-white/10 transition-colors`}
                            >
                              <td className="py-3 px-4 text-sm font-semibold text-white">
                                {row.size}
                              </td>
                              <td className="py-3 px-4 text-sm text-white/80">
                                {row.chest}
                              </td>
                              <td className="py-3 px-4 text-sm text-white/80">
                                {row.length}
                              </td>
                              <td className="py-3 px-4 text-sm text-white/80">
                                {row.sleeve}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Hats Info */}
                  <div className="card-glass p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {SIZE_GUIDE_DATA.hats.title}
                    </h3>
                    <p className="text-white/70">
                      {SIZE_GUIDE_DATA.hats.info}
                    </p>
                  </div>

                  {/* Sizing Tips */}
                  <div className="mt-8 p-6 rounded-xl border border-gold-vibrant/20 bg-gold-vibrant/5">
                    <h4 className="text-md font-bold text-white mb-3">
                      Sizing Tips
                    </h4>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-start gap-2">
                        <span className="text-gold-vibrant mt-0.5">•</span>
                        <span>Measurements are in inches and refer to body measurements, not garment measurements.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold-vibrant mt-0.5">•</span>
                        <span>If you&apos;re between sizes, we recommend sizing up for a more relaxed fit.</span>
                              </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold-vibrant mt-0.5">•</span>
                        <span>All apparel is unisex sizing unless otherwise noted.</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
