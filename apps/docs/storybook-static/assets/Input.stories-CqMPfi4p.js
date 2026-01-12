import{j as e}from"./jsx-runtime-CDt2p4po.js";import{C as s}from"./index-BhWK_nAw.js";import"./index-GiUgBvb1.js";const j={title:"Components/Input",component:s,tags:["autodocs"],argTypes:{error:{control:"boolean"},disabled:{control:"boolean"},placeholder:{control:"text"}}},r={args:{placeholder:"Enter text..."}},a={args:{placeholder:"Invalid input",error:!0}},o={args:{placeholder:"Disabled input",disabled:!0}},t={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",maxWidth:"300px"},children:[e.jsx(s,{placeholder:"Default input"}),e.jsx(s,{placeholder:"Error state",error:!0}),e.jsx(s,{placeholder:"Disabled",disabled:!0})]})};var l,d,n;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
}`,...(n=(d=r.parameters)==null?void 0:d.docs)==null?void 0:n.source}}};var p,c,i;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    placeholder: 'Invalid input',
    error: true
  }
}`,...(i=(c=a.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var u,m,x;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    placeholder: 'Disabled input',
    disabled: true
  }
}`,...(x=(m=o.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var h,g,b;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '300px'
  }}>
      <Input placeholder="Default input" />
      <Input placeholder="Error state" error />
      <Input placeholder="Disabled" disabled />
    </div>
}`,...(b=(g=t.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};const I=["Default","WithError","Disabled","AllStates"];export{t as AllStates,r as Default,o as Disabled,a as WithError,I as __namedExportsOrder,j as default};
