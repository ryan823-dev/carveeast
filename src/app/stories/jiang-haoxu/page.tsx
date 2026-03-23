'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function JiangHaoxuStory() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[70vh] bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/seal-pattern.png')] bg-repeat"></div>
        </div>
        
        {/* Background Portrait */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/artists/9251305c7432218316b34d74f86e8b0b.jpg"
            alt="Jiang Haoxu"
            fill
            className="object-cover mix-blend-overlay"
          />
        </div>
        
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center z-10 px-6 relative"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 font-serif">
            Jiang Haoxu
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 mb-2 font-serif">
            Courtesy Name Ruisheng · Art Name Anjiao Shanren
          </p>
          <p className="text-lg text-amber-200 mb-6 font-serif italic">
            字瑞昇 · 号庵角山人
          </p>
          <div className="w-32 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-amber-50 max-w-3xl mx-auto">
            Master Seal Carver · Educator · Cultural Heritage Transmitter
          </p>
        </motion.div>
      </motion.section>

      {/* Portrait & Introduction */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl order-2 md:order-1">
            <Image
              src="/images/artists/9251305c7432218316b34d74f86e8b0b.jpg"
              alt="Jiang Haoxu"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-4xl font-bold text-stone-800 font-serif">
              A Master's Journey
            </h2>
            <p className="text-stone-700 leading-relaxed text-lg">
              Jiang Haoxu, known by his courtesy name Ruisheng and art name Anjiao Shanren, is a distinguished seal carving artist and educator who has dedicated over three decades to the preservation and innovation of Chinese seal art.
            </p>
            <p className="text-stone-700 leading-relaxed text-lg">
              In 2006, he founded Jinshi Seal Studio (金石印坊), which has become one of China's most influential seal carving education institutions. Through his innovative teaching methods and artistic excellence, he has trained hundreds of students and developed a distinctive style that bridges ancient traditions with contemporary sensibilities.
            </p>
            <div className="pt-4">
              <Link 
                href="/artists/jiang-haoxu"
                className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                View Artist Profile →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Seal Carving Style */}
      <section className="py-20 px-6 bg-gradient-to-br from-stone-100 to-amber-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-stone-800 mb-4 text-center font-serif"
          >
            Artistic Style
          </motion.h2>
          <p className="text-center text-stone-600 mb-12 italic font-serif text-xl">
            Primitive Simplicity · Powerful Strength · Clean Decisiveness · Generous Dignity
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-amber-800 mb-4 font-serif">
                Primitive Simplicity & Powerful Strength
              </h3>
              <p className="text-stone-700 leading-relaxed mb-4">
                Jiang's seal carvings draw deeply from Han Dynasty traditions, pursuing a primitive beauty that transcends mere technique. His compositions are stable and dignified, with lines that are thick, substantial, and质朴 (unadorned). This "powerful simplicity" is not clumsiness, but rather great skill appearing simple—the manifestation of profound mastery and deep understanding of tradition.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Han Tradition</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Primitive Beauty</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Great Skill</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-amber-800 mb-4 font-serif">
                Clean Decisiveness & Generous Dignity
              </h3>
              <p className="text-stone-700 leading-relaxed mb-4">
                Jiang's knife work is renowned for its clean, decisive execution. Each cut is final and confident, demonstrating the assurance that comes from decades of disciplined practice. His seals exhibit generous, dignified compositions with masterful spatial awareness—openings and closings properly measured, density and sparsity appropriately balanced. This clarity of technique and grandeur of vision mark the maturity of a true master.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Decisive Cuts</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Spatial Mastery</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Dignified Form</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold text-amber-800 mb-4 font-serif">
              The Unity of Technique and Expression
            </h3>
            <p className="text-stone-700 leading-relaxed">
              In Jiang's work, every cut serves the artistic vision—nothing is mere technical display. Within the small space of a seal, he creates rich visual layers and profound cultural meaning through the interplay of knife technique and compositional mastery. To view his seals is to witness both the raw power of stone meeting steel and the refined sensibility of a literati spirit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-stone-800 mb-12 text-center font-serif"
          >
            Major Achievements
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Achievement 1 */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-amber-50 to-stone-50 p-8 rounded-lg shadow-lg"
            >
              <div className="text-amber-700 text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-stone-800 mb-4 font-serif">
                Founder Type Collaboration
              </h3>
              <p className="text-stone-700 leading-relaxed">
                In recognition of his mastery of single-stroke border inscriptions, Founder Type (China's leading digital font foundry) collaborated with Jiang to create the "Haoxu Single-Stroke Regular Script" font family—the first seal carving border inscription style digitized for modern typography.
              </p>
            </motion.div>

            {/* Achievement 2 */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-amber-50 to-stone-50 p-8 rounded-lg shadow-lg"
            >
              <div className="text-amber-700 text-5xl mb-4">✍️</div>
              <h3 className="text-2xl font-bold text-stone-800 mb-4 font-serif">
                Academic Publications
              </h3>
              <p className="text-stone-700 leading-relaxed">
                Author of "Single-Stroke Regular Script Border Inscriptions: Techniques and Creation" (《单刀楷书边款刻法与创作》), a comprehensive textbook that has become essential reading for seal carving students across China.
              </p>
            </motion.div>

            {/* Achievement 3 */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-amber-50 to-stone-50 p-8 rounded-lg shadow-lg"
            >
              <div className="text-amber-700 text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-stone-800 mb-4 font-serif">
                Educational Legacy
              </h3>
              <p className="text-stone-700 leading-relaxed">
                Through Jinshi Seal Studio, Jiang has trained hundreds of students over nearly two decades. His lecture series "Han Seal Appreciation and Creation" has been held in cities across China, spreading the art of seal carving to new generations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-20 px-6 bg-gradient-to-br from-amber-900 to-stone-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl leading-relaxed"
          >
            <p className="mb-8 font-serif italic">
              "A seal is born from the dialogue between knife and stone—primitive, powerful, and unrepeatable. In teaching, I pass on not just technique, but a living tradition that has endured for three thousand years."
            </p>
            <footer className="text-amber-200 font-semibold text-lg">
              — Jiang Haoxu (Anjiao Shanren)
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-stone-800 mb-12 text-center font-serif"
          >
            Artistic Journey
          </motion.h2>
          
          <div className="space-y-6">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0 w-20 text-amber-700 font-bold text-xl">1993</div>
              <div className="flex-1 bg-white p-4 rounded-lg shadow">
                <p className="text-stone-700">Began seal carving artistic creation and research</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0 w-20 text-amber-700 font-bold text-xl">2006</div>
              <div className="flex-1 bg-white p-4 rounded-lg shadow">
                <p className="text-stone-700">Founded Jinshi Seal Studio, beginning systematic seal carving education</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0 w-20 text-amber-700 font-bold text-xl">2018</div>
              <div className="flex-1 bg-white p-4 rounded-lg shadow">
                <p className="text-stone-700">"Han Seal Appreciation and Creation" lecture series held in Zhenjiang and other cities</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0 w-20 text-amber-700 font-bold text-xl">2026</div>
              <div className="flex-1 bg-white p-4 rounded-lg shadow">
                <p className="text-stone-700">"Haoxu Single-Stroke Regular Script" font family officially released by Founder Type</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA - Internal Links Only */}
      <section className="py-20 px-6 bg-gradient-to-br from-stone-100 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 font-serif">
              Explore More
            </h2>
            <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
              Discover Jiang Haoxu's artworks and learn about his teaching programs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/artists/jiang-haoxu"
                className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                View Artist Profile
              </Link>
              <Link
                href="/artists"
                className="inline-block bg-stone-700 hover:bg-stone-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Browse All Artists
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
