import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return <p>No hay datos disponibles.</p>;
  }

  return (
    <div className="detail-container">
      <h2>Detalles del Producto</h2>
      <table className="detail-table">
        <tbody>
          <tr>
            <th>Nombre del Equipo</th>
            <td>{product.name}</td>
          </tr>
          <tr>
            <th>Referencia del Equipo</th>
            <td>{product.reference}</td>
          </tr>
          <tr>
            <th>Sala</th>
            <td>{product.category}</td>
          </tr>
          <tr>
            <th>Estado</th>
            <td>{product.status}</td>
          </tr>
          <tr>
            <th>Fecha de Ingreso</th>
            <td>{product.entryDate}</td>
          </tr>
          <tr>
            <th>OS</th>
            <td>{product.OS}</td>
          </tr>
          <tr>
            <th>Tipo de computadora </th>
            <td>{product.lap}</td>
          </tr>
        </tbody>
      </table>
      <button className="back-button" onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default ProductDetail;
