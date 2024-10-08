import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Card from "../components/Card.jsx";

function Home() {
  const [foodData, setFoodData] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [search,setSearch]=useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    /*console.log(response[0],response[1]);*/

    setFoodData(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "5" }}>
              <div className="d-flex justify-content">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                />
                {/* <button
                  className="btn btn-outline-light text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="/burger.jpg" className="d-block w-100" alt="burger" />
            </div>
            <div className="carousel-item">
              <img src="/pizza.jpg" className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src="/sand.jpg" className="d-block w-100" />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3" >
                <div key={data.id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {/* food data */}
                {foodData !== [] ? (
                  foodData
                    .filter((item) => (item.CategoryName == data.CategoryName)&&(item.name.toLowerCase().includes(search.toLowerCase())))
                    .map((filteredItems) => {
                      return (
                        <div
                          key={filteredItems.id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filteredItems}
                            options={filteredItems.options[0]}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>No Such Data Found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>""</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
