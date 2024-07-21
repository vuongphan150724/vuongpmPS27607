import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ChiTiet.css"; // Import CSS file for ChiTiet component styling

function ChiTiet() {
    let { id } = useParams();
    const [sp, ganSP] = useState(null); // Use null to initialize the initial value
    const [sanPhamLienQuan, setSanPhamLienQuan] = useState([]); // State for related products
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        let url = `http://localhost:3000/sp/${id}`;
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                ganSP(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

        // Fetch related products
        fetch(`http://localhost:3000/sanpham_lienquan/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setSanPhamLienQuan(data);
            })
            .catch(error => {
                console.error("Error fetching related products:", error);
            });

    }, [id]);

    if (loading) {
        return <div className="container">Loading...</div>;
    }

    if (error) {
        return <div className="container">Error: {error.message}</div>;
    }

    return (
        <div className="container">
            <div className="chitiet">
                <h1>Chi Tiết Sản Phẩm</h1>
                {sp ? (
                    <>
                        <div className="row1">
                            <div className="trai">
                                <img src={sp.hinh} alt={sp.ten_sp} />
                            </div>
                            <div className="phai">
                                <h3 className="h3">{sp.ten_sp}</h3>
                                <p><span>ID:</span> {sp.id}</p>
                                <p><span>Giá:</span> {sp.gia}</p>
                                <p><span>Giá Khuyến Mại:</span> {sp.gia_km}</p>
                                <p><span>Ngày:</span> {sp.ngay}</p>
                                <p><span>Lượt Xem:</span> {sp.luot_xem}</p>
                            </div>
                        </div>
                       
                        <div className="sanpham-lienquan">
                            <h2>Sản Phẩm Liên Quan</h2>
                            <div className="related-products">
                                {sanPhamLienQuan.map((sp, i) => (
                                    <div className="sp" key={i}>
                                        <Link to={`/sp/${sp.id}`}>
                                            <h4 className="sp-title">{sp.ten_sp}</h4>
                                            <p>Giá: {Number(sp.gia).toLocaleString("vi")} VNĐ</p>
                                            <img src={sp.hinh} alt={sp.ten_sp} width="100" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Không tìm thấy sản phẩm</p>
                )}
            </div>
        </div>
    );
}

export default ChiTiet;
