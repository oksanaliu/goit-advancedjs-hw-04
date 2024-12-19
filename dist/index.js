import{S as p}from"./assets/vendor-BQtLt1QN.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();async function u(r,n=1,s=12){const t=`https://pixabay.com/api/?key=47684004-d700c1255eaadac249fdd5630&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true&page=${n}&per_page=${s}`;try{const a=await fetch(t);if(!a.ok)throw new Error("Failed to fetch images");const l=await a.json();if(l.totalHits===0||!l.hits.length)throw new Error("No images found");return l}catch(a){throw console.error("Error fetching images:",a),a}}function f(r){const n=document.querySelector(".gallery"),s=r.map(o=>`
      <a href="${o.largeImageURL}" class="gallery-item">
        <div class="photo-card">
          <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
          <div class="info">
            <p><b>Likes:</b> ${o.likes}</p>
            <p><b>Views:</b> ${o.views}</p>
            <p><b>Comments:</b> ${o.comments}</p>
            <p><b>Downloads:</b> ${o.downloads}</p>
          </div>
        </div>
      </a>
    `).join("");n.innerHTML=s}function g(){const r=document.querySelector(".gallery");r.innerHTML=""}function h(){document.querySelector(".loader").classList.remove("hidden")}function m(){document.querySelector(".loader").classList.add("hidden")}function d(r){iziToast.info({title:"Info",message:r})}const w=document.querySelector("#search-form"),L=document.querySelector('input[name="searchQuery"]');let c=1,i="",y=new p(".gallery a");w.addEventListener("submit",async r=>{if(r.preventDefault(),i=L.value.trim(),!i){d("Please enter a search term.");return}g(),c=1,h();try{const n=await u(i,c);f(n.hits),y.refresh()}catch{d("Sorry, there are no images matching your search query. Please try again!")}finally{m()}});window.addEventListener("scroll",async()=>{if(window.innerHeight+window.scrollY>=document.body.offsetHeight-100){c+=1,h();try{const r=await u(i,c);f(r.hits),y.refresh()}catch{d("No more images to load.")}finally{m()}}});
//# sourceMappingURL=index.js.map
