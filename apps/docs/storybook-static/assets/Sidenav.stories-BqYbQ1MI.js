import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r}from"./index-GiUgBvb1.js";import{q as c,K as n}from"./index-BhWK_nAw.js";const C={title:"Components/Sidenav",component:c,tags:["autodocs"],parameters:{layout:"fullscreen"}},l=[{id:"dashboard",label:"Dashboard",icon:e.jsx(n,{name:"grid_on",size:24})},{id:"tracking",label:"Object Tracking",icon:e.jsx(n,{name:"satellite",size:24})},{id:"network",label:"Sensor Network",icon:e.jsx(n,{name:"globe",size:24})},{id:"analytics",label:"Analytics",icon:e.jsx(n,{name:"sort",size:24})},{id:"settings",label:"Settings",icon:e.jsx(n,{name:"settings",size:24})}],i={render:()=>{const[t,s]=r.useState("dashboard");return e.jsx("div",{style:{height:"500px",display:"flex"},children:e.jsx(c,{items:l,activeId:t,onItemClick:a=>s(a.id),collapsed:!1})})}},d={render:()=>{const[t,s]=r.useState("tracking");return e.jsx("div",{style:{height:"500px",display:"flex"},children:e.jsx(c,{items:l,activeId:t,onItemClick:a=>s(a.id),collapsed:!0})})}},o={render:()=>{const[t,s]=r.useState("dashboard"),[a,j]=r.useState(!1);return e.jsxs("div",{style:{height:"500px",display:"flex"},children:[e.jsx(c,{items:l,activeId:t,onItemClick:y=>s(y.id),collapsed:a,onToggle:j}),e.jsxs("div",{style:{flex:1,padding:"24px",color:"var(--color-on-surface-dark)"},children:[e.jsxs("h2",{children:["Active: ",t]}),e.jsx("p",{children:"Click the toggle button to collapse/expand the navigation."})]})]})}};var p,m,v;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => {
    const [activeId, setActiveId] = useState('dashboard');
    return <div style={{
      height: '500px',
      display: 'flex'
    }}>
        <Sidenav items={navItems} activeId={activeId} onItemClick={item => setActiveId(item.id)} collapsed={false} />
      </div>;
  }
}`,...(v=(m=i.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};var x,u,I;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => {
    const [activeId, setActiveId] = useState('tracking');
    return <div style={{
      height: '500px',
      display: 'flex'
    }}>
        <Sidenav items={navItems} activeId={activeId} onItemClick={item => setActiveId(item.id)} collapsed={true} />
      </div>;
  }
}`,...(I=(u=d.parameters)==null?void 0:u.docs)==null?void 0:I.source}}};var g,h,f;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    const [activeId, setActiveId] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(false);
    return <div style={{
      height: '500px',
      display: 'flex'
    }}>
        <Sidenav items={navItems} activeId={activeId} onItemClick={item => setActiveId(item.id)} collapsed={collapsed} onToggle={setCollapsed} />
        <div style={{
        flex: 1,
        padding: '24px',
        color: 'var(--color-on-surface-dark)'
      }}>
          <h2>Active: {activeId}</h2>
          <p>Click the toggle button to collapse/expand the navigation.</p>
        </div>
      </div>;
  }
}`,...(f=(h=o.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};const A=["Expanded","Collapsed","Interactive"];export{d as Collapsed,i as Expanded,o as Interactive,A as __namedExportsOrder,C as default};
