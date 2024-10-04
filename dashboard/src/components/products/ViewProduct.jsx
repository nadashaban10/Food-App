import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductById } from "../../redux/reducers/productsSlice";

const ViewProduct = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductById(id)).then((response) => {
      setProduct(response.payload);
    });
  }, [dispatch, id]);

  console.log("selected: ", product);

  return (
    <div>
      <p>{`${id}`}</p>
      {/* <h1>{product.name}</h1> */}
      {/* <h1>{product.price}</h1> */}
    </div>
  );
};

export default ViewProduct;
