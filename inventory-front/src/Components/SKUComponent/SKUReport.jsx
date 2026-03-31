import React,{useState,useEffect} from 'react';
import {useNavigate,Link} from 'react-router-dom';
import {getAllSKUs,deleteSKUById} from "../../Services/SKUService";
import {getRole} from '../../Services/LoginService';
import '../../DisplayView.css';
 
const SKUReport = () => {

let navigate = useNavigate();

const [role,setRole] = useState("");
const [skuList,setSkuList] = useState([]);

const setRoleData = () => {
getRole().then((response)=>{
setRole(response.data);
});
}

const setSKURecords = () => {
getAllSKUs().then((response)=>{
setSkuList(response.data);
});
}

useEffect(()=>{
setRoleData();
setSKURecords();
},[]);

const returnBack = () => {

if(role==='Admin')
navigate('/admin-menu');

else if(role==='Manager')
navigate('/manager-menu');

};

const deleteSKU = (id) => {

deleteSKUById(id).then(res => {

let remainSkus = skuList.filter((sku)=>sku.skuId!==id);

setSkuList(remainSkus);

});

};

return (
  <div className="report-background">

    <div className="report-wrapper">

      <div className="report-card">

        <h2 className="report-title">
          {role === 'Admin' ? "Admin SKU List" : "Manager SKU List"}
        </h2>

        <div className="table-wrapper">

          <table className="custom-table">

            <thead>
              <tr>
                <th>No.</th>
                <th>SKU Id</th>
                <th>Description</th>
                <th>Category</th>
                {role === 'Admin' && <th>Action</th>}
              </tr>
            </thead>

            <tbody>
              {skuList.map((sku, index) => (
                <tr key={sku.skuId}>

                  <td>{index + 1}</td>
                  <td>{sku.skuId}</td>
                  <td>{sku.skuDescription}</td>
                  <td>{sku.category}</td>

                  {role === 'Admin' && (
                    <td className="action-buttons">

                      <Link to={`/update-sku/${sku.skuId}`}>
                        <button className="update-btn">
                          Update
                        </button>
                      </Link>

                      <button
                        className="delete-btn"
                        onClick={() => deleteSKU(sku.skuId)}
                      >
                        Delete
                      </button>

                    </td>
                  )}

                </tr>
              ))}
            </tbody>

          </table>

        </div>

        <div className="return-wrapper">
          <button
            className="return-btn-modern"
            onClick={returnBack}
          >
            Return
          </button>
        </div>

      </div>

    </div>

  </div>
);

};

export default SKUReport;