'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function JiangHaoxuStory() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[60vh] bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/seal-pattern.png')] bg-repeat opacity-10"></div>
        </div>
        
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center z-10 px-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 font-serif">
            江豪旭
          </h1>
          <p className="text-2xl text-amber-100 mb-6 font-serif">
            字瑞昇 · 号庵角山人
          </p>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-lg text-amber-50 max-w-2xl mx-auto">
            金石印坊创始人 · 篆刻教育家 · 文化传播者
          </p>
        </motion.div>
      </motion.section>

      {/* Introduction */}
      <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="prose prose-lg md:prose-xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-stone-800 mb-8 text-center font-serif">
            庵角之内窥堂奥
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div className="space-y-6">
              <p className="text-stone-700 leading-relaxed">
                江豪旭，字瑞昇，号庵角山人，是中国印文化及篆刻艺术的积极传播者，金石印坊创始人。自 2006 年创立金石印坊以来，他致力于玺印篆刻文化的传承与创新，从事篆刻教育十余年，培养了数百名学员。
              </p>
              <p className="text-stone-700 leading-relaxed">
                江豪旭先生从事篆刻艺术三十余载，在长期的篆刻教学过程中积累了丰富的教学经验。他专精于单刀边款技法，形成了独特的艺术风格，其刀法干净利落，笔画挺劲，楷书端庄秀丽。
              </p>
            </div>
            
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&h=600&fit=crop&crop=faces"
                alt="江豪旭"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Seal Carving Style */}
      <section className="py-16 px-6 bg-gradient-to-br from-stone-50 to-amber-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-stone-800 mb-4 text-center font-serif"
          >
            篆刻艺术风格
          </motion.h2>
          <p className="text-center text-stone-600 mb-12 italic font-serif text-xl">
            古朴 · 劲拙 · 利落 · 大方
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-amber-800 mb-4 font-serif">
                古朴劲拙
              </h3>
              <p className="text-stone-700 leading-relaxed mb-4">
                江豪旭的篆刻作品深得汉印精髓，追求古朴之美。他的印章布局稳重端庄，线条厚实质朴，展现出一种返璞归真的艺术境界。"劲拙"并非笨拙，而是大巧若拙——在看似朴拙的刀法中蕴含着深厚的功力和对传统的深刻理解。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">汉印传统</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">古朴厚重</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">大巧若拙</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-amber-800 mb-4 font-serif">
                利落大方
              </h3>
              <p className="text-stone-700 leading-relaxed mb-4">
                江豪旭的刀法以干净利落著称。每一刀都果断决绝，不拖泥带水，展现出数十年功力积累下的自信与从容。他的印章整体气韵大方，章法开合有度，疏密得当，给人以豁然开朗之感。这种利落的刀法和大气的气象，正是其艺术成熟的重要标志。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">刀法果断</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">章法开阔</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">气象大方</span>
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
              刀法与章法的完美统一
            </h3>
            <p className="text-stone-700 leading-relaxed">
              江豪旭的篆刻艺术达到了刀法与章法的高度统一。他的每一刀都不是孤立的技术展示，而是服务于整体艺术表达。在方寸之间，他通过刀法的轻重缓急、章法的疏密开合，营造出丰富的视觉层次和深厚的文化意蕴。观赏他的印章，既能感受到刀石相激的力量之美，也能体会到传统文人的雅致情怀。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-stone-800 mb-12 text-center font-serif"
          >
            艺术成就
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
                方正字库合作
              </h3>
              <p className="text-stone-700 leading-relaxed">
                与方正字库合作开发「方正字迹 - 豪旭单刀楷」字体，这是方正字库首款篆刻边款字体，将传统篆刻艺术融入现代字体设计，让千年篆刻文化在数字时代焕发新生。
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
                学术著作
              </h3>
              <p className="text-stone-700 leading-relaxed">
                著有《单刀楷书边款刻法与创作》一书，这是专门针对篆刻艺术边款创作的实用教材，系统阐述了边款流变、刀法、章法与风格，成为篆刻学习者的重要参考。
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
                教育传承
              </h3>
              <p className="text-stone-700 leading-relaxed">
                创办金石印坊篆刻培训班，已成功举办数十期，培养了数百名学员。定期在全国各地举办讲座和 workshops，如《汉印鉴赏与创作》篆刻讲座在镇江等地广受欢迎。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 px-6 bg-gradient-to-br from-stone-100 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl text-stone-700 font-serif italic leading-relaxed"
          >
            <p className="mb-6">
              "篆刻不仅仅是刻石头，而是传承三千年的文化。我教的每一个学生，都在延续这种传统。"
            </p>
            <footer className="text-amber-800 font-semibold">
              — 江豪旭（庵角山人）
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-stone-800 mb-12 text-center font-serif"
          >
            艺术历程
          </motion.h2>
          
          <div className="space-y-8">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0 w-24 text-amber-700 font-bold text-xl">1993</div>
              <div className="flex-1 bg-stone-50 p-4 rounded-lg">
                <p className="text-stone-700">开始从事篆刻艺术创作与研究</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0 w-24 text-amber-700 font-bold text-xl">2006</div>
              <div className="flex-1 bg-stone-50 p-4 rounded-lg">
                <p className="text-stone-700">创立金石印坊，开始系统性篆刻教育</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0 w-24 text-amber-700 font-bold text-xl">2018</div>
              <div className="flex-1 bg-stone-50 p-4 rounded-lg">
                <p className="text-stone-700">《汉印鉴赏与创作》篆刻讲座在镇江等地成功举办</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0 w-24 text-amber-700 font-bold text-xl">2026</div>
              <div className="flex-1 bg-stone-50 p-4 rounded-lg">
                <p className="text-stone-700">与方正字库合作的「豪旭单刀楷」字体正式发布</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-amber-900 to-stone-900 text-white text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 font-serif">
            探索江豪旭的篆刻世界
          </h2>
          <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
            访问金石印坊官网，了解更多篆刻课程和作品
          </p>
          <a
            href="https://www.godseal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            访问金石印坊官网
          </a>
        </motion.div>
      </section>
    </div>
  );
}
