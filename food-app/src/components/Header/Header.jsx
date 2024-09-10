const Header = () => {
  return (
    <div className="lg:text-right text-center xl:w-[70%] sm:w-full sm:text-center text-white flex justify-end flex-col gap-10 mt-[50px] lg:mt-[100px]">
      <h1 className="md:text-[3.5rem] text-4xl font-extrabold leading-relaxed  ">
        استمتع بأشهى المشويات الطازجة على أصولها
      </h1>
      <p className="leading-[50px] text-3xl">
        نحن نقدم لك تجربة مشويات لا تُنسى، بخلطاتنا السرية واللحوم الطازجة
        المختارة بعناية. استمتع بأجواء دافئة ونكهات غنية تجعلك تعود مرارًا
        وتكرارًا. احجز طاولتك اليوم واستمتع بأفضل تجربة مشويات في المدينة.
      </p>
      <div>
        <button className="custom-btn mt-[10px] text-lg ">احجز الآن</button>
      </div>
    </div>
  );
};

export default Header;
