import{j as a}from"./jsx-runtime-CDt2p4po.js";import{r as O}from"./index-GiUgBvb1.js";import{O as e}from"./index-BhWK_nAw.js";const V={title:"Components/Dropdown",component:e,tags:["autodocs"]},n=[{value:"opt1",label:"Option One"},{value:"opt2",label:"Option Two"},{value:"opt3",label:"Option Three"},{value:"opt4",label:"Option Four"}],r={render:()=>{const[p,c]=O.useState("");return a.jsx(e,{options:n,value:p,onChange:c,placeholder:"Select an option..."})}},o={render:()=>{const[p,c]=O.useState("opt2");return a.jsx(e,{options:n,value:p,onChange:c})}},t={render:()=>a.jsx(e,{options:n,placeholder:"Error state",error:!0})},s={render:()=>a.jsx(e,{options:n,value:"opt1",success:!0})};var u,l,d;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string>('');
    return <Dropdown options={options} value={value} onChange={setValue} placeholder="Select an option..." />;
  }
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var i,m,S;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string>('opt2');
    return <Dropdown options={options} value={value} onChange={setValue} />;
  }
}`,...(S=(m=o.parameters)==null?void 0:m.docs)==null?void 0:S.source}}};var v,g,h;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <Dropdown options={options} placeholder="Error state" error />
}`,...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var x,D,E;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <Dropdown options={options} value="opt1" success />
}`,...(E=(D=s.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};const C=["Default","WithPreselected","ErrorState","SuccessState"];export{r as Default,t as ErrorState,s as SuccessState,o as WithPreselected,C as __namedExportsOrder,V as default};
