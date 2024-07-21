import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PhanTrang from "./PhanTrang"; // Correct path to PhanTrang component

function SPTrongLoai() {
  let { id_loai } = useParams();
  const [list_sp, setListSP] = useState([]);
  const [loai, setLoai] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/sptrongloai/${id_loai}`)
      .then((res) => res.json())
      .then((data) => setListSP(data))
      .catch((error) => console.error("Error fetching products:", error));

    fetch(`http://localhost:3000/loai/${id_loai}`)
      .then((res) => res.json())
      .then((data) => setLoai(data))
      .catch((error) => console.error("Error fetching category:", error));
  }, [id_loai]);

  return (
    <div id="listsp">
      <h1>Sản phẩm trong loại {loai && loai.ten_loai}</h1>
      <PhanTrang listSP={list_sp} pageSize={6} />
      {/* <div id="data" className="home">
        {list_sp.map((sp, index) => (
          <div className="sp" key={index}>
            <h4>
              <Link to={`/sp/${sp.id}`}>{sp.ten_sp}</Link>
            </h4>
            <img src={sp.hinh} alt={sp.ten_sp} />
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default SPTrongLoai;
