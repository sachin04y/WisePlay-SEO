<style id="wiseplay-video-style">
:root{--plyr-color-main:#4611a7}.plyr__control{background-color:transparent!important}.plyr__control--overlaid,.plyr__control--overlaid:focus,.plyr__control--overlaid:hover{background-color:var(--plyr-color-main,#00b2ff)!important}.plyr__video-embed iframe{pointer-events:none!important;-webkit-user-select:none!important;-moz-user-select:none!important;user-select:none!important}.plyr--video .plyr__control:focus-visible{background:var(--plyr-video-control-background-hover,var(--plyr-color-main,var(--plyr-color-main,#00b2ff)))!important;color:#fff;color:var(--plyr-video-control-color-hover,#fff)}.plyr--video .plyr__control:hover,.plyr--video .plyr__control[aria-expanded=true]{background:var(--plyr-video-control-background-hover,var(--plyr-color-main,var(--plyr-color-main,#00b2ff)))!important;color:#fff;color:var(--plyr-video-control-color-hover,#fff)}wiseplay-video{aspect-ratio:16/9;background:#4c4c4c;border-radius:12px;box-shadow:0 1px 10px 0 rgba(0,0,0,.3);cursor:pointer;display:block;max-width:100%;overflow:hidden;position:relative}wiseplay-video .plyr video{aspect-ratio:16/9;width:100%!important}wiseplay-video .plyr__video-embed,wiseplay-video .plyr__video-wrapper--fixed-ratio{aspect-ratio:16/9!important}.wpvp-player-facade{align-items:center;display:flex;flex-wrap:nowrap;height:100%;inset:0;justify-content:center;position:absolute}.wpvp-player-facade .play-btn{background:transparent;border:0;border-radius:100%;position:absolute;transition:.3s;z-index:2}.wpvp-player-facade:before{background:#000;content:"";display:block;height:100%;opacity:0;position:absolute;transition:.5s;width:100%;z-index:1}.wpvp-player-facade:hover.wpvp-player-facade:before{opacity:.4}.wpvp-player-facade:hover.wpvp-player-facade .play-btn{transform:scale(1.15)}.wpvp-player-facade img{height:100%;-o-object-fit:contain;object-fit:contain;width:100%}
</style>
<script id="wiseplay-video-script" type="text/javascript">
!function(){"use strict";!function(){let e=[],t=!1;const i=/(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;let s,l,r,o;const n=(e=null,t="script")=>{if(""!==e&&null!=e)return"stylesheet"!=t&&"css"!=t&&"style"!=t||(s="link",l="href",r="stylesheet",t="text/css"),"js"!=t&&"script"!=t||(s="script",l="src",r="",t="text/javascript"),new Promise((i=>{o=document.createElement(s),o.setAttribute(l,e),o.setAttribute("rel",r),o.setAttribute("type",t),document.getElementsByTagName("head")[0].appendChild(o),o.onload=function(){i(!0)}}));console.error("ImportModule expects a link to the module.")},a=t=>{let i;i="hosted"===t.getAttribute("type")?'<video id="player" playsinline controls data-poster="'+t.getAttribute("poster")+'"><source src="'+t.getAttribute("source")+'" type="video/mp4" /></video>':'<div id="player" data-plyr-provider="youtube" data-plyr-embed-id="'+t.getAttribute("source")+'"></div>',t.innerHTML=i;let s=new Plyr(t.childNodes[0],{youtube:{noCookie:!1,rel:0,showinfo:0,iv_load_policy:3,modestbranding:1}});t.removeEventListener("click",c),s.on("ready",(e=>{s.play()})),s.on("play",(t=>{(t=>{e.forEach((e=>{e!=t&&e.pause()}))})(s)})),e.push(s)},c=function(){t?a(this):Promise.all([n("https://cdn.plyr.io/3.7.8/plyr.js"),n("https://cdn.plyr.io/3.7.8/plyr.css","style")]).then((()=>{t=!0,a(this)}))};class p extends HTMLElement{connectedCallback(){let e=this.getAttribute("source"),t=this.getAttribute("poster");if("youtube"===this.getAttribute("type")&&!t){let s=e.match(i);t="https://img.youtube.com/vi/"+(s?s[5]:e)+"/maxresdefault.jpg"}this.innerHTML='<div class="wpvp-player-facade"><img decoding="async" loading="lazy" src="'+t+'" alt="poster"/> <span class="play-btn" role="button" aria-pressed="false" aria-label="Play"> <svg height="64px" width="64px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 58 58" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle style="fill:#4611a7;" cx="29" cy="29" r="29"></circle> <g> <polygon style="fill:#FFFFFF;" points="44,29 22,44 22,29.273 22,14 "></polygon> <path style="fill:#FFFFFF;" d="M22,45c-0.16,0-0.321-0.038-0.467-0.116C21.205,44.711,21,44.371,21,44V14 c0-0.371,0.205-0.711,0.533-0.884c0.328-0.174,0.724-0.15,1.031,0.058l22,15C44.836,28.36,45,28.669,45,29s-0.164,0.64-0.437,0.826 l-22,15C22.394,44.941,22.197,45,22,45z M23,15.893v26.215L42.225,29L23,15.893z"></path> </g> </g></svg></span></div>',this.addEventListener("click",c)}}customElements.define("wiseplay-video",p)}()}();
</script>