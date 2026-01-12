import{j as e}from"./jsx-runtime-CDt2p4po.js";import{K as g}from"./index-BhWK_nAw.js";import"./index-GiUgBvb1.js";const v={title:"Components/Icon",component:g,tags:["autodocs"],argTypes:{name:{control:"select",options:["add","add_circle","arrow_back","arrow_forward","calendar_month","check","check_circle","chevron_down","chevron_up","close","copy","delete","download","edit","filter_list","globe","help","info","menu","more_vert","refresh","search","settings","star","star_filled","warning_circle"]},size:{control:"number"},color:{control:"color"}}},r={args:{name:"settings",size:24}},o={args:{name:"globe",size:48,color:"var(--color-brand-medium-orchid)"}},a={render:()=>{const u=["add","add_circle","arrow_back","arrow_down","arrow_forward","arrow_up","calendar_month","cancel","check","check_circle","chevron_down","chevron_left","chevron_right","chevron_up","close","copy","delete","download","edit","filter_list","globe","grid_off","grid_on","help","info","logout","map","menu","more_vert","open_in_full","open_in_new","pause","play_arrow","print","refresh","remove","satellite","search","settings","sort","star","star_filled","swap_horiz","sync","warning_circle","warning_tri","freeview"];return e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(100px, 1fr))",gap:"16px"},children:u.map(n=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",padding:"16px",background:"rgba(255,255,255,0.02)",borderRadius:"8px",gap:"8px"},children:[e.jsx(g,{name:n,size:24,color:"var(--color-on-surface-dark)"}),e.jsx("span",{style:{fontSize:"10px",color:"var(--color-grey-400)",textAlign:"center"},children:n})]},n))})}};var c,s,t;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    name: 'settings',
    size: 24
  }
}`,...(t=(s=r.parameters)==null?void 0:s.docs)==null?void 0:t.source}}};var l,i,d;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    name: 'globe',
    size: 48,
    color: 'var(--color-brand-medium-orchid)'
  }
}`,...(d=(i=o.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var p,m,_;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => {
    const icons: IconName[] = ['add', 'add_circle', 'arrow_back', 'arrow_down', 'arrow_forward', 'arrow_up', 'calendar_month', 'cancel', 'check', 'check_circle', 'chevron_down', 'chevron_left', 'chevron_right', 'chevron_up', 'close', 'copy', 'delete', 'download', 'edit', 'filter_list', 'globe', 'grid_off', 'grid_on', 'help', 'info', 'logout', 'map', 'menu', 'more_vert', 'open_in_full', 'open_in_new', 'pause', 'play_arrow', 'print', 'refresh', 'remove', 'satellite', 'search', 'settings', 'sort', 'star', 'star_filled', 'swap_horiz', 'sync', 'warning_circle', 'warning_tri', 'freeview'];
    return <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: '16px'
    }}>
        {icons.map(name => <div key={name} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '8px',
        gap: '8px'
      }}>
            <Icon name={name} size={24} color="var(--color-on-surface-dark)" />
            <span style={{
          fontSize: '10px',
          color: 'var(--color-grey-400)',
          textAlign: 'center'
        }}>
              {name}
            </span>
          </div>)}
      </div>;
  }
}`,...(_=(m=a.parameters)==null?void 0:m.docs)==null?void 0:_.source}}};const x=["Default","LargeIcon","AllIcons"];export{a as AllIcons,r as Default,o as LargeIcon,x as __namedExportsOrder,v as default};
