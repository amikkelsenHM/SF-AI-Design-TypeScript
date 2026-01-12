import{j as e}from"./jsx-runtime-CDt2p4po.js";import{A as a}from"./index-BhWK_nAw.js";import"./index-GiUgBvb1.js";const U={title:"Components/Checkbox",component:a,tags:["autodocs"],argTypes:{label:{control:"text"},disabled:{control:"boolean"},checked:{control:"boolean"}}},s={args:{label:"Accept terms and conditions"}},r={args:{label:"Selected option",defaultChecked:!0}},c={args:{label:"Disabled checkbox",disabled:!0}},d={args:{label:"Disabled and checked",disabled:!0,defaultChecked:!0}},l={args:{}},t={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(a,{label:"Unchecked"}),e.jsx(a,{label:"Checked",defaultChecked:!0}),e.jsx(a,{label:"Disabled",disabled:!0}),e.jsx(a,{label:"Disabled Checked",disabled:!0,defaultChecked:!0})]})};var o,n,i;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    label: 'Accept terms and conditions'
  }
}`,...(i=(n=s.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};var b,u,p;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: 'Selected option',
    defaultChecked: true
  }
}`,...(p=(u=r.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var m,h,k;c.parameters={...c.parameters,docs:{...(m=c.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    label: 'Disabled checkbox',
    disabled: true
  }
}`,...(k=(h=c.parameters)==null?void 0:h.docs)==null?void 0:k.source}}};var x,C,g;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: 'Disabled and checked',
    disabled: true,
    defaultChecked: true
  }
}`,...(g=(C=d.parameters)==null?void 0:C.docs)==null?void 0:g.source}}};var f,D,S;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {}
}`,...(S=(D=l.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var j,y,A;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled Checked" disabled defaultChecked />
    </div>
}`,...(A=(y=t.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};const W=["Default","Checked","Disabled","DisabledChecked","WithoutLabel","AllStates"];export{t as AllStates,r as Checked,s as Default,c as Disabled,d as DisabledChecked,l as WithoutLabel,W as __namedExportsOrder,U as default};
