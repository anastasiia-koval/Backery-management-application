const selectElement = (element) => document.querySelector(element);

selectElement(".burger").addEventListener("click", ()=>{
    selectElement(".burger").classList.toggle("open");
    selectElement(".nav-links").classList.toggle("open");
})