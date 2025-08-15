import{_ as w}from"./CyWxF0Iv.js";import{d as S,a as T,j as C,o as E,c,e as l,f as i,s as N,F as v,r as M,B as f,t as d,C as D}from"./-igm01cG.js";const H={class:"page-essay"},j={class:"talk-container"},A={id:"talk",class:"talks-list"},B={class:"talk-meta"},I=["src"],L={class:"info"},O={class:"talk-nick"},U={viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg",class:"is-badge icon",style:{width:"15px","padding-top":"3px"}},z={class:"talk-date"},F=["innerHTML"],J={class:"talk-bottom"},Y={class:"talk-tags"},P={class:"tag"},V={class:"location"},q=["onClick"],h="talksCache",b="talksCacheTime",K=1800*1e3,R=S({__name:"essays",setup(G){T().setAside(["blog-stats","connectivity","blog-log"]);const p=C([]),_=s=>{const e=new Date(s),r=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0"),n=String(e.getHours()).padStart(2,"0"),a=String(e.getMinutes()).padStart(2,"0");return`${r}-${t}-${o} ${n}:${a}`},m=(s,e)=>{const r=_(s.createdAt);let t=s.content;const o=s.imgs?s.imgs.split(","):[];if(t=t.replace(/$$(.*?)$$$(.*?)$/g).replace(/- $$ $$/g,"⚪").replace(/- $$x$$/g,"⚫").replace(/\n/g,"<br>"),o.length>0){const a=document.createElement("div");a.className="zone_imgbox",o.forEach(y=>{const x=document.createElement("figure");x.className="img-item";const u=document.createElement("figure");u.className="image talk-img";const g=document.createElement("img");g.className="image",g.src=y,u.appendChild(g),a.appendChild(u)}),t+=a.outerHTML}s.externalUrl&&(t+=`
      <div class="shuoshuo-external-link">
        <a class="external-link" href="${s.externalUrl}" target="_blank" rel="external nofollow noopener noreferrer">
          <div class="external-link-left" style="background-image: url(${s.externalFavicon})"></div>
          <div class="external-link-right">
            <div class="external-link-title">${s.externalTitle}</div>
            <div>点击跳转<i class="fa-solid fa-angle-right"></i></div>
          </div>
        </a>
      </div>
    `);const n=JSON.parse(s.ext||"{}");if(n.music?.id){const a=n.music;t+=`
      <meting-js 
        server="${a.server}" 
        type="${a.type}" 
        id="${a.id}" 
        api="${a.api}"
      ></meting-js>
    `}if(n.doubanMovie?.id){const a=n.doubanMovie;t+=`
      <a class="douban-card" href="${a.url}" target="_blank">
        <div class="douban-card-bgimg" style="background-image: url('${a.image}')"></div>
        <div class="douban-card-left">
          <div class="douban-card-img" style="background-image: url('${a.image}')"></div>
        </div>
        <div class="douban-card-right">
          <div class="douban-card-item"><span>电影名: </span><strong>${a.title}</strong></div>
          <div class="douban-card-item"><span>导演: </span><span>${a.director||"未知导演"}</span></div>
          <div class="douban-card-item"><span>评分: </span><span>${a.rating||"暂无评分"}</span></div>
          <div class="douban-card-item"><span>时长: </span><span>${a.runtime||"未知时长"}</span></div>
        </div>
      </a>
    `}if(n.doubanBook?.id){const a=n.doubanBook;t+=`
      <a class="douban-card" href="${a.url}" target="_blank">
        <div class="douban-card-bgimg" style="background-image: url('${a.image}')"></div>
        <div class="douban-card-left">
          <div class="douban-card-img" style="background-image: url('${a.image}')"></div>
        </div>
        <div class="douban-card-right">
          <div class="douban-card-item"><span>书名: </span><strong>${a.title}</strong></div>
          <div class="douban-card-item"><span>作者: </span><span>${a.author}</span></div>
          <div class="douban-card-item"><span>出版年份: </span><span>${a.pubDate}</span></div>
          <div class="douban-card-item"><span>评分: </span><span>${a.rating}</span></div>
        </div>
      </a>
    `}if(n.video?.type){const a=n.video;a.type==="bilibili"?t+=`
        <div style="position: relative; padding: 30% 45%; margin-top: 10px;">
          <iframe 
            style="position: absolute; width: 100%; height: 100%; left: 0; top: 0; border-radius: 12px;" 
            src="${a.value}&autoplay=0"
            scrolling="no" 
            frameborder="no" 
            allowfullscreen
          ></iframe>
        </div>
      `:a.type==="youtube"&&(t+=`
        <div style="position: relative; padding: 30% 45%; margin-top: 10px;">
          <iframe 
            width="100%"
            style="position: absolute; width: 100%; height: 100%; left: 0; top: 0; border-radius: 12px;"
            src="${a.value}"
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen
          ></iframe>
        </div>
      `)}return{user:s.user.nickname||"匿名",avatar:s.avatarUrl||"https://p.liiiu.cn/i/2024/03/29/66061417537af.png",date:r,content:t,tags:s.tags?s.tags.split(",").filter(a=>a.trim()):["无标签"],text:t.replace(/$$(.*?)$$$(.*?)$/g,`[链接]${o.length?"[图片]":""}`)}},$=async()=>{const s="https://avvlqyndvewl.ap-northeast-1.clawcloudrun.com/api/memo/list",e=localStorage.getItem(h),r=localStorage.getItem(b),t=Date.now();if(e&&r&&t-Number(r)<K)try{const o=JSON.parse(e);p.value=o.map(n=>m(n,s));return}catch(o){console.error("缓存数据解析失败:",o)}try{const o=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({size:30})});if(!o.ok)throw new Error(`HTTP错误: ${o.status}`);const n=await o.json();n.code===0&&n.data?.list?(localStorage.setItem(h,JSON.stringify(n.data.list)),localStorage.setItem(b,t.toString()),p.value=n.data.list.map(a=>m(a,s))):console.error("接口返回数据格式错误:",n)}catch(o){console.error("获取数据失败:",o)}},k=s=>{const e=document.querySelector(".atk-textarea");if(e){const r=s.match(/<div class="talk_content_text">([\s\S]*?)<\/div>/),t=r?r[1]:"";e.value=`> ${t}

`,e.focus(),window.btf?.snackbarShow&&window.btf.snackbarShow("已为您引用该说说，不删除空格效果更佳")}};return E(()=>{$()}),(s,e)=>{const r=w;return l(),c(v,null,[i("div",H,[i("div",j,[i("div",A,[(l(!0),c(v,null,M(p.value,(t,o)=>(l(),c("div",{key:o,class:"talk-item"},[i("div",B,[i("img",{src:t.avatar,class:"no-lightbox avatar",alt:"用户头像"},null,8,I),i("div",L,[i("span",O,[f(d(t.user)+" ",1),(l(),c("svg",U,e[0]||(e[0]=[i("path",{d:"m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z",fill:"#1da1f2"},null,-1)])))]),i("span",z,d(t.date),1)])]),i("div",{class:"talk-content",innerHTML:t.content},null,8,F),i("div",J,[i("div",Y,[i("span",P,"🏷️"+d(t.tags.join(" ")),1),i("span",V,[e[1]||(e[1]=i("span",{"data-v-1f067c47":"",class:"iconify i-ph:map-pin-bold location-icon","aria-hidden":"true"},null,-1)),f(" "+d(t.location),1)])]),i("a",{href:"javascript:;",class:"comment-link",onClick:n=>k(t.text)},e[2]||(e[2]=[i("span",{class:"iconify i-ph:chats-bold icon"},null,-1)]),8,q)])]))),128))])])]),N(r,{key:"/essays"})],64)}}}),Z=D(R,[["__scopeId","data-v-d6e336c6"]]);export{Z as default};
