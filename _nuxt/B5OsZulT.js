import{d as k,a as x,j as w,o as S,c,e as d,f as r,F as T,r as C,B as b,t as p,C as E}from"./DKejVKYj.js";const N={class:"page-essay"},A={class:"talk-container"},M={id:"talk",class:"talks-list"},D={class:"talk-meta"},H=["src"],j={class:"info"},B={class:"talk-nick"},I={viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg",class:"is-badge icon",style:{width:"15px","padding-top":"3px"}},L={class:"talk-date"},O=["innerHTML"],U={class:"talk-bottom"},z={class:"talk-tags"},F={class:"tag"},J={class:"location"},Y=["onClick"],f="talksCache",h="talksCacheTime",q=1800*1e3,K=k({__name:"essays",setup(P){x().setAside(["blog-stats","connectivity","blog-log"]);const u=w([]),$=t=>{const s=new Date(t),o=s.getFullYear(),e=String(s.getMonth()+1).padStart(2,"0"),i=String(s.getDate()).padStart(2,"0"),n=String(s.getHours()).padStart(2,"0"),a=String(s.getMinutes()).padStart(2,"0");return`${o}-${e}-${i} ${n}:${a}`},v=(t,s)=>{const o=$(t.createdAt);let e=t.content;const i=t.imgs?t.imgs.split(","):[];if(e=e.replace(/$$(.*?)$$$(.*?)$/g,'<a href="$2">@$1</a>').replace(/- $$ $$/g,"⚪").replace(/- $$x$$/g,"⚫").replace(/\n/g,"<br>"),i.length>0){const a=document.createElement("div");a.className="zone_imgbox",i.forEach(g=>{const l=document.createElement("a");l.href=g,l.setAttribute("data-fancybox","gallery"),l.className="fancybox",l.setAttribute("data-thumb",g);const m=document.createElement("img");m.src=g,l.appendChild(m),a.appendChild(l)}),e+=a.outerHTML}t.externalUrl&&(e+=`
      <div class="shuoshuo-external-link">
        <a class="external-link" href="${t.externalUrl}" target="_blank" rel="external nofollow noopener noreferrer">
          <div class="external-link-left" style="background-image: url(${t.externalFavicon})"></div>
          <div class="external-link-right">
            <div class="external-link-title">${t.externalTitle}</div>
            <div>点击跳转<i class="fa-solid fa-angle-right"></i></div>
          </div>
        </a>
      </div>
    `);const n=JSON.parse(t.ext||"{}");if(n.music?.id){const a=n.music;e+=`
      <meting-js 
        server="${a.server}" 
        type="${a.type}" 
        id="${a.id}" 
        api="${a.api}"
      ></meting-js>
    `}if(n.doubanMovie?.id){const a=n.doubanMovie;e+=`
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
    `}if(n.doubanBook?.id){const a=n.doubanBook;e+=`
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
    `}if(n.video?.type){const a=n.video;a.type==="bilibili"?e+=`
        <div style="position: relative; padding: 30% 45%; margin-top: 10px;">
          <iframe 
            style="position: absolute; width: 100%; height: 100%; left: 0; top: 0; border-radius: 12px;" 
            src="${a.value}&autoplay=0"
            scrolling="no" 
            frameborder="no" 
            allowfullscreen
          ></iframe>
        </div>
      `:a.type==="youtube"&&(e+=`
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
      `)}return{user:t.user.nickname||"匿名",avatar:t.user.avatarUrl||"https://p.liiiu.cn/i/2024/03/29/66061417537af.png",date:o,content:e,tags:t.tags?t.tags.split(",").filter(a=>a.trim()):["无标签"],text:e.replace(/$$(.*?)$$$(.*?)$/g,`[链接]${i.length?"[图片]":""}`)}},y=async()=>{const t="https://avvlqyndvewl.ap-northeast-1.clawcloudrun.com/api/memo/list",s=localStorage.getItem(f),o=localStorage.getItem(h),e=Date.now();if(s&&o&&e-Number(o)<q)try{const i=JSON.parse(s);u.value=i.map(n=>v(n,t));return}catch(i){console.error("缓存数据解析失败:",i)}try{const i=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({size:30})});if(!i.ok)throw new Error(`HTTP错误: ${i.status}`);const n=await i.json();n.code===0&&n.data?.list?(localStorage.setItem(f,JSON.stringify(n.data.list)),localStorage.setItem(h,e.toString()),u.value=n.data.list.map(a=>v(a,t))):console.error("接口返回数据格式错误:",n)}catch(i){console.error("获取数据失败:",i)}},_=t=>{const s=document.querySelector(".atk-textarea");if(s){const o=t.match(/<div class="talk_content_text">([\s\S]*?)<\/div>/),e=o?o[1]:"";s.value=`> ${e}

`,s.focus(),window.btf?.snackbarShow&&window.btf.snackbarShow("已为您引用该说说，不删除空格效果更佳")}};return S(()=>{y()}),(t,s)=>(d(),c("div",N,[r("div",A,[r("div",M,[(d(!0),c(T,null,C(u.value,(o,e)=>(d(),c("div",{key:e,class:"talk-item"},[r("div",D,[r("img",{src:o.avatar,class:"no-lightbox avatar",alt:"用户头像"},null,8,H),r("div",j,[r("span",B,[b(p(o.user)+" ",1),(d(),c("svg",I,s[0]||(s[0]=[r("path",{d:"m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z",fill:"#1da1f2"},null,-1)])))]),r("span",L,p(o.date),1)])]),r("div",{class:"talk-content",innerHTML:o.content},null,8,O),r("div",U,[r("div",z,[r("span",F,"🏷️"+p(o.tags.join(" ")),1),r("span",J,[s[1]||(s[1]=r("span",{"data-v-1f067c47":"",class:"iconify i-ph:map-pin-bold location-icon","aria-hidden":"true"},null,-1)),b(" "+p(o.location),1)])]),r("a",{href:"javascript:;",class:"comment-link",onClick:i=>_(o.text)},s[2]||(s[2]=[r("span",{class:"iconify i-ph:chats-bold icon"},null,-1)]),8,Y)])]))),128))])])]))}}),G=E(K,[["__scopeId","data-v-79fdff55"]]);export{G as default};
