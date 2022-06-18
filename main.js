//main variables

const html = document.getElementById("html");
const css = document.getElementById("css");
const js = document.getElementById("js");
const savebtn = document.getElementById('save');
const select = document.getElementById('select');
const compileBtn = document.getElementById('run-code');
const minimize = document.getElementById('minimize');
const output = document.getElementById('code');
const textarea = document.querySelectorAll('.coding-section .code-box');
const column = document.querySelectorAll('.code-column');

// code run

compile=()=>{
    const code = document.getElementById("code").contentWindow.document;
    code.open();
    code.writeln(html.value + "<style>" + css.value + "</style>" + "<script>" + js.value + "</script>");
    code.close();
};

compileBtn.addEventListener('click', compile);

//add to storage

save=()=> {
    const codeTitle = document.getElementById('code-title');
    let codeTitleVal = codeTitle.value;


    if (codeTitleVal !== "") {
        var addedCode = {
            "name": codeTitleVal,
            "html": html.value,
            "js": js.value,
            "css": css.value
        }

        var cartData = {
            "codes": []
        };

        let data = JSON.parse(localStorage.getItem('codes'));

        if (data) {
            cartData = data;
        }
        cartData["codes"].push(addedCode)
        localStorage.setItem('codes', JSON.stringify(cartData));
        $('#exampleModal').modal('hide');
        let opt = document.createElement('option');
        opt.value = codeTitleVal;
        opt.innerHTML = codeTitleVal;
        select.appendChild(opt);
    } else {
        alert('bos birakma')
    }

}

// get options at onload

const storageDatas = JSON.parse(localStorage.getItem('codes'));
if (storageDatas) {
    window.onload = (event) => {
        storageDatas['codes'].forEach(element => {
            let opt = document.createElement('option');
            opt.value = element.name;
            opt.innerHTML = element.name;
            select.appendChild(opt);
        });
    };
}


savebtn.addEventListener('click', save);

// get codes from storage

changeSelect=()=>{
    for (let[key, value] of Object.entries(localStorage)) {
       var array = JSON.parse(value).codes;
       addedItem = array.find(elem=>elem.name== select.value)
    }
    
    if (addedItem) {
        html.value = addedItem.html;
        css.value = addedItem.css;
        js.value = addedItem.js;
        compile()
    }
}

select.addEventListener('change', changeSelect);

var elem = document.getElementById("coding-section");
slide=()=>{
    elem.classList.toggle('hide');
    output.classList.toggle('wide');
    if (minimize.textContent === "Minimize") {
        minimize.textContent = "Maximize";
    } else {
        minimize.textContent = "Minimize"
    }
}

minimize.addEventListener('click', slide)

// ctrl+s
var isCtrl = false;
document.onkeyup=function(e){
    if(e.keyCode == 17) isCtrl=false;
}

document.onkeydown=function(e){
    if(e.keyCode == 17) isCtrl=true;
    if(e.keyCode == 83 && isCtrl == true) {
       compile();
        return false;
    }
}

// textarea typing animation
for (i = 0; i < textarea.length; i++) {
    const element = textarea[i];
    element.onkeyup  = function(e){
    for (i = 0; i < column.length; i++){
        column[i].classList.remove('expand');
    }
       e.target.closest(".code-column").classList.add('expand')
    }
}