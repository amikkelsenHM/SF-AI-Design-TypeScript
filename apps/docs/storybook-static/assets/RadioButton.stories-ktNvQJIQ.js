import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as x}from"./index-GiUgBvb1.js";import{Q as a}from"./index-BhWK_nAw.js";const v={title:"Components/RadioButton",component:a,tags:["autodocs"]},o={args:{label:"Option A",name:"default-radio"}},t={render:()=>{const[r,s]=x.useState("opt1");return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx(a,{label:"Option One",name:"radio-group",value:"opt1",checked:r==="opt1",onChange:()=>s("opt1")}),e.jsx(a,{label:"Option Two",name:"radio-group",value:"opt2",checked:r==="opt2",onChange:()=>s("opt2")}),e.jsx(a,{label:"Option Three",name:"radio-group",value:"opt3",checked:r==="opt3",onChange:()=>s("opt3")})]})}},d={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx(a,{label:"Disabled unchecked",name:"disabled",disabled:!0}),e.jsx(a,{label:"Disabled checked",name:"disabled-checked",disabled:!0,defaultChecked:!0})]})};var l,n,c;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    label: 'Option A',
    name: 'default-radio'
  }
}`,...(c=(n=o.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var i,p,u;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState('opt1');
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
        <RadioButton label="Option One" name="radio-group" value="opt1" checked={selected === 'opt1'} onChange={() => setSelected('opt1')} />
        <RadioButton label="Option Two" name="radio-group" value="opt2" checked={selected === 'opt2'} onChange={() => setSelected('opt2')} />
        <RadioButton label="Option Three" name="radio-group" value="opt3" checked={selected === 'opt3'} onChange={() => setSelected('opt3')} />
      </div>;
  }
}`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var m,b,h;d.parameters={...d.parameters,docs:{...(m=d.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
      <RadioButton label="Disabled unchecked" name="disabled" disabled />
      <RadioButton label="Disabled checked" name="disabled-checked" disabled defaultChecked />
    </div>
}`,...(h=(b=d.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};const D=["Default","RadioGroup","Disabled"];export{o as Default,d as Disabled,t as RadioGroup,D as __namedExportsOrder,v as default};
