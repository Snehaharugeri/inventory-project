import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {saveSKU} from "../../Services/SKUService";
import '../../DisplayView.css';

const SKUEntry = () => {

let navigate = useNavigate();

const [errors,setErrors] = useState({});
const [flag,setFlag] = useState(false);

const [skuData,setSkuData] = useState({
    skuId:"",
    skuDescription:"",
    category:"",
});

useEffect(() => {
 setFlag(false);
}, []);

const createNewSKU = (event) => {
event.preventDefault();

saveSKU(skuData).then((response)=>{
setFlag(true);
});
};

const onChangeHandler = (event) =>{
setFlag(false);

const name = event.target.name;
const value = event.target.value;

setSkuData(values =>({...values, [name]: value }));
};

const handleValidation = (event) => {

event.preventDefault();

let tempErrors = {};
let isValid = true;

if (!skuData.skuId.trim()) {
tempErrors.skuId = "SKU Id is required";
isValid = false;
}

if (!skuData.skuDescription.trim()) {
tempErrors.skuDescription = "SKU description is required";
isValid = false;
}

if (!skuData.category.trim()) {
tempErrors.category = "SKU Category is required";
isValid = false;
}

setErrors(tempErrors);

if (isValid) {
createNewSKU(event);
}
};

const returnBack = ()=>{
navigate('/admin-menu');
};

const nextEntry = ()=>{

setSkuData({
skuId:"",
skuDescription:"",
category:""
});

setFlag(false);

navigate('/sku-entry');
}

return(

<div className="sku-background">

<div className="sku-card">

<h2 className="form-title">New SKU Entry</h2>

<form>

<div className="form-group">

<label>SKU ID</label>

<input
placeholder="Enter SKU Id"
name="skuId"
className="form-control"
value={skuData.skuId}
onChange={onChangeHandler}
/>

{errors.skuId && <p className="error">{errors.skuId}</p>}

</div>


<div className="form-group">

<label>SKU Description</label>

<input
placeholder="Enter SKU Description"
name="skuDescription"
className="form-control"
value={skuData.skuDescription}
onChange={onChangeHandler}
/>

{errors.skuDescription && <p className="error">{errors.skuDescription}</p>}

</div>


<div className="form-group">

<label>SKU Category</label>

<input
placeholder="Enter Category"
name="category"
className="form-control"
value={skuData.category}
onChange={onChangeHandler}
/>

{errors.category && <p className="error">{errors.category}</p>}

</div>


<div className="form-buttons">

<button className="primary-btn" onClick={handleValidation}>
Submit
</button>

<button type="button" className="secondary-btn" onClick={returnBack}>
Return
</button>

</div>

</form>


{flag &&

<div className="success-box">

<p className="success-text">
New SKU Added Successfully ✔
</p>

<button className="next-btn" onClick={nextEntry}>
Add Next SKU
</button>

</div>

}

</div>

</div>

);
};

export default SKUEntry;