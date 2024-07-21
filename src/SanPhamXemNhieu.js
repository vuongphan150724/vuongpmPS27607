import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './SanPhamXemNhieu.css';

function SanPhamXemNhieu(props) {
  const [listsp, setListSP] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/spxemnhieu/${props.sotin}`) // Đảm bảo URL này đúng với API của bạn
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setListSP(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [props.sotin]);

  return (
    <div id="spxn">
      {listsp.map((sp, i) => (
        <div className="sp" key={i}>
          <Link to={`/sp/${sp.id}`}>
            <h4 className="sp-title">{sp.ten_sp}</h4>
            
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SanPhamXemNhieu;
