import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSKU, getSKUById } from '../../Services/SKUService';
import '../../DisplayView.css';

const SKUEdit = () => {
    let navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [sku, setSku] = useState({});
    const [description, setDescription] = useState("");
    const param = useParams();

    const setSKUData = () => {
        getSKUById(param.skuno).then((response) => {
            setSku(response.data);
        });
    }

    useEffect(() => {
        setSKUData();
    }, []);

    const editSKU = (event) => {
    event.preventDefault();
    sku.skuDescription = description;
    updateSKU(sku).then((response) => {
        alert("SKU updated");
        navigate('/sku-list');
    });
}

const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!description.trim()) {
        tempErrors.skuDescription = "SKU description is required";
        isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
        editSKU(event);
    }
};

const returnBack = () => {
    navigate('/sku-list');
}

return (
  <div className="page-background">

    <div className="form-container">

      <h2 className="form-title">SKU Update</h2>

      <form>

        <div className="form-group">
          <label>SKU ID</label>
          <input
            className="form-control"
            value={sku.skuId || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>SKU Category</label>
          <input
            className="form-control"
            value={sku.category || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>SKU Description</label>
          <input
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.skuDescription && (
            <p className="error-text">{errors.skuDescription}</p>
          )}
        </div>

        <div className="btn-group-center">
          <button className="submit-btn" onClick={handleValidation}>
            Submit
          </button>

          <button className="return-btn" onClick={returnBack}>
            Return
          </button>
        </div>

      </form>

    </div>

  </div>
);
 

}

export default SKUEdit;