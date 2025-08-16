document.addEventListener("DOMContentLoaded", () => {
    let submit, cbText;
    document.querySelector("form").addEventListener("submit", e => {
        e.preventDefault();
        
        const obj = {
            website_title: e.currentTarget.querySelector("input#title").value,
            website_tagline: e.currentTarget.querySelector("input#tagline").value,
            website_url: e.currentTarget.querySelector("input#url").value,
            website_description: e.currentTarget.querySelector("textarea#description").value,
            website_phone_number: e.currentTarget.querySelector("input#number").value,
            website_email: e.currentTarget.querySelector("input#email").value,
            website_author: e.currentTarget.querySelector("input#author").value,
            website_facebook: e.currentTarget.querySelector("input#facebook").value,
            website_twitter: e.currentTarget.querySelector("input#twitter").value,
            website_instagram: e.currentTarget.querySelector("input#instagram").value,
            website_youtube: e.currentTarget.querySelector("input#youtube").value,
            website_currency: e.currentTarget.querySelector("input#currency").value,
            website_address: e.currentTarget.querySelector("input#address").value,
        };

        
        submit = e.currentTarget.querySelector("button#submit-btn")      
        loadingState(submit, true);
        

        fetch(document.location.href, {
                    method: "POST",
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(obj)
                })
                    .then(res => res.json())
            .then(res => {
                        
                loadingState(submit, false);
                        
                if (res.status) {
                            
                            //Favicon
                            if (document.querySelector("input#favicon").files.length > 0) {
                                loadingState(submit, true);

                                let file = new FormData();
                                file.append("image", document.querySelector("input#favicon").files[0])
                                
                                
                                
                                fetch(window.location.href + "?type=website_favicon", {
                                    method: "PUT",
                                    credentials: "include",
                                    mode: "cors",
                                    body: file
                                    
                                }).then(res => res.json())
                                    .then(res => console.log(res))
                                
                                
                            }

                            //Logo
                            if (document.querySelector("input#logo").files.length > 0) {
                                loadingState(submit, true);

                                let file = new FormData();
                                file.append("image", document.querySelector("input#logo").files[0])
                                
                                
                                
                                fetch(window.location.href + "?type=website_logo", {
                                    method: "PUT",
                                    credentials: "include",
                                    mode: "cors",
                                    body: file
                                    
                                }).then(res => res.json())
                                    .then(res => console.log(res))
                                
                                
                            }




                            //Response Back
                            swal({
                            title: res.message,
                            icon:"success"
                            }).then(() => window.location.reload())
                            

                        } else {
                            loadingState(submit, false);
                            swal({
                            title: res.message,
                            icon:"error"
                    })
                        }
                    }).catch(err => {
                        loadingState(submit, false);
                    swal({
                        title: err.message,
                        icon: "error"
                    })
                    })
        

    })


    function loadingState(element,state) {
        if (state) {
            cbText = element.textContent;
            element.innerHTML = `<span class="dashboard-spinner spinner-warning spinner-xs"></span>`;
            element.disabled = state
        } else {
            element.innerHTML = cbText;
            element.disabled = state
        }
    }
    
    
})