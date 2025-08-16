
        window.fbAsyncInit = function () {
            FB.init({
                appId: '735307230430657',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v9.0'
            });
            

        };







document.addEventListener("DOMContentLoaded", () => {
    try {

        if (document.referrer.includes("facebook") && window.location.hash.includes("_=_")) {
            const id = localStorage.getItem("share_id")
            fetch("/user/share", {
                    method: "POST",
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: id
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status) {
                            swal({
                            title: res.message,
                            icon:"success"
                    })
                        } else {
                            swal({
                            title: res.message,
                            icon:"error"
                    })
                        }
                    }).catch(err => {
                    swal({
                            title: err.message,
                            icon:"error"
                    })
                    })
            
        }
        document.querySelectorAll(".share").forEach(sh => {
           sh.addEventListener("click", e => {
        
               localStorage.setItem("share_id", JSON.stringify({ id: e.currentTarget.dataset.id }));
               
               let url = `https://www.facebook.com/dialog/share?app_id=735307230430657&display=popup&href=${e.currentTarget.dataset.url}&redirect_uri=http://localhost:5000/user/dashboard`


               window.location.href = url;
    }) 
        })
    } catch (error) {
        console.log(error)
    }

    //Referral Link
    try {
        document.querySelector("form.referral").addEventListener("submit", e => {
        e.preventDefault();
        let box = e.currentTarget.querySelector("input");
        box.select();
        document.execCommand("copy");

        swal({
            title: "Link Copied!",
            icon:"success"
        })

    })
    } catch (error) {
        console.warn(error)
    }


    //SPONSORED ADS
    try {
        document.querySelectorAll("div#spAds").forEach(i => {
        i.addEventListener("click", e => {
            const id = {id:e.currentTarget.dataset.id};
            
            fetch("/user/spAds", {
                    method: "POST",
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(id)
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status) {
                            swal({
                            title: res.message,
                            icon:"success"
                    })
                        } else {
                            swal({
                            title: res.message,
                            icon:"error"
                    })
                        }
                    }).catch(err => {
                    swal({
                            title: err.message,
                            icon:"error"
                    })
                    })
            
        })
    })
    } catch (error) {
        swal({
            title: error.message,
            icon: "error"
        })
    }
    
})