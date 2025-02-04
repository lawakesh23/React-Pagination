import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [productData, setProductData] = useState([]);
  const [currValue, setCurreValue] = useState(0);
  const ProductCard = ({ image, alt, title }) => {
    return (
      <>
        <div className="card-container">
          <img className="card-image" src={image} alt={alt} />
          <div>{title}</div>
        </div>
      </>
    );
  };
  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    setProductData(data.products);
    console.log("data", data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const PAGE_SIZE = 10
  const start = currValue * PAGE_SIZE;
  const endPoint = start + PAGE_SIZE;
  const totalLength = Math.ceil(productData.length / PAGE_SIZE);
  const handlePageClick = (n) => {
    setCurreValue(n);
  };

  const goTOPrevious = () => {
    setCurreValue((pre) => pre - 1);
  };

  const goToNext = () => {
    setCurreValue((pre) => pre + 1);
  };
  return !productData.length ? (
    <h3>No Product found</h3>
  ) : (
    <div className="App">
      <h1>React Pagination</h1>
      <button disabled={currValue == 0} onClick={() => goTOPrevious()}>
        {"<-"}
      </button>
      {[...Array(totalLength).keys()].map((n) => {
        return (
          <button
            className={`page-btn ${currValue == n ? "active" : " "}`}
            onClick={() => handlePageClick(n)}
          >
            {n}
          </button>
        );
      })}
      <button disabled={currValue === totalLength-1} onClick={() => goToNext()}>
        {"->"}
      </button>
      <div className="main-container">
        {productData.slice(start, endPoint).map((product) => {
          return (
            <ProductCard
              key={product.id}
              image={product.thumbnail}
              alt={product.title}
              title={product.title}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
