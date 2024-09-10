const Header = () => {
  return (
    <div className="text-3xl lg:w-[70%] sm:w-full sm:text-center text-white md:text-right flex justify-end flex-col gap-14 mt-[100px] ">
      <h1 className="md:text-6xl sm:text-4xl font-extrabold leading-[80px] ">
        استمتع بأشهى المشويات الطازجة على أصولها
      </h1>
      <p className="leading-[50px]">
        نحن نقدم لك تجربة مشويات لا تُنسى، بخلطاتنا السرية واللحوم الطازجة
        المختارة بعناية. استمتع بأجواء دافئة ونكهات غنية تجعلك تعود مرارًا
        وتكرارًا. احجز طاولتك اليوم واستمتع بأفضل تجربة مشويات في المدينة.
      </p>
      <div>
        <button className="custom-btn">احجز الآن</button>
      </div>
    </div>
  );
};

export default Header;
