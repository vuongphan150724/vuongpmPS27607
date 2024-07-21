import React from "react";
import { useSelector } from "react-redux";
import './ThanhToan.css';
import { Link } from "react-router-dom";

function ThanhToan() {
  let htRef = React.createRef();
  let emRef = React.createRef();
  let sdtRef = React.createRef();
  let vitriRef = React.createRef();

  const cart = useSelector(state => state.cart.listSP);

  const submitDuLieu = () => {
    let ht = htRef.current.value;
    let em = emRef.current.value;
    let sdt = sdtRef.current.value;
    let vitri = vitriRef.current.value;

    if (ht === "" || em === "" || sdt === "" || vitri === "") {
      alert('Nhập đủ thông tin bạn ơi');
      return;
    }

    if (cart.length === 0) {
      alert('Bạn chưa chọn sản phẩm nào');
      return;
    }

    let url = "http://localhost:3000/luudonhang";
    let tt = {
      ho_ten: ht,
      email: em,
      sdt: sdt,
      vitri: vitri
    };

    var opt = {
      method: "post",
      body: JSON.stringify(tt),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(url, opt)
      .then(res => res.json())
      .then(data => {
        if (data.id_dh < 0) {
          console.log("Lỗi lưu đơn hàng", data);
        } else {
          let id_dh = data.id_dh;
          console.log("Đã lưu xong giỏ hàng");
          luuchitietdonhang(id_dh, cart);
        }
      })
      .catch(error => console.error("Fetch error:", error));
  };

  const luuchitietdonhang = (id_dh, cart) => {
    let url = "http://localhost:3000/luugiohang";

    cart.forEach(sp => {
      let t = { id_dh: id_dh, id_sp: sp.id, so_luong: sp.so_luong };
      let opt = {
        method: "post",
        body: JSON.stringify(t),
        headers: { 'Content-Type': 'application/json' }
      };

      fetch(url, opt)
        .then(res => res.json())
        .then(data => luuxongsp(data))
        .catch(err => console.log('Lỗi lưu sp ', sp, err));
    });
  };

  const luuxongsp = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="input-container">
        <input type="text" ref={htRef} placeholder="Họ tên" />
        <input type="text" ref={emRef} placeholder="Email" />
        <input type="text" ref={sdtRef} placeholder="Số điện thoại" />
        <input type="text" ref={vitriRef} placeholder="Vị trí" />
      </div>
      <div className="button-container">
        <button onClick={submitDuLieu}><Link to="/donhang">Lưu đơn hàng</Link></button>
      </div>
    </div>
  );
}

export default ThanhToan;
