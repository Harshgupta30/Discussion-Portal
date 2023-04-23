var el,rel,count=0,rcount=0;
const sub=document.getElementById("subject");
const quest = document.getElementById("question");
const right=document.getElementById("right");
const ques=document.getElementById("ques");
const responsebtn=document.getElementById("responsebtn");
const resolvebtn=document.getElementById("resolvebtn");
const clicked=document.getElementById('clicked');
const response=document.getElementById("response-head");
const newform =document.getElementById('newform');
const resolveside=document.getElementById("resolveside");
const search=document.getElementById("search");
const submit = document.getElementById("submit");
const temp = document.getElementById("newdata");
const nam = document.getElementById("nam");
const comment=document.getElementById("comment");
const newresp = document.getElementById("newresp");
const rsp = document.getElementById("response");
const favi = document.getElementById("fav");
let resid,tl;
function create(count,sub,quest,t){
    el = {}
    el.id = count;
    el.sub  = sub;
    el.ques = quest;
    el.u = 0;
    el.d = 0;
    el.f = false;
    el.t = t;
    return el;
}
function rcreater(rcount,q,n,c){
    rel = {};
    rel.id = rcount;
    rel.qid = q;
    rel.n = n;
    rel.com = c;
    rel.u = 0;
    rel.d = 0;
    rel.f = false;
    return rel;
}
submit.addEventListener("click",insert);
responsebtn.addEventListener('click',rinsert);
function rinsert(){
    // console.log("hh");
    let f1=0,f2=0;
    for(let i=0;i<nam.value.length;i++){
        if(nam.value[i]!=" "){
            f1=1;
            break;
        }
    }
    for(let i=0;i<comment.value.length;i++){
        if(comment.value[i]!=" "){
            f2=1;
            break;
        }
    }
    if(f1==0 || f2==0 ){
        alert("plese fill both field");
        return;
    }
    let res=JSON.parse(localStorage.getItem("response"));
    if(res==null || res.length==0){
        rcount=0;
    }
    else{
        rcount=res[res.length-1].id+1;
    }
    let id=clicked.childNodes[1].id;
    rel = rcreater(rcount,id,nam.value,comment.value);
    addlocalr(rel);
    addresp(rel);
    nam.value="";
    comment.value="";
}
function insert(){
   let f1=0,f2=0;
   for(let i=0;i<sub.value.length;i++){
       if(sub.value[i]!=" "){
           f1=1;
           break;
       }
   }
   for(let i=0;i<quest.value.length;i++){
       if(quest.value[i]!=" "){
           f2=1;
           break;
       }
   }
   if(f1==0 || f2==0 ){
       alert("plese fill both field");
       return;
   }
   let que=JSON.parse(localStorage.getItem("ques"));
   if( que==null || que.length==0  ){
       count=0;
   }
   else{
      
       count = que[que.length-1].id+1;
   }
   el = create(count,sub.value,quest.value,parseInt(Date.now()))
   addlocaldata(el);
   adddata(el);
   subject.value="";
   question.value="";
}
function addlocalr(rel){
    let res=[];
    if(localStorage.getItem("response")==null){
        res.push(rel);
        localStorage.setItem("response",JSON.stringify(res));
    }
    else{
        res=JSON.parse(localStorage.getItem("response"));
        res.push(rel);
        localStorage.setItem("response", JSON.stringify(res));
    }
}
function addlocaldata(el){
    let que=[];
    if(localStorage.getItem("ques")==null){
        que.push(el);
        localStorage.setItem("ques",JSON.stringify(que));
    }
    else{
        que=JSON.parse(localStorage.getItem("ques"));
        que.push(el);
        localStorage.setItem("ques", JSON.stringify(que));
    }
}
function addresp(rel){
    const clone = newresp.content.cloneNode(true);
    let h4=clone.querySelector("h4");
    let p=clone.querySelector("p");
    let a=clone.querySelectorAll("a");
    h4.innerText = rel.n;
    h4.id = rel.id;
    p.innerText = rel.com;
    a[0].textContent=" "+rel.u;
    a[0].classList.add(rel.id);
    a[1].textContent=" "+rel.d;
    a[1].classList.add(rel.id);
    a[2].classList.add(rel.id);
    if(rel.f==true){
        a[2].setAttribute("style","color:yellow");
    }
    else{
        a[2].setAttribute("style","color:white");
    }
    response.appendChild(clone);
}

function adddata(el){
    const clone = temp.content.cloneNode(true);
    // console.log(clone);
    let h4=clone.querySelector("h4");
    let p=clone.querySelector("p");
    let a=clone.querySelectorAll("a");
    h4.innerText = el.sub;
    h4.id = el.id;
    // console.log(h4.id);
    p.innerText = el.ques;
    a[0].textContent=" "+el.u;
    a[0].classList.add(el.id);
    a[1].textContent=" "+el.d;
    a[1].classList.add(el.id);
    a[2].classList.add(el.id);
    if(el.f==true){
        a[2].setAttribute("style","color:yellow");
    }
    else{
        a[2].setAttribute("style","color:white");
    }
    let t = document.createElement("p");
    t.innerText = getdate(el.t);
    t.setAttribute("style","color:grey");
    clone.appendChild(t);
    ques.appendChild(clone);
    // console.log(ques.lastChild);
}
function getdate(time){
    let curr=parseInt(Date.now());
    
    let sec=parseInt((curr-time)/1000);
    let s=sec%60;
    let min=parseInt(sec/60);
    let m=min%60;
    let hour=parseInt(min/60);
    let h=hour%24;
    let day=parseInt(hour/24);
    
    if(m==0){
        return s+" seconds ago";
    }
    else if(h==0 && min<60){
        return m+" minutes ago";
    }
    else if(day==0 && h<24)
        return h+" hours ago";
    else
        return day+" day ago";

}
ques.addEventListener('click',function(event){
    let que=JSON.parse(localStorage.getItem("ques"));
    let t=event.target;
    // console.log(t.parentNode.parentNode.childNodes[1].childNodes[1].id);
    if(t.classList.contains('up')){
        let id=t.parentNode.parentNode.childNodes[1].childNodes[1].id;
        que.forEach(el => {
            if(el.id==id){
                if(t.classList.contains(el.id)){
                    el.u++;
                    t.innerText = ' '+el.u;
                }
            }
        });
    }
    else if(t.classList.contains('down')){
        let id=t.parentNode.parentNode.childNodes[1].childNodes[1].id;
        que.forEach(el => {
            if(el.id==id){
                if(t.classList.contains(el.id)){
                    el.d++;
                    t.innerText = ' '+el.d;
                }
            }
        });
    }
    else if(t.classList.contains('fav')){
        let id=t.parentNode.parentNode.childNodes[1].childNodes[1].id;
        que.forEach(el => {
            if(el.id==id){
                if(t.classList.contains(el.id)){
                    if(el.f==false){
                       el.f = true;
                        t.setAttribute("style","color:yellow"); 
                    }
                    else{
                        el.f = false;
                        t.setAttribute("style","color:white");
                    }
                }
            }
        });
    }
    else{
        // console.log(t.parentNode.childNodes[1].id);
        resid = t.parentNode.childNodes[1].id;
        getrig(t);
        right.setAttribute('class','cl');
        resolveside.setAttribute('class','col-md-6 pt-5');
        getlocalrig();
    }
    localStorage.setItem("ques", JSON.stringify(que));
})
response.addEventListener('click',function(event){
    let r=JSON.parse(localStorage.getItem("response"));
    let t=event.target;
    if(t.classList.contains('up')){
        // console.log(t.parentNode.parentNode.childNodes[1].childNodes[1].id);
        let id = t.parentNode.parentNode.childNodes[1].childNodes[1].id;
        r.forEach(rel=>{
            if(rel.id==id){
                if(t.classList.contains(rel.id)){
                    rel.u++;
                    t.innerText = ' '+rel.u;
                }
            }
        })
    }
    else if(t.classList.contains('down')){
        // console.log(t.parentNode.parentNode.childNodes[1].childNodes[1].id);
        let id = t.parentNode.parentNode.childNodes[1].childNodes[1].id;
        r.forEach(rel=>{
            if(rel.id==id){
                if(t.classList.contains(rel.id)){
                    rel.d++;
                    t.innerText = ' '+rel.d;
                }
            }
        })
    }
    else if(t.classList.contains('fav')){
        console.log(t.parentNode.parentNode.childNodes[1].childNodes[1].id);
        let id = t.parentNode.parentNode.childNodes[1].childNodes[1].id;
        r.forEach(rel=>{
            if(rel.id==id){
                if(rel.f==false){
                    rel.f = true;
                    t.setAttribute("style","color:yellow"); 
                 }
                 else{
                    rel.f = false;
                    t.setAttribute("style","color:white");
                 }
            }
        })
    }
    localStorage.setItem("response",JSON.stringify(r));
})
newform.addEventListener('click',function(){
    right.setAttribute('class','col-md-6 pt-5');
    resolveside.setAttribute('class','cl');
    
});

function getrig(t){
    let parentNode=t.parentNode;
    // console.log(parentNode.childNodes);
    if(parentNode.classList.contains("col-6"))
    {   
        let h4=parentNode.childNodes[1].innerText;
        // console.log(parentNode.childNodes[1].innerText);
        let p=parentNode.childNodes[3].innerText;
        clicked.childNodes[1].innerText=h4;
        clicked.childNodes[1].id=parentNode.childNodes[1].id;
        clicked.childNodes[3].innerText=p;
    }
}

function getlocalrig(){
    if(localStorage.getItem("response")!=null){
        // console.log(clicked.childNodes[1].id);
        while(response.hasChildNodes()){
            response.removeChild(response.firstChild);
        }
        let r=JSON.parse(localStorage.getItem("response"));
        r.forEach(rel=>{
            if(rel.qid==clicked.childNodes[1].id){
                addresp(rel);
            }
        })
        r.sort(qs);
    }
}

function getdata(){
    if(localStorage.getItem("ques")!=null){
        let que=JSON.parse(localStorage.getItem("ques"));
        que.sort(qs);
        
        que.forEach(el => {
            adddata(el);
        });
    }
}
tl = setInterval(function(){
    let c = ques.lastElementChild;
        while(c){
            ques.removeChild(c);
            c=ques.lastElementChild;
        }
    getdata();
},10000);
getdata();


function qs(a,b){
    if(a.u-a.d>b.u-b.d){
        return 1;
    }
    else if(a.u-a.d<b.u-b.d){
        return -1;
    }
    else{
        return 0;
    }
}

let key = "";
search.addEventListener("keydown",function(event){
    let que = JSON.parse(localStorage.getItem("ques"));
    if(key!=undefined){
        clearInterval(tl);
    }
    if(event.key!="Backspace"){
        key+=event.key;
        let c = ques.lastElementChild;
        while(c){
            ques.removeChild(c);
            c=ques.lastElementChild;
        }
        que.forEach(el=>{
            if(el.sub.toLowerCase().includes(key.toLowerCase()) || el.ques.toLowerCase().includes(key.toLowerCase()) ){
               adddata(el);
            }
        })
    }
    else{
        key = key.substring(0,key.length-1);
        let c = ques.lastElementChild;
        while(c){
            ques.removeChild(c);
            c=ques.lastElementChild;
        }
        que.forEach(el=>{
            if(el.sub.toLowerCase().includes(key.toLowerCase()) || el.ques.toLowerCase().includes(key.toLowerCase()) ){
               adddata(el);
            }
        })
    }
})

favi.addEventListener('click',function(){
    console.log(favi.innerText);
    if(favi.innerText=="Favourite"){
        let que = JSON.parse(localStorage.getItem("ques"));
        let c = ques.lastElementChild;
        while(c){
            ques.removeChild(c);
            c=ques.lastElementChild;
        }
        que.forEach(el=>{
            if(el.f==true){
                adddata(el);
            }
        })
        favi.innerText="All";
    }
    else if(favi.innerText=="All"){
        let que = JSON.parse(localStorage.getItem("ques"));
        let c = ques.lastElementChild;
        while(c){
            ques.removeChild(c);
            c=ques.lastElementChild;
        }
        que.forEach(el=>{
                adddata(el);
        })
        favi.innerText="Favourite"
    }
    
})
function delques(id){
    let que = [];
    if(localStorage.getItem("ques")!=null){
        que = JSON.parse(localStorage.getItem("ques"));
        for(let i=0;i<que.length;i++){
            que.sort(qs);
            if(que[i] && que[i].id==id){
                que.splice(i,1);
                break;
            }
        }
        localStorage.setItem("ques",JSON.stringify(que));
    }
}
function delcom(id){
    let res = [];
    if(localStorage.getItem("response")!=null){
        res = JSON.parse(localStorage.getItem("response"));
        for(let i=0;i<res.length;i++){
            res.sort(qs);
            if(res[i] && res[i].id==id){
                res.splice(i,1);
                break;
            }
        }
        localStorage.setItem("response",JSON.stringify(res));
    }
}
resolvebtn.addEventListener('click',function(){
    right.setAttribute("class","col-md-6 pt-5");
    resolveside.setAttribute("class","cl");
    let id = resid;
    delques(id);
    delcom(id);


})