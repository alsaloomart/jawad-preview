'use strict';
(async()=>{
 const config=await fetch('assets/manifest.json').then(r=>{if(!r.ok)throw Error('manifest');return r.json()});
 const slides=[];let current=0;
 const select=i=>{current=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.hidden=n!==current);document.querySelectorAll('#dots button').forEach((b,n)=>b.setAttribute('aria-pressed',String(n===current)));document.querySelector('#counter').textContent=`${current+1} / ${slides.length}`;};
 if(config.logo){const image=new Image();image.alt='شعار جواد';image.onload=()=>document.querySelector('#logo').replaceChildren(image);image.src=`assets/${config.logo}`;}
 for(const item of config.slots){
 const slot=document.createElement('div');slot.className='slot'+(item.target==='slider'?' dark slide':'');slot.style.setProperty('--ratio',`${item.width} / ${item.height}`);
 const placeholder=document.createElement('div');placeholder.className='placeholder';
 const title=document.createElement('strong');title.textContent=item.label;
 const size=document.createElement('span');size.className='dimensions';size.textContent=`${item.width}×${item.height}`;
 const status=document.createElement('small');status.textContent='بانتظار التصميم';placeholder.append(title,size,status);slot.append(placeholder);
 const image=new Image();image.alt=`${item.label} — مؤقت وبانتظار التأكيد — ${item.width}×${item.height}`;image.onload=()=>slot.replaceChildren(image);image.src=`assets/${item.file}`;
 const frame=document.createElement('figure');frame.className='asset-frame'+(item.target==='slider'?' slide':'');frame.append(slot);const caption=document.createElement('figcaption');caption.textContent=`${item.label} — مؤقت / بانتظار التأكيد`;frame.append(caption);document.getElementById(item.target).append(frame);
 const entry=document.createElement('li');entry.textContent=`${item.file} — ${item.width}×${item.height}`;document.querySelector('#asset-list').append(entry);
 if(item.target==='slider'){slides.push(frame);const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`عرض البنر ${slides.length}`);const index=slides.length-1;b.onclick=()=>select(index);document.querySelector('#dots').append(b);}
 }
 if(slides.length){select(0);document.querySelector('#previous').onclick=()=>select(current-1);document.querySelector('#next').onclick=()=>select(current+1);document.querySelector('#slider').tabIndex=0;document.querySelector('#slider').onkeydown=e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();select(current+(e.key==='ArrowLeft'?1:-1));}};}
})().catch(()=>{document.querySelector('#slider').textContent='تعذر تحميل ملف التصاميم. افتح المعاينة من الخادم المحلي.';});
document.querySelector('#demo').onclick=()=>{const t=document.querySelector('#toast');t.hidden=false;clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.hidden=true,4000);};
