const Header = () => {
  return (
    <div className="lg:text-right text-center xl:w-[70%] sm:w-full sm:text-center text-white flex justify-end flex-col mt-[350px]">
      <h1 className="md:text-[3.5rem] text-3xl  font-extrabold leading-relaxed">
        استمتع بأشهى المشويات الطازجة على أصولها
      </h1>
      <p className="leading-[40px] text-2xl">
        نحن نقدم لك تجربة مشويات لا تُنسى، بخلطاتنا السرية واللحوم الطازجة
        المختارة بعناية. استمتع بأجواء دافئة ونكهات غنية تجعلك تعود مرارًا
        وتكرارًا. احجز طاولتك اليوم واستمتع بأفضل تجربة مشويات في المدينة.
      </p>
      <div>
        <button className="custom-btn mt-[5px] text-lg">احجز الآن</button>
      </div>
    </div>
  );
};

export default Header;