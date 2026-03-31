import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { saveNewProduct, productIdGenerator } from '../../Services/ProductService';
import { getUsersByRole } from '../../Services/LoginService';
import { getAllCategories, getSkuIdByCategory } from '../../Services/SKUService';
import '../../DisplayView.css';

const ProductEntry = () => {

const [product, setProduct] = useState({
 productId:"",
 productName:"",
 skuId:"",
 purchasePrice:0.0,
 salesPrice:0.0,
 reorderLevel:0.0,
 stock:0.0,
 vendorId:"",
 status:true
});

let [newId,setNewId] = useState("");
const [vendorList,setVendorList] = useState([]);
const [skuCategoryList,setSkuCategoryList] = useState([]);
const [skuCategory,setSkuCategory] = useState("");
const [skuIdList,setSkuIdList] = useState([]);
const [flag,setFlag] = useState(false);
const [errors,setErrors] = useState({});
let navigate = useNavigate();

const setNewProductId = () => {
productIdGenerator().then((response)=>{
setNewId(response.data);
});
}

const setVendors = () => {
getUsersByRole('Vendor').then((response)=>{
setVendorList(response.data);
});
}

const getSkuCategoryList = () => {
getAllCategories().then((response)=>{
setSkuCategoryList(response.data);
});
}

useEffect(()=>{
setNewProductId();
setVendors();
getSkuCategoryList();
setFlag(false);
},[]);

const saveProduct = (event) => {
event.preventDefault();

product.productId=newId;
product.productName=skuCategory;

if(parseFloat(product.stock)<=parseFloat(product.reorderLevel))
product.status=false;

saveNewProduct(product).then(res=>{
setFlag(true);
});
};

const onChangeHandler = (event) =>{
const name = event.target.name;
const value = event.target.value;

setProduct(values => ({
...values,
[name]: value
}));
};

const handleStateChange = (event) => {

let value = event.target.value;

if(value.trim() && toString(value.trim()!=="---")){

setSkuCategory(value);

getSkuIdByCategory(value).then((response)=>{
setSkuIdList(response.data);
});

}
}

const clearAll = ()=>{
setProduct({
...product,
productName:"",
skuId:"",
purchasePrice:0.0,
reorderLevel:0.0,
stock:0.0,
vendorId:""
});

setErrors({});
}

const handleValidation = (event) => {

event.preventDefault();

let tempErrors = {};
let isValid = true;

if(!skuCategory.trim()){
tempErrors.skuCategory = "Sku Category is required";
isValid = false;
}

if(!skuCategory.trim()==="---"){
tempErrors.skuCategory = "Sku Category is cannot be '---'";
isValid = false;
}

if(parseFloat(product.purchasePrice)<=0){
tempErrors.purchasePrice="Purchase Price cannot be 0 or negative";
isValid = false;
}

if(parseFloat(product.stock)<=0){
tempErrors.stock="Stock cannot be 0 or negative";
isValid = false;
}

if(parseFloat(product.reorderLevel)<=0){
tempErrors.reorderLevel="Reorder Level cannot be 0 or negative";
isValid = false;
}

if(!product.skuId.trim()){
tempErrors.skuId = "SKU is required";
isValid = false;
}

if(!product.skuId.trim()==="---"){
tempErrors.skuId = "SKU cannot be '---'";
isValid = false;
}

if(!product.vendorId.trim()){
tempErrors.vendorId = "Vendor Id is required";
isValid = false;
}

else if(!product.vendorId.trim()==="---"){
tempErrors.vendorId = "Vendor Id is cannot be '---'";
isValid = false;
}

setErrors(tempErrors);

if(isValid){
saveProduct(event);
}
};

const nextEntry = ()=>{

setNewProductId();

setProduct({
 productId:"",
 productName:"",
 skuId:"",
 purchasePrice:0.0,
 salesPrice:0.0,
 reorderLevel:0.0,
 stock:0.0,
 vendorId:"",
 status:true
});

setFlag(false);

navigate("/product-entry")
}

return (

<div className="product-background">

<div className="product-card">

<h2 className="text-center mb-4">New Product Addition</h2>

<form>

<div className="form-group">
<label>Product Id</label>
<input className="form-control" value={newId} readOnly/>
</div>

<div className="form-group">
<label>Select SKU Category</label>
<select className="form-control" value={skuCategory} onChange={handleStateChange}>
<option>---</option>
{
skuCategoryList.map((skuCat,index)=>(
<option key={index} value={skuCat}>{skuCat}</option>
))
}
</select>
{errors.skuCategory && <p className="error">{errors.skuCategory}</p>}
</div>

<div className="form-group">
<label>Select SKU Id</label>
<select name="skuId" className="form-control" value={product.skuId} onChange={onChangeHandler}>
<option>---</option>
{
skuIdList.map((skuNo,index)=>(
<option key={index} value={skuNo}>{skuNo}</option>
))
}
</select>
{errors.skuId && <p className="error">{errors.skuId}</p>}
</div>

<div className="form-group">
<label>Purchase Price</label>
<input name="purchasePrice" className="form-control" value={product.purchasePrice} onChange={onChangeHandler}/>
{errors.purchasePrice && <p className="error">{errors.purchasePrice}</p>}
</div>

<div className="form-group">
<label>Stock</label>
<input name="stock" className="form-control" value={product.stock} onChange={onChangeHandler}/>
{errors.stock && <p className="error">{errors.stock}</p>}
</div>

<div className="form-group">
<label>Re Order Level</label>
<input name="reorderLevel" className="form-control" value={product.reorderLevel} onChange={onChangeHandler}/>
{errors.reorderLevel && <p className="error">{errors.reorderLevel}</p>}
</div>

<div className="form-group">
<label>Select Vendor Id</label>
<select name="vendorId" className="form-control" value={product.vendorId} onChange={onChangeHandler}>
<option>---</option>
{
vendorList.map((user,index)=>(
<option key={index} value={user}>{user}</option>
))
}
</select>
{errors.vendorId && <p className="error">{errors.vendorId}</p>}
</div>

<div className="text-center mt-3">

<button className="btn btn-success" onClick={handleValidation}>Save</button>

&nbsp;&nbsp;

<button type="button" className="btn btn-secondary" onClick={clearAll}>Reset</button>

&nbsp;&nbsp;

<Link to="/admin-menu">
<button className="btn btn-warning">Return Back</button>
</Link>

</div>

</form>

{flag &&

<div className="text-center mt-3">

<p style={{color:"blue"}}>
New Product Added
</p>

<button className='btn btn-info' onClick={nextEntry}>
Next Entry
</button>

</div>

}

</div>

</div>

);
}

export default ProductEntry;