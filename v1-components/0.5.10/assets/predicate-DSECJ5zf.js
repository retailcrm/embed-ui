const s=t=>{try{const r=t.includes("://")?t:`http://${t}`,n=new URL(r);return/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\S*)$/.test(n.href)}catch{return!1}};export{s as i};
