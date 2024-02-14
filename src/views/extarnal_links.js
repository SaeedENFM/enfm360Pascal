function body_script(src) {
    if(document.querySelector("script[src='" + src + "']")){ return; }
    let script = document.createElement('script');
    script.setAttribute('src', src);
    script.setAttribute('defer',"");

    // script.setAttribute("async", async);
    script.setAttribute('type', 'text/javascript');
    document.body.appendChild(script)
}


export { 
    body_script 
}
