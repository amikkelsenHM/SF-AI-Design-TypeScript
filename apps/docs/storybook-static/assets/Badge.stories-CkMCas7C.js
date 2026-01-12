import{j as r}from"./jsx-runtime-CDt2p4po.js";import{P as e}from"./index-BhWK_nAw.js";import"./index-GiUgBvb1.js";const F={title:"Components/Badge",component:e,tags:["autodocs"],argTypes:{variant:{control:"select",options:["success","warning","error","processing"]},showDot:{control:"boolean"}}},s={args:{variant:"success",children:"Active"}},a={args:{variant:"warning",children:"Pending"}},n={args:{variant:"error",children:"Failed"}},o={args:{variant:"processing",children:"Processing"}},c={args:{variant:"success",children:"No Dot",showDot:!1}},i={render:()=>r.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[r.jsx(e,{variant:"success",children:"Active"}),r.jsx(e,{variant:"warning",children:"Pending"}),r.jsx(e,{variant:"error",children:"Failed"}),r.jsx(e,{variant:"processing",children:"Processing"})]})};var t,d,g;s.parameters={...s.parameters,docs:{...(t=s.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    children: 'Active'
  }
}`,...(g=(d=s.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var p,l,m;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    children: 'Pending'
  }
}`,...(m=(l=a.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var u,v,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    children: 'Failed'
  }
}`,...(h=(v=n.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var x,P,w;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: 'processing',
    children: 'Processing'
  }
}`,...(w=(P=o.parameters)==null?void 0:P.docs)==null?void 0:w.source}}};var f,B,S;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    children: 'No Dot',
    showDot: false
  }
}`,...(S=(B=c.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};var j,D,A;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  }}>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="error">Failed</Badge>
      <Badge variant="processing">Processing</Badge>
    </div>
}`,...(A=(D=i.parameters)==null?void 0:D.docs)==null?void 0:A.source}}};const N=["Success","Warning","Error","Processing","WithoutDot","AllVariants"];export{i as AllVariants,n as Error,o as Processing,s as Success,a as Warning,c as WithoutDot,N as __namedExportsOrder,F as default};
