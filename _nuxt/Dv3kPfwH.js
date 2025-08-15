import{_ as x,q as v,x as n,F as w,y as S,r as T,z as C,o as m,A as N,B as f}from"./2hZIork9.js";const L={name:"TalkList",setup(){const p=T([]),l=t=>{const s=new Date(t),i=[s.getFullYear(),String(s.getMonth()+1).padStart(2,"0"),String(s.getDate()).padStart(2,"0"),String(s.getHours()).padStart(2,"0"),String(s.getMinutes()).padStart(2,"0")];return`${i[0]}-${i[1]}-${i[2]} ${i[3]}:${i[4]}`},b=(t,s)=>{var r,u,k,_;const i=l(t.createdAt);let e=t.content;const d=t.imgs?t.imgs.split(","):[];if(e=e.replace(/$$(.*?)$$$(.*?)$/g,'<a href="$2">@$1</a>').replace(/- $$ $$/g,"⚪").replace(/- $$x$$/g,"⚫").replace(/\n/g,"<br>"),d.length>0){const a=document.createElement("div");a.className="zone_imgbox",d.forEach(h=>{const c=document.createElement("a");c.href=h,c.setAttribute("data-fancybox","gallery"),c.className="fancybox",c.setAttribute("data-thumb",h);const y=document.createElement("img");y.src=h,c.appendChild(y),a.appendChild(c)}),e+=a.outerHTML}t.externalUrl&&(e+=`
          <div class="shuoshuo-external-link">
            <a class="external-link" href="${t.externalUrl}" target="_blank" rel="external nofollow noopener noreferrer">
              <div class="external-link-left" style="background-image: url(${t.externalFavicon})"></div>
              <div class="external-link-right">
                <div class="external-link-title">${t.externalTitle}</div>
                <div>点击跳转<i class="fa-solid fa-angle-right"></i></div>
              </div>
            </a>
          </div>
        `);const o=JSON.parse(t.ext||"{}");if((r=o.music)!=null&&r.id){const a=o.music;e+=`
          <meting-js 
            server="${a.server}" 
            type="${a.type}" 
            id="${a.id}" 
            api="${a.api}"
          ></meting-js>
        `}if((u=o.doubanMovie)!=null&&u.id){const a=o.doubanMovie;e+=`
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
        `}if((k=o.doubanBook)!=null&&k.id){const a=o.doubanBook;e+=`
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
        `}if((_=o.video)!=null&&_.type){const a=o.video;a.type==="bilibili"?e+=`
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
          `)}return{...t,user:t.user.nickname||"匿名",avatar:t.user.avatarUrl||"https://p.liiiu.cn/i/2024/03/29/66061417537af.png",date:i,content:e,tags:t.tags?t.tags.split(",").filter(a=>a.trim()):["无标签"]}},g=async()=>{var d;const t="https://avvlqyndvewl.ap-northeast-1.clawcloudrun.com/api/memo/list",s=localStorage.getItem("talksCache"),i=localStorage.getItem("talksCacheTime"),e=Date.now();if(s&&i&&e-Number(i)<30*60*1e3){const o=JSON.parse(s);p.value=o.map(r=>b(r));return}try{const r=await(await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({size:30})})).json();r.code===0&&((d=r.data)!=null&&d.list)&&(localStorage.setItem("talksCache",JSON.stringify(r.data.list)),localStorage.setItem("talksCacheTime",e.toString()),p.value=r.data.list.map(u=>b(u,t)))}catch(o){console.error("获取数据失败:",o)}},$=t=>{const s=document.querySelector(".atk-textarea");if(s){const i=t.match(/<div class="talk_content_text">([\s\S]*?)<\/div>/),e=i?i[1]:"";s.value=`> ${e}

`,s.focus(),window.btf&&window.btf.snackbarShow("已为您引用该说说，不删除空格效果更佳")}};return C(()=>{g()}),{talkList:p,goComment:$}}},M={class:"page-essay"},B={class:"talk-container"},D={id:"talk",class:"talks-list"},j={class:"talk-meta"},z=["src"],A={class:"info"},E={class:"talk-nick"},I={viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg",class:"is-badge icon",style:{width:"15px","padding-top":"3px"}},O={class:"talk-date"},F=["innerHTML"],H={class:"talk-bottom"},J={class:"TagContainer"},U={class:"talk-tag"},q={class:"location-tag"},V=["onClick"];function Y(p,l,b,g,$,t){return m(),v("div",M,[n("div",B,[n("div",D,[(m(!0),v(w,null,S(g.talkList,(s,i)=>(m(),v("div",{key:i,class:"talk-item"},[n("div",j,[n("img",{src:s.avatar,class:"no-lightbox avatar",alt:"用户头像"},null,8,z),n("div",A,[n("span",E,[N(f(s.user)+" ",1),(m(),v("svg",I,l[0]||(l[0]=[n("path",{d:"m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z",fill:"#1da1f2"},null,-1)])))]),n("span",O,f(s.date),1)])]),n("div",{class:"talk-content",innerHTML:s.content},null,8,F),n("div",H,[n("div",J,[n("span",U,"🏷️"+f(s.tags.join(" ")),1),n("span",q,"🌍"+f(s.location),1)]),n("a",{href:"javascript:;",class:"comment-link",onClick:e=>g.goComment(s.text)},l[1]||(l[1]=[n("span",{class:"icon"},[n("i",{class:"fa-solid fa-message fa-fw"})],-1)]),8,V)])]))),128))])])])}const R=x(L,[["render",Y],["__scopeId","data-v-66cb7f6e"]]);export{R as default};
