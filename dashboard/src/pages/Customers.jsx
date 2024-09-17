const Customers = () => {
  return (
    <div className="w-[90%] mx-auto">
      {/* Header */}
      <div className="bg-white text-slate-800 text-3xl font-semibold p-8 rounded-md shadow-sm mt-10 ">
        <header>
          <h1>Customers</h1>
        </header>
      </div>
      <div>
        <p> All Customers</p>

        <div>
          <table></table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
