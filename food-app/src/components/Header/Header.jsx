import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <div className="lg:text-right text-center xl:w-full sm:w-full text-white flex justify-end flex-col mt-32 sm:mt-20 md:mt-[50px] sm:h-[100vh] h-[100vh]" dir='rtl'>
      
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="text-3xl font-extrabold leading-relaxed sm:leading-tight"
      >
        استمتع بأشهى المشويات الطازجة على أصولها
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
        className="text-base sm:text-lg md:text-2xl leading-6 sm:leading-7 md:leading-[40px] mt-4"
      >
        نحن نقدم لك تجربة مشويات لا تُنسى، بخلطاتنا السرية واللحوم الطازجة
        المختارة بعناية. استمتع بأجواء دافئة ونكهات غنية تجعلك تعود مرارًا
        وتكرارًا. احجز طاولتك اليوم واستمتع بأفضل تجربة مشويات في المدينة.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
        className="mt-6"
      >
        <button className="custom-btn mt-4 sm:mt-2 text-base sm:text-lg md:text-xl">
          احجز الآن
        </button>
      </motion.div>
      
    </div>
  );
};

export default Header;
