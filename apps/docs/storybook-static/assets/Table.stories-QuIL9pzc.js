import{j as r}from"./jsx-runtime-CDt2p4po.js";import{R as n,P as i}from"./index-BhWK_nAw.js";import"./index-GiUgBvb1.js";const y={title:"Components/Table",component:n,tags:["autodocs"]},m=[{id:1,name:"Object Alpha",status:"success",date:"2024-01-15",value:1250},{id:2,name:"Object Beta",status:"warning",date:"2024-01-14",value:890},{id:3,name:"Object Gamma",status:"error",date:"2024-01-13",value:2100},{id:4,name:"Object Delta",status:"processing",date:"2024-01-12",value:450},{id:5,name:"Object Epsilon",status:"success",date:"2024-01-11",value:3200}],a={render:()=>r.jsx(n,{columns:[{key:"id",header:"ID",width:"60px"},{key:"name",header:"Name"},{key:"status",header:"Status",render:e=>r.jsx(i,{variant:e,children:e})},{key:"date",header:"Date"},{key:"value",header:"Value",render:e=>`$${e.toLocaleString()}`}],data:m})},t={render:()=>r.jsx(n,{columns:[{key:"id",header:"ID"},{key:"name",header:"Name"},{key:"status",header:"Status"}],data:m,onRowClick:e=>alert(`Clicked: ${e.name}`)})};var s,d,o;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <Table columns={[{
    key: 'id',
    header: 'ID',
    width: '60px'
  }, {
    key: 'name',
    header: 'Name'
  }, {
    key: 'status',
    header: 'Status',
    render: value => <Badge variant={value}>{value}</Badge>
  }, {
    key: 'date',
    header: 'Date'
  }, {
    key: 'value',
    header: 'Value',
    render: value => \`$\${value.toLocaleString()}\`
  }]} data={sampleData} />
}`,...(o=(d=a.parameters)==null?void 0:d.docs)==null?void 0:o.source}}};var l,u,c;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <Table columns={[{
    key: 'id',
    header: 'ID'
  }, {
    key: 'name',
    header: 'Name'
  }, {
    key: 'status',
    header: 'Status'
  }]} data={sampleData} onRowClick={row => alert(\`Clicked: \${row.name}\`)} />
}`,...(c=(u=t.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};const v=["Default","WithRowClick"];export{a as Default,t as WithRowClick,v as __namedExportsOrder,y as default};
