const Orders = () => {
  return (
    <div className="w-[90%] mx-auto">
      {/* Header */}
      <div className="bg-white text-slate-800 text-3xl font-semibold p-8 rounded-md shadow-sm mt-10 ">
        <header>
          <h1>Orders</h1>
        </header>
      </div>
      <div>
        <p> All Orders</p>
        <div>
          <table></table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
