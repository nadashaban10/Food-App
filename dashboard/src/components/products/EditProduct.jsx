import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductById } from "../../redux/reducers/productsSlice";

const EditProduct = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await dispatch(getProductById(id));
        console.log("response from edit: ", response);
        if (response.payload) {
          setProduct(response.payload);
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, [dispatch, id]);

  console.log("selected: ", product);

  return (
    <div>
      <p>{`${id}`}</p>
      {product ? (
        <>
          <h1>{product.name}</h1>
          <h2>{product.price}</h2>
        </>
      ) : (
        <p>product not found</p>
      )}
    </div>
  );
};

export default EditProduct;
