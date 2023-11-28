!function(){var e={703:function(e,t,o){"use strict";var r=o(414);function i(){}function a(){}a.resetWarningCache=i,e.exports=function(){function e(e,t,o,i,a,n){if(n!==r){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var o={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:i};return o.PropTypes=o,o}},697:function(e,t,o){e.exports=o(703)()},414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}},t={};function o(r){var i=t[r];if(void 0!==i)return i.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,o),a.exports}!function(){"use strict";var e=window.React,t=window.wp.blocks;const{InspectorControls:r,MediaUpload:i,MediaUploadCheck:a,useBlockProps:n}=wp.blockEditor,{SelectControl:l,TextControl:s,TextareaControl:d,Panel:c,PanelBody:p,ToggleControl:u,Button:m,ResponsiveWrapper:v}=wp.components,y=/(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;var f=JSON.parse('{"u2":"wiseplay-blocks/wiseplay-video-player"}'),g=o(697);const{withSelect:b}=wp.data;(0,t.registerBlockType)(f.u2,{icon:(0,e.createElement)("svg",{width:"30",height:"30",viewBox:"0 0 30 30",fill:"none",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)("path",{d:"M15 0C6.71371 0 0 6.71371 0 15C0 23.2863 6.71371 30 15 30C23.2863 30 30 23.2863 30 15C30 6.71371 23.2863 0 15 0ZM21.998 16.4516L11.3528 22.5605C10.3972 23.0927 9.19355 22.4093 9.19355 21.2903V8.70968C9.19355 7.59677 10.3911 6.90726 11.3528 7.43952L21.998 13.9113C22.9899 14.4677 22.9899 15.9012 21.998 16.4516Z",fill:"#4611A7"})),attributes:{videoType:{type:"string",default:"youtube"},videoURL:{type:"string",default:""},videoPosterUrl:{type:"string",default:""},videoPosterId:{type:"number",default:0},addYtPoster:{type:g.bool,default:!1},seo_title:{type:"string",default:""},seo_description:{type:"string",default:""}},edit:b(((e,t)=>({media:t.attributes.videoPosterId?e("core").getMedia(t.attributes.videoPosterId):void 0})))((function(t){n();const{attributes:o,setAttributes:f}=t;let g="";const b=e=>{f({videoPosterId:e.id,videoPosterUrl:e.url})};if("youtube"!==o.videoType||o.addYtPoster)t.media&&f({videoPosterUrl:t.media.source_url});else{let e=o.videoURL.match(y),t="https://img.youtube.com/vi/"+(e?e[5]:o.videoURL)+"/maxresdefault.jpg";f({videoPosterUrl:t}),g=t}return(0,e.createElement)("div",{...n()},(0,e.createElement)(r,null,(0,e.createElement)(c,null,(0,e.createElement)(p,{title:"Settings"},(0,e.createElement)(l,{label:"Type of Video",value:o.videoType,options:[{label:"YouTube",value:"youtube"},{label:"Self Hosted Video",value:"hosted"}],onChange:e=>{f({videoType:e})}}),(0,e.createElement)(s,{label:"youtube"===o.videoType?"Youtube Video URL":"Video URL",value:o.videoURL,onChange:e=>{f({videoURL:e})}}),"youtube"===o.videoType&&(0,e.createElement)(u,{help:"The poster is fetched from the youtube itself. If enabled, you can add your own poster image for youtube.",label:"Add poster",checked:o.addYtPoster,onChange:function(e){f({addYtPoster:e})}}),("hosted"===o.videoType||o.addYtPoster)&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)("div",{className:"editor-post-featured-image__container editor-post-featured-image"},(0,e.createElement)(a,null,(0,e.createElement)(i,{onSelect:b,value:o.videoPosterId,allowedTypes:["image"],render:({open:r})=>(0,e.createElement)(m,{className:0==o.videoPosterId?"editor-post-featured-image__toggle":"editor-post-featured-image__preview",onClick:r},0==o.videoPosterId&&"Choose a video poster",null!=t.media&&(0,e.createElement)(v,{naturalWidth:t.media.media_details.width,naturalHeight:t.media.media_details.height},(0,e.createElement)("img",{src:t.media.source_url})))})),0!=o.videoPosterId&&(0,e.createElement)("div",{className:"editor-post-featured-image__actions",style:{display:"flex",alignItems:"center",flexDirection:"row",gap:"8px",justifyContent:"space-between",width:"100%"}},(0,e.createElement)(a,null,(0,e.createElement)(i,{title:"Replace image",value:o.videoPosterId,onSelect:b,allowedTypes:["image"],render:({open:t})=>(0,e.createElement)(m,{variant:"primary",onClick:t,className:"editor-post-featured-image__action",isLarge:!0},"Replace")})),(0,e.createElement)(a,null,(0,e.createElement)(m,{variant:"primary",className:"editor-post-featured-image__action",onClick:()=>{f({videoPosterUrl:"",videoPosterId:0})},isDestructive:!0},"Remove"))))))),(0,e.createElement)(c,null,(0,e.createElement)(p,{title:"SEO"},(0,e.createElement)(s,{label:"Title",value:o.seo_title,onChange:e=>{f({seo_title:e})}}),(0,e.createElement)(d,{help:"Description of the video",label:"Description",value:o.seo_description,onChange:e=>{f({seo_description:e})}})))),(0,e.createElement)("wiseplay-video",{type:o.videoType,source:o.videoURL,poster:o.videoPosterUrl,name:o.seo_title,description:o.seo_description}))})),save:function(t){const{attributes:o}=t;return(0,e.createElement)("wiseplay-video",{type:o.videoType,source:o.videoURL,poster:o.videoPosterUrl,name:o.seo_title,description:o.seo_description})}})}()}();