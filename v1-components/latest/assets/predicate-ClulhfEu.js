const a=(t,e=!0)=>{try{const s=new URL(t);return/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\S*)$/.test(s.href)}catch{return e&&t.startsWith("/")?[t.includes("://")?t:`https://${t}`,`https://example.com${t}`].some(s=>a(s,!1)):!1}};export{a as i};
