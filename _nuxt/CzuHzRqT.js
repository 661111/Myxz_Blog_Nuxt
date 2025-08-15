import{_ as x,q as f,x as e,F as w,y as S,r as T,z as C,o as h,A as N,B as v}from"./Bu4FH8TA.js";const L={name:"TalkList",setup(){const p=T([]),l=t=>{const s=new Date(t),i=[s.getFullYear(),String(s.getMonth()+1).padStart(2,"0"),String(s.getDate()).padStart(2,"0"),String(s.getHours()).padStart(2,"0"),String(s.getMinutes()).padStart(2,"0")];return`${i[0]}-${i[1]}-${i[2]} ${i[3]}:${i[4]}`},m=(t,s)=>{var r,u,k,$;const i=l(t.createdAt);let n=t.content;const d=t.imgs?t.imgs.split(","):[];if(n=n.replace(/$$(.*?)$$$(.*?)$/g,'<a href="$2">@$1</a>').replace(/- $$ $$/g,"⚪").replace(/- $$x$$/g,"⚫").replace(/\n/g,"<br>"),d.length>0){const a=document.createElement("div");a.className="zone_imgbox",d.forEach(b=>{const c=document.createElement("a");c.href=b,c.setAttribute("data-fancybox","gallery"),c.className="fancybox",c.setAttribute("data-thumb",b);const y=document.createElement("img");y.src=b,c.appendChild(y),a.appendChild(c)}),n+=a.outerHTML}t.externalUrl&&(n+=`
          <div class="shuoshuo-external-link">
            <a class="external-link" href="${t.externalUrl}" target="_blank" rel="external nofollow noopener noreferrer">
              <div class="external-link-left" style="background-image: url(${t.externalFavicon})"></div>
              <div class="external-link-right">
                <div class="external-link-title">${t.externalTitle}</div>
                <div>点击跳转<i class="fa-solid fa-angle-right"></i></div>
              </div>
            </a>
          </div>
        `);const o=JSON.parse(t.ext||"{}");if((r=o.music)!=null&&r.id){const a=o.music;n+=`
          <meting-js 
            server="${a.server}" 
            type="${a.type}" 
            id="${a.id}" 
            api="${a.api}"
          ></meting-js>
        `}if((u=o.doubanMovie)!=null&&u.id){const a=o.doubanMovie;n+=`
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
        `}if((k=o.doubanBook)!=null&&k.id){const a=o.doubanBook;n+=`
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
        `}if(($=o.video)!=null&&$.type){const a=o.video;a.type==="bilibili"?n+=`
            <div style="position: relative; padding: 30% 45%; margin-top: 10px;">
              <iframe 
                style="position: absolute; width: 100%; height: 100%; left: 0; top: 0; border-radius: 12px;" 
                src="${a.value}&autoplay=0"
                scrolling="no" 
                frameborder="no" 
                allowfullscreen
              ></iframe>
            </div>
          `:a.type==="youtube"&&(n+=`
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
          `)}return{...t,user:t.user.nickname||"匿名",avatar:t.user.avatarUrl||"https://p.liiiu.cn/i/2024/03/29/66061417537af.png",date:i,content:n,tags:t.tags?t.tags.split(",").filter(a=>a.trim()):["无标签"]}},g=async()=>{var d;const t="https://bvwghyktnrxo.cloud.sealos.io/api/memo/list",s=localStorage.getItem("talksCache"),i=localStorage.getItem("talksCacheTime"),n=Date.now();if(s&&i&&n-Number(i)<30*60*1e3){const o=JSON.parse(s);p.value=o.map(r=>m(r));return}try{const r=await(await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({size:30})})).json();r.code===0&&((d=r.data)!=null&&d.list)&&(localStorage.setItem("talksCache",JSON.stringify(r.data.list)),localStorage.setItem("talksCacheTime",n.toString()),p.value=r.data.list.map(u=>m(u,t)))}catch(o){console.error("获取数据失败:",o)}},_=t=>{const s=document.querySelector(".atk-textarea");if(s){const i=t.match(/<div class="talk_content_text">([\s\S]*?)<\/div>/),n=i?i[1]:"";s.value=`> ${n}

`,s.focus(),window.btf&&window.btf.snackbarShow("已为您引用该说说，不删除空格效果更佳")}};return C(()=>{g()}),{talkList:p,goComment:_}}},M={class:"page-essay"},B={class:"talk-container"},D={id:"talk",class:"talks-list"},j={class:"talk_meta"},z=["src"],A={class:"info"},E={class:"talk_nick"},I={class:"talk_date"},O=["innerHTML"],F={class:"talk_bottom"},H={class:"TagContainer"},J={class:"talk_tag"},U={class:"location_tag"},q=["onClick"];function V(p,l,m,g,_,t){return h(),f("div",M,[e("div",B,[e("div",D,[(h(!0),f(w,null,S(g.talkList,(s,i)=>(h(),f("div",{key:i,class:"talk_item"},[e("div",j,[e("img",{src:s.avatar,class:"no-lightbox avatar",alt:"用户头像"},null,8,z),e("div",A,[e("span",E,[N(v(s.user)+" ",1),l[0]||(l[0]=e("svg",{viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg",class:"is-badge icon"},[e("path",{d:"m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3 2.1 32.6 6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z",fill:"#1da1f2"})],-1))]),e("span",I,v(s.date),1)])]),e("div",{class:"talk_content",innerHTML:s.content},null,8,O),e("div",F,[e("div",H,[e("span",J,"🏷️"+v(s.tags.join(" ")),1),e("span",U,"🌍"+v(s.location),1)]),e("a",{href:"javascript:;",class:"comment-link",onClick:n=>g.goComment(s.text)},l[1]||(l[1]=[e("span",{class:"icon"},[e("i",{class:"fa-solid fa-message fa-fw"})],-1)]),8,q)])]))),128))])])])}const P=x(L,[["render",V],["__scopeId","data-v-2bd81d1a"]]);export{P as default};
