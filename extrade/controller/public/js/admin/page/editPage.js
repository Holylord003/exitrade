$('#summernote').summernote({
        placeholder: 'Write Here',
        tabsize: 2,
        height: 320,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ['view', ['fullscreen', 'codeview', 'help']]
        ]
      });

    


document.addEventListener("DOMContentLoaded", () => {
    let submit, cbText;

    //Slug
    document.querySelector("input#title").addEventListener("keyup", press => {
        document.querySelector("input#slug").value = makeSlug(press.target.value)
    });

    

    
    document.querySelector("form").addEventListener("submit", e => {
        e.preventDefault();
        const obj = {
            page_title: e.currentTarget.querySelector("input#title").value,
            page_slug: e.currentTarget.querySelector("input#slug").value,
            page_description: e.currentTarget.querySelector("textarea#summernote").value
        };

    
        submit = e.currentTarget.querySelector("button[type='submit']");
        fetchResourse(obj, window.location.href, "PUT");
    
    });



    function fetchResourse(body, url, method) {
        loadingState(submit,true)
        fetch(url, {
                    method,
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                })
                    .then(res => res.json())
                    .then(res => {
                        loadingState(submit,false)
                        if (res.status) {
                            swal({
                            title: res.message,
                            icon:"success"
                    }).then(()=>window.location.reload())
                        } else {
                            swal({
                            title: res.message,
                            icon:"error"
                    })
                        }
                    }).catch(err => {
                        loadingState(submit,false)
                    swal({
                            title: err.message,
                            icon:"error"
                    })
                    })
    }

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


    function makeSlug(text) {
        return text.toLowerCase().replace(/[^A-Za-z0-9 ]/gi," ").trim().split(" ").filter(t => t !== "").join("-")
    }
    
    
})