import S from"./BnEcFXNa.js";import{_ as C}from"./BkUS6Uw_.js";import{d as T,a as N,j as E,o as I,c,e as d,f as n,s as b,F as _,r as D,B as m,t as l,C as j}from"./CIZNoyvQ.js";import"./C4e7VoVa.js";const A={class:"page-essay"},B={class:"talk-container"},M={id:"talk",class:"talks-list"},z={class:"talk-meta"},H=["src"],L={class:"info"},O={class:"talk-nick"},F={viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg",class:"is-badge icon",style:{width:"15px","padding-top":"3px"}},U={class:"talk-date"},Y={class:"talk-content"},J={class:"zone_imgbox"},P={class:"image img-item"},V={class:"talk-bottom"},q={class:"talk-tags"},K={class:"tag"},R={class:"location"},G=["onClick"],v="talksCache",h="talksCacheTime",Q=1800*1e3,W=T({__name:"essays",setup(X){N().setAside(["blog-stats","connectivity","blog-log"]);const f=E([]),k=s=>{const e=new Date(s),r=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0"),i=String(e.getHours()).padStart(2,"0"),t=String(e.getMinutes()).padStart(2,"0");return`${r}-${o}-${a} ${i}:${t}`},y=(s,e)=>{const r=k(s.createdAt);let o=s.content;const a=s.imgs?s.imgs.split(","):[];if(o=o.replace(/- $$ $$/g,"⚪").replace(/- $$x$$/g,"⚫").replace(/\n/g,"<br>"),a.length>0){const t=document.createElement("div");t.className="zone_imgbox",a.forEach(w=>{const p=document.createElement("figure");p.className="img-item";const g=document.createElement("figure");g.className="image talk-img";const u=document.createElement("img");u.className="image",u.src=w,g.appendChild(u),p.appendChild(g),t.appendChild(p)}),o+=t.outerHTML}s.externalUrl&&(o+=`
      <div class="shuoshuo-external-link">
        <a class="external-link" href="${s.externalUrl}" target="_blank" rel="external nofollow noopener noreferrer">
          <div class="external-link-left" style="background-image: url(${s.externalFavicon})"></div>
          <div class="external-link-right">
            <div class="external-link-title">${s.externalTitle}</div>
            <div>点击跳转<i class="fa-solid fa-angle-right"></i></div>
          </div>
        </a>
      </div>
    `);const i=JSON.parse(s.ext||"{}");if(i.music?.id){const t=i.music;o+=`
      <meting-js 
        server="${t.server}" 
        type="${t.type}" 
        id="${t.id}" 
        api="${t.api}"
      ></meting-js>
    `}if(i.doubanMovie?.id){const t=i.doubanMovie;o+=`
      <a class="douban-card" href="${t.url}" target="_blank">
        <div class="douban-card-bgimg" style="background-image: url('${t.image}')"></div>
        <div class="douban-card-left">
          <div class="douban-card-img" style="background-image: url('${t.image}')"></div>
        </div>
        <div class="douban-card-right">
          <div class="douban-card-item"><span>电影名: </span><strong>${t.title}</strong></div>
          <div class="douban-card-item"><span>导演: </span><span>${t.director||"未知导演"}</span></div>
          <div class="douban-card-item"><span>评分: </span><span>${t.rating||"暂无评分"}</span></div>
          <div class="douban-card-item"><span>时长: </span><span>${t.runtime||"未知时长"}</span></div>
        </div>
      </a>
    `}if(i.doubanBook?.id){const t=i.doubanBook;o+=`
      <a class="douban-card" href="${t.url}" target="_blank">
        <div class="douban-card-bgimg" style="background-image: url('${t.image}')"></div>
        <div class="douban-card-left">
          <div class="douban-card-img" style="background-image: url('${t.image}')"></div>
        </div>
        <div class="douban-card-right">
          <div class="douban-card-item"><span>书名: </span><strong>${t.title}</strong></div>
          <div class="douban-card-item"><span>作者: </span><span>${t.author}</span></div>
          <div class="douban-card-item"><span>出版年份: </span><span>${t.pubDate}</span></div>
          <div class="douban-card-item"><span>评分: </span><span>${t.rating}</span></div>
        </div>
      </a>
    `}if(i.video?.type){const t=i.video;t.type==="bilibili"?o+=`
        <div style="position: relative; padding: 30% 45%; margin-top: 10px;">
          <iframe 
            style="position: absolute; width: 100%; height: 100%; left: 0; top: 0; border-radius: 12px;" 
            src="${t.value}&autoplay=0"
            scrolling="no" 
            frameborder="no" 
            allowfullscreen
          ></iframe>
        </div>
      `:t.type==="youtube"&&(o+=`
        <div style="position: relative; padding: 30% 45%; margin-top: 10px;">
          <iframe 
            width="100%"
            style="position: absolute; width: 100%; height: 100%; left: 0; top: 0; border-radius: 12px;"
            src="${t.value}"
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen
          ></iframe>
        </div>
      `)}return{user:s.user.nickname||"匿名",avatar:s.user.avatarUrl||"https://p.liiiu.cn/i/2024/03/29/66061417537af.png",date:r,content:o,location:s.location||"陕西西安",tags:s.tags?s.tags.split(",").filter(t=>t.trim()):["无标签"],text:o.replace("[链接]")||""}},$=async()=>{const s="https://avvlqyndvewl.ap-northeast-1.clawcloudrun.com/api/memo/list",e=localStorage.getItem(v),r=localStorage.getItem(h),o=Date.now();if(e&&r){const a=Number(r);!isNaN(a)&&o-a<Q||(localStorage.removeItem(v),localStorage.removeItem(h))}try{const a=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({size:30})});if(!a.ok)throw new Error(`HTTP错误: ${a.status}`);const i=await a.json();i.code===0&&i.data?.list?(localStorage.setItem(v,JSON.stringify(i.data.list)),localStorage.setItem(h,o.toString()),f.value=i.data.list.map(t=>y(t,s))):console.error("接口返回数据格式错误:",i)}catch(a){console.error("获取数据失败:",a)}},x=s=>{const e=document.querySelector(".atk-textarea");if(e){const r=s.match(/<div class="talk_content_text">([\s\S]*?)<\/div>/),o=r?r[1]:"";e.value=`> ${o}

`,e.focus(),window.btf?.snackbarShow&&window.btf.snackbarShow("已为您引用该说说，不删除空格效果更佳")}};return I(()=>{$()}),(s,e)=>{const r=S,o=C;return d(),c(_,null,[n("div",A,[e[3]||(e[3]=n("link",{rel:"stylesheet",href:"/assets/css/essays.css"},null,-1)),n("div",B,[n("div",M,[(d(!0),c(_,null,D(f.value,(a,i)=>(d(),c("div",{key:i,class:"talk-item"},[n("div",z,[n("img",{src:a.avatar,class:"no-lightbox avatar",alt:"用户头像"},null,8,H),n("div",L,[n("span",O,[m(l(a.user)+" ",1),(d(),c("svg",F,e[0]||(e[0]=[n("path",{d:"m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z",fill:"#1da1f2"},null,-1)])))]),n("span",U,l(a.date),1)])]),n("div",Y,[m(l(a.content)+" ",1),n("div",J,[n("figure",P,[b(r,{class:"talk-img",src:s.imgs.length,caption:a.caption||"",width:a.width||"100%",height:a.height||"auto",zoom:!0},null,8,["src","caption","width","height"])])])]),n("div",V,[n("div",q,[n("span",K,"🏷️"+l(a.tags.join(" ")),1),n("span",R,[e[1]||(e[1]=n("span",{"data-v-1f067c47":"",class:"iconify i-ph:map-pin-bold location-icon","aria-hidden":"true"},null,-1)),m(" "+l(a.location),1)])]),n("a",{href:"javascript:;",class:"comment-link",onClick:t=>x(a.text)},e[2]||(e[2]=[n("span",{class:"iconify i-ph:chats-bold icon"},null,-1)]),8,G)])]))),128))])])]),b(o,{key:"/essays"})],64)}}}),ot=j(W,[["__scopeId","data-v-dd006e7c"]]);export{ot as default};
