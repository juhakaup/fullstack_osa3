(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var c=n(2),r=n(14),o=n.n(r),i=n(3),u=n(15),a=n(4),s=n.n(a),l="/api/persons",d=function(){return s.a.get(l).then((function(e){return e.data}))},j=function(e){return s.a.post(l,e).then((function(e){return e.data}))},f=function(e){s.a.delete("".concat(l,"/").concat(e))},b=function(e){return s.a.put("".concat(l,"/").concat(e.id),e).then((function(e){return e.data}))},h=n(0),m=function(e){var t=e.persons,n=e.setPersons,r=e.setNotification,o=e.setNotificationStyle,a=Object(c.useState)(""),s=Object(i.a)(a,2),l=s[0],d=s[1],f=Object(c.useState)(""),m=Object(i.a)(f,2),O=m[0],p=m[1],v=function(e){e.preventDefault();var c={name:l,number:O};if(t.map((function(e){return e.name})).includes(l)){if(window.confirm("".concat(c.name," is already added to phonebook,  replace old number with a new one?"))){var i=t.filter((function(e){return e.name===c.name}))[0].id;b(Object(u.a)({id:i},c)).then((function(e){n(t.map((function(t){return t.id!==i?t:e}))),o("success"),r("Updated ".concat(l))})).catch((function(e){o("error"),r("Information of ".concat(l," has already been removed from the server"))})),d(""),p("")}}else j(c).then((function(e){n(t.concat(e)),o("success"),r("Added ".concat(l))})).catch((function(e){console.log(e.response.data),o("error"),r(e.response.data.error)})),d(""),p("");setTimeout((function(){r(null)}),5e3)};return Object(h.jsxs)("form",{onSubmit:v,children:[Object(h.jsxs)("div",{children:["name: ",Object(h.jsx)("input",{value:l,onChange:function(e){return d(e.target.value)}})]}),Object(h.jsxs)("div",{children:["number: ",Object(h.jsx)("input",{value:O,onChange:function(e){return p(e.target.value)}})]}),Object(h.jsx)("div",{children:Object(h.jsx)("button",{type:"submit",onSubmit:v,children:"add"})})]})},O=function(e){var t=e.newFilter,n=e.handleFilterChange;return Object(h.jsxs)("div",{children:["filter shown with: ",Object(h.jsx)("input",{value:t,onChange:n})]})},p=function(e){var t=e.removePerson,n=e.filteredPersons;return Object(h.jsx)("ul",{children:n.map((function(e){return Object(h.jsxs)("li",{children:[e.name," ",e.number," ",Object(h.jsx)("button",{onClick:function(){return t(e)},children:"delete"})]},e.name)}))})},v=function(e){var t=e.message,n=e.style;return null===t?null:Object(h.jsx)("div",{className:n,children:t})},x=function(){var e=Object(c.useState)(null),t=Object(i.a)(e,2),n=t[0],r=t[1],o=Object(c.useState)("success"),u=Object(i.a)(o,2),a=u[0],s=u[1],l=Object(c.useState)([]),j=Object(i.a)(l,2),b=j[0],x=j[1],w=Object(c.useState)(""),g=Object(i.a)(w,2),S=g[0],y=g[1],C=b.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())||e.number.includes(S)}));return Object(c.useEffect)((function(){d().then((function(e){x(e)}))}),[]),Object(h.jsxs)("div",{children:[Object(h.jsx)("h2",{children:"Phonebook"}),Object(h.jsx)(v,{message:n,style:a}),Object(h.jsx)(O,{newFilter:S,handleFilterChange:function(e){return y(e.target.value)}}),Object(h.jsx)("h2",{children:"add new"}),Object(h.jsx)(m,{persons:b,setPersons:x,setNotification:r,setNotificationStyle:s}),Object(h.jsx)("h2",{children:"Numbers"}),Object(h.jsx)(p,{filteredPersons:C,removePerson:function(e){window.confirm("Delete ".concat(e.name,"?"))&&(f(e.id),x(b.filter((function(t){return t.id!==e.id}))),s("success"),r("".concat(e.name," removed")),setTimeout((function(){r(null)}),5e3))}})]})};n(39);o.a.render(Object(h.jsx)(x,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.26f1cc8b.chunk.js.map