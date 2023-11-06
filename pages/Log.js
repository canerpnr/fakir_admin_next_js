import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useEffect, useState } from 'react';
const Log=()=>{
    const [products, setProducts] = useState(null);
    const columns = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'birim', header: 'Quantity' },
    ];

    const data = [
        {
            code:1,
            name:"Ali",
            category:"Denetleme",
            price:78,
            quantity:90

        },
        {
            code:2,
            name:"Ali",
            category:"Denetleme",
            price:78,
            quantity:90
        },
        {
            code:3,
            name:"Ali",
            category:"Denetleme",
            price:78,
            quantity:90

        }
    ]

    useEffect(() => {
        setProducts(data);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return(
        <div
            style={{
            display: 'flex',
            justifyContent: 'Right',
            alignItems: 'Right'
          }}>
        <DataTable  editMode="row" value={products} tableStyle={{ minWidth: '50rem' }}>
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category" onCellEditInit={()=>{}}></Column>
            <Column field="quantity" header="Quantity"></Column>
            <Column rowEditor  bodyStyle={{ textAlign: 'center' }}></Column>
        </DataTable>
        </div>
    )
}
export default Log;