import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ProductDetail = ({ products = [], onDelete, onEdit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const indexlocal = location.state?.index;
  products = products.filter((_, i) => i === indexlocal);
  const [editIndex, setEditIndex] = useState(() => {
    const stored = sessionStorage.getItem("editIndex");
    return stored ? parseInt(stored, 10) : null;
  });
  const [editValue, setEditValue] = useState(() => localStorage.getItem("editValue") || "");
  const [editCategory, setEditCategory] = useState(() => localStorage.getItem("editCategory") || "");
  const [editStatus, setEditStatus] = useState(() => localStorage.getItem("editStatus") === "true");
  const [editEntryDate, setEditEntryDate] = useState(() => localStorage.getItem("editEntryDate") || "");
  const [editReference, setEditReference] = useState(() => localStorage.getItem("editReference") || "");
  const [editOS, setEditOS] = useState(() => localStorage.getItem("editOS") || "");
  const [editLaptop, setEditLaptop] = useState(() => localStorage.getItem("editLaptop") === "true");

  useEffect(() => {
    localStorage.setItem("editIndex", editIndex !== null ? editIndex : "");
    localStorage.setItem("editValue", editValue);
    localStorage.setItem("editCategory", editCategory);
    localStorage.setItem("editStatus", editStatus);
    localStorage.setItem("editEntryDate", editEntryDate);
    localStorage.setItem("editReference", editReference);
    localStorage.setItem("editOS", editOS);
    localStorage.setItem("editLaptop", editLaptop);
  }, [editIndex, editValue, editCategory, editStatus, editEntryDate, editReference, editOS, editLaptop]);

  useEffect(() => {
    sessionStorage.setItem("editIndex", editIndex);
  }, [editIndex]);
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("editIndex");
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCancel();
      }
    };

    if (editIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editIndex]);

  useEffect(() => {
    sessionStorage.setItem("editIndex", editIndex !== null ? editIndex : "");
    sessionStorage.setItem("editValue", editValue);
    sessionStorage.setItem("editCategory", editCategory);
    sessionStorage.setItem("editStatus", editStatus);
    sessionStorage.setItem("editEntryDate", editEntryDate);
    sessionStorage.setItem("editReference", editReference);
    sessionStorage.setItem("editOS", editOS);
    sessionStorage.setItem("editLaptop", editLaptop);
  }, [editIndex, editValue, editCategory, editStatus, editEntryDate, editReference, editOS, editLaptop]);


  const handleEdit = (index, product) => {
    setEditIndex(index);
    setEditValue(product.name);
    setEditCategory(product.category);
    setEditStatus(product.status === "Usado");
    setEditEntryDate(product.entryDate);
    setEditReference(product.reference);
    setEditOS(product.OS);
    setEditLaptop(product.lap === "Portátil");
  };


  const handleSave = (index) => {
    const today = new Date().toISOString().split("T")[0];
    if (editEntryDate > today) {
      alert("La fecha de ingreso no puede ser futura.");
      return;
    }

    if (editValue.trim() && editCategory.trim() && editEntryDate) {
      onEdit(index, {
        name: editValue,
        category: editCategory,
        status: editStatus ? "Usado" : "Nuevo",
        entryDate: editEntryDate,
        reference: editReference,
        OS: editOS,
        lap: editLaptop ? "Portátil" : "Escritorio",
      });
      setEditIndex(null);
    }
  };


  const handleCancel = () => {
    setEditIndex(null);
    setEditValue("");
    setEditCategory("");
    setEditStatus(false);
    setEditEntryDate("");
    setEditReference("");
    setEditOS("");
    setEditLaptop(false);

    // Clear localStorage
    localStorage.removeItem("editIndex");
    localStorage.removeItem("editValue");
    localStorage.removeItem("editCategory");
    localStorage.removeItem("editStatus");
    localStorage.removeItem("editEntryDate");
    localStorage.removeItem("editReference");
    localStorage.removeItem("editOS");
    localStorage.removeItem("editLaptop");
  };


  const dic_OS = {
    Windows: { "Windows 10": "Windows 10", "Windows 11": "Windows 11" },
    Linux: { Ubuntu: "Ubuntu", Fedora: "Fedora" },
    MacOS: { MacOS: "MacOS" },
  };

  const dic_category = {
    edificio_giordano: {
      "Sala 1E": "Sala 1E",
      "Lab. Software": "Lab. Software",
    },
    edificio_santo_domingo: {
      "Sala 1F": "Sala 1F",
      "Sala 2F": "Sala 2F",
    },
  };


  return (
    <div>
      <div>
        <ul>
          {products.map((product) => (
            <li key={indexlocal} className="product-item" style={{ display: "flex", flexDirection: "column" }}>

              <div className="product-content" >
                {editIndex === indexlocal ? (
                  <>
                    <InputElement
                      value={editValue}
                      setValue={setEditValue}
                      placeholder="Nombre del Equipo"
                      type={"Text"}
                    />
                    <InputElement
                      value={editReference}
                      setValue={setEditReference}
                      placeholder="Referencia del Equipo"
                      type={"Number"}
                    />
                    <SelectElement
                      value={editCategory}
                      setValue={setEditCategory}
                      dicCategory={dic_category}
                      initialItem={"Seleccione la sala"}
                    />
                    <SelectElement
                      value={editOS}
                      setValue={setEditOS}
                      dicCategory={dic_OS}
                      initialItem={"Seleccione el sistema operativo"}
                    />
                    <DateElement
                      value={editEntryDate}
                      setValue={setEditEntryDate}
                      text={"Fecha de ingreso del equipo:"}
                    />
                    <section
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <CheckboxElement
                        checked={editStatus}
                        id="estado-equipo"
                        setChecked={setEditStatus}
                        text={"Computaador Usado "}
                      />
                      <CheckboxElement
                        checked={editLaptop}
                        id="laptop"
                        setChecked={setEditLaptop}
                        text={"Laptop"}
                      />
                    </section>
                  </>
                ) : (
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

                  </div>
                )}
              </div>
              <div className="button-group">
                {editIndex === indexlocal ? (
                  <>
                    <button
                      className="save-btn"
                      onClick={() => handleSave(indexlocal)}
                    >
                      Guardar
                    </button>
                    <button className="cancel-btn" onClick={handleCancel}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>

                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(indexlocal, product)}
                    >
                      Editar
                    </button>


                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

const DateElement = ({ value, setValue, text }) => {
  return (
    <>
      <label>{text}</label>
      <input
        type="date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        max={new Date().toISOString().split("T")[0]}
        required
      />
    </>
  );
};

const CheckboxElement = ({ checked, id, setChecked, text }) => {
  return (
    <label className="checkbox-container" style={{ marginRight: "10px" }}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      {text}
    </label>
  );
};

const SelectElement = ({ value, setValue, dicCategory, initialItem }) => {
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)}>
      <option value="">{initialItem}</option>
      {Object.keys(dicCategory).map((building) => (
        <optgroup key={building} label={building.replace("_", " ")}>
          {Object.keys(dicCategory[building]).map((room) => (
            <option key={room} value={dicCategory[building][room]}>
              {dicCategory[building][room]}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

const InputElement = ({ value, setValue, placeholder, type }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default ProductDetail;
