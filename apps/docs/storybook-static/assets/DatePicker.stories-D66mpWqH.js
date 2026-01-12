import{j as o}from"./jsx-runtime-CDt2p4po.js";import{r as c}from"./index-GiUgBvb1.js";import{J as s}from"./index-BhWK_nAw.js";const S={title:"Components/DatePicker",component:s,tags:["autodocs"]},a={render:()=>{const[e,t]=c.useState(void 0);return o.jsx(s,{value:e,onChange:t})}},r={render:()=>{const[e,t]=c.useState(new Date(2024,5,15));return o.jsx(s,{value:e,onChange:t,label:"Event Date"})}},n={render:()=>{const[e,t]=c.useState(void 0);return o.jsx(s,{value:e,onChange:t,label:"Launch Date"})}};var d,u,D;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return <DatePicker value={date} onChange={setDate} />;
  }
}`,...(D=(u=a.parameters)==null?void 0:u.docs)==null?void 0:D.source}}};var l,m,i;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = useState<Date>(new Date(2024, 5, 15));
    return <DatePicker value={date} onChange={setDate} label="Event Date" />;
  }
}`,...(i=(m=r.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var p,f,g;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return <DatePicker value={date} onChange={setDate} label="Launch Date" />;
  }
}`,...(g=(f=n.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};const x=["Default","WithPreselectedDate","CustomLabel"];export{n as CustomLabel,a as Default,r as WithPreselectedDate,x as __namedExportsOrder,S as default};
