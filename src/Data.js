import React, { useState, useEffect } from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";           
import {FilterMatchMode} from "primereact/api";
import {InputText} from "primereact/inputtext";
import 'bootstrap/dist/css/bootstrap.min.css';
function Data(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
    fetch("https://hub.dummyapis.com/employee?noofRecords=100&idStarts=1")
    .then((res) => res.json())
    .then(
    (result) => {
    setIsLoaded(true);
    setItems(result);
    },
    (error) => {
    setIsLoaded(true);
    setError(error);
    }
    );
    }, []);
    const [filters,setFilters] = useState({
      global : {value : null, matchMode : FilterMatchMode.CONTAINS},
    })
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
      const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
      const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;  
      const ActionDelete = (rowData) => {
        return (
             <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => (rowData)} />
        );
    }
    
       const bt =<button>hhhhh</button>
      return (
      <div className="datatable-templating-demo">
      <h1 className=" p-3 mb-2 bg-info  text-white text-center">Liste Employe</h1>
                <span className="p-input-icon-left flex justify-content-end  ">
                    <i className="pi pi-search " />
                    <InputText 
                    onInput={(e)=>setFilters({...filters,global: {value:e.target.value,matchMode : FilterMatchMode.CONTAINS},})} placeholder="Keyword Search"/>                 
                      </span>
       <DataTable  
       value={items} sortMode="multiple" removableSort  rowClassName="text-dark"  responsiveLayout="scroll"
       paginator 
       paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
       currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
       paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
       filters = {filters}
       >
    <Column field="id" header="Employe ID" sortable  headerClassName="text-info"></Column>
    <Column field="lastName" header="Last Name" sortable headerClassName="text-info"></Column>
    <Column field="firstName" header="First Name" sortable headerClassName="text-info"></Column>
    <Column field="email" header="Email" sortable headerClassName="text-info"></Column>
    <Column field="bt" header="delete"></Column>
    <Column body={ActionDelete} exportable={false} style={{ minWidth: '8rem' }}></Column>
</DataTable>
    </div>
    )
}}
export default Data;