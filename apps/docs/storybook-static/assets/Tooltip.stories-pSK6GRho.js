import{j as e}from"./jsx-runtime-CDt2p4po.js";import{Y as n,S as h}from"./index-BhWK_nAw.js";import"./index-GiUgBvb1.js";const f={title:"Components/Tooltip",component:n,tags:["autodocs"]},o={render:()=>e.jsx("div",{style:{padding:"60px"},children:e.jsx(n,{content:"This is a helpful tooltip message",children:e.jsx(h,{variant:"primary",children:"Hover me"})})})},t={render:()=>e.jsx("div",{style:{padding:"80px"},children:e.jsx(n,{content:"This is a longer tooltip message that provides more detailed information about the element you're hovering over.",children:e.jsx(h,{variant:"secondary",children:"Info"})})})},r={render:()=>e.jsx("div",{style:{padding:"60px"},children:e.jsx(n,{content:"Additional context for this term",children:e.jsx("span",{style:{textDecoration:"underline dotted",cursor:"help",color:"var(--color-on-surface-dark)"},children:"Technical term"})})})};var s,a,i;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '60px'
  }}>
      <Tooltip content="This is a helpful tooltip message">
        <Button variant="primary">Hover me</Button>
      </Tooltip>
    </div>
}`,...(i=(a=o.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var d,c,l;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '80px'
  }}>
      <Tooltip content="This is a longer tooltip message that provides more detailed information about the element you're hovering over.">
        <Button variant="secondary">Info</Button>
      </Tooltip>
    </div>
}`,...(l=(c=t.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var p,m,u;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '60px'
  }}>
      <Tooltip content="Additional context for this term">
        <span style={{
        textDecoration: 'underline dotted',
        cursor: 'help',
        color: 'var(--color-on-surface-dark)'
      }}>
          Technical term
        </span>
      </Tooltip>
    </div>
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const T=["Default","LongContent","OnText"];export{o as Default,t as LongContent,r as OnText,T as __namedExportsOrder,f as default};
